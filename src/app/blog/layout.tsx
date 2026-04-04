import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

// Blog always loads English dictionary for Navbar/Footer
async function getEnglishDict() {
  return import('../[lang]/dictionaries/en.json').then((m) => m.default);
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getEnglishDict();

  return (
    <LocaleProvider locale="en" dict={dict}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
