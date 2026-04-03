import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://unvjyhhiwwomixvfxnhl.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!email || !name || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    if (SUPABASE_ANON_KEY) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          subject,
          message,
          created_at: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        console.error('Supabase error:', res.status, await res.text());
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
      }
    } else {
      console.log('Contact form (no Supabase):', { name, email, subject, message });
    }

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
