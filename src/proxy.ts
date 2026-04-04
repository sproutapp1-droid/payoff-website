import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, getLocaleFromHeaders } from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, API routes, blog (stays English), and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/blog') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/)
  ) {
    return;
  }

  // Check if pathname already has a valid locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect locale from Accept-Language header or cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  let locale = DEFAULT_LOCALE;

  if (cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])) {
    locale = cookieLocale as typeof LOCALES[number];
  } else {
    const acceptLanguage = request.headers.get('accept-language') || '';
    locale = getLocaleFromHeaders(acceptLanguage);
  }

  // Redirect to locale-prefixed path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all paths except internal ones, API, blog, and static files
    '/((?!_next|api|blog|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)',
  ],
};
