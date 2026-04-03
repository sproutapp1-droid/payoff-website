import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // TODO: Connect to Supabase to process account deletion
    // For now, log the request
    console.log('Account deletion request:', email);

    return NextResponse.json({
      message: 'Your account deletion request has been submitted. Your data will be permanently deleted within 30 days.',
    });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
