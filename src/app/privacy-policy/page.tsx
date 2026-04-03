import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Payoff: Smart Debt Planner privacy policy. How we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="prose max-w-3xl mx-auto">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: 3 April 2026</em></p>

        <p>
          Payoff: Smart Debt Planner (&quot;Payoff&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (payoffdebtplanner.com).
        </p>

        <h2>Information We Collect</h2>

        <h3>Information You Provide</h3>
        <ul>
          <li><strong>Account information:</strong> Email address and display name when you create an account.</li>
          <li><strong>Financial information:</strong> Debt balances, interest rates, minimum payments, and payment history that you manually enter into the app. We do not connect to your bank accounts.</li>
          <li><strong>AI Coach conversations:</strong> Messages you send to the AI Coach feature to provide personalised debt advice.</li>
          <li><strong>Preferences:</strong> Notification settings, currency preference, language preference, and app settings.</li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage analytics:</strong> We use Firebase Analytics to collect anonymous usage data such as screen views, feature usage, and app events to improve the app experience.</li>
          <li><strong>Crash reports:</strong> Firebase Crashlytics collects crash logs and error reports to help us fix bugs.</li>
          <li><strong>Device information:</strong> Device type, operating system, and app version for compatibility and support purposes.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain the Payoff app and its features</li>
          <li>To provide personalised AI coaching based on your debt data</li>
          <li>To sync your data across devices via Supabase cloud storage</li>
          <li>To send payment reminders and milestone notifications (if enabled)</li>
          <li>To process subscription purchases via RevenueCat</li>
          <li>To improve the app through anonymous analytics</li>
          <li>To diagnose and fix technical issues</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Supabase:</strong> Authentication and cloud database for syncing your data.</li>
          <li><strong>OpenAI:</strong> Powers the AI Coach feature. Your debt context (not personal details) is sent to OpenAI&apos;s API to generate personalised advice. OpenAI does not use this data for training.</li>
          <li><strong>RevenueCat:</strong> Manages subscription purchases and entitlements.</li>
          <li><strong>Firebase (Google):</strong> Anonymous analytics and crash reporting.</li>
          <li><strong>Apple / Google:</strong> In-app purchase processing via the respective app stores.</li>
        </ul>

        <h2>Data Storage and Security</h2>
        <p>
          Your financial data is stored locally on your device and optionally synced to Supabase (hosted on AWS). Data is encrypted in transit (TLS) and at rest. We implement Row Level Security (RLS) policies to ensure you can only access your own data.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your data for as long as your account is active. If you delete your account, all associated data is permanently deleted from our servers within 30 days. Anonymous analytics data may be retained for up to 14 months.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and all associated data</li>
          <li>Export your data</li>
          <li>Opt out of analytics (via device settings)</li>
        </ul>

        <h2>Account Deletion</h2>
        <p>
          You can delete your account at any time through the app (Settings &rarr; Delete Account) or by visiting <a href="/delete-account">payoffdebtplanner.com/delete-account</a>.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Payoff is not intended for children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes through the app or by email.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at <a href="mailto:payoffdebtplanner@zohomail.eu">payoffdebtplanner@zohomail.eu</a>.
        </p>
      </div>
    </main>
  );
}
