import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://unvjyhhiwwomixvfxnhl.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // If Supabase is configured, insert into waitlist table
    if (SUPABASE_ANON_KEY) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          source: 'website',
          created_at: new Date().toISOString(),
        }),
      });

      if (res.status === 409 || res.status === 400) {
        // Likely duplicate — treat as success
        return NextResponse.json({ message: "You're already on the list!" });
      }

      if (!res.ok) {
        console.error('Supabase error:', res.status, await res.text());
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
      }
    } else {
      // Supabase not configured — just log for now
      console.log('Waitlist signup (no Supabase configured):', email);
    }

    return NextResponse.json({ message: "You're on the list! We'll notify you when Payoff launches." });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
