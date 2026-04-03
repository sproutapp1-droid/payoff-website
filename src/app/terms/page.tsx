import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Payoff: Smart Debt Planner terms of service and end-user licence agreement.',
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="prose max-w-3xl mx-auto">
        <h1>Terms of Service</h1>
        <p><em>Last updated: 3 April 2026</em></p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of Payoff: Smart Debt Planner (&quot;Payoff&quot;, &quot;the App&quot;) and the website payoffdebtplanner.com (&quot;the Website&quot;). By using Payoff, you agree to these Terms.
        </p>

        <h2>1. Use of the Service</h2>
        <p>
          Payoff is a personal finance planning tool that helps you create debt payoff plans, track payments, and set savings goals. You must be at least 13 years old to use the App.
        </p>

        <h2>2. Not Financial Advice</h2>
        <p>
          <strong>Payoff is not a financial advisor.</strong> The AI Coach feature provides general information and suggestions based on the data you enter. It does not constitute professional financial, tax, legal, or investment advice. Always consult a qualified financial professional before making significant financial decisions.
        </p>

        <h2>3. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the security of your account credentials. You are responsible for all activity that occurs under your account. The financial data you enter should be accurate to the best of your knowledge.
        </p>

        <h2>4. Subscriptions and Payments</h2>
        <ul>
          <li>Payoff offers free and premium subscription plans.</li>
          <li>Premium subscriptions are billed through the Apple App Store or Google Play Store.</li>
          <li>Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.</li>
          <li>Refunds are handled by the respective app store according to their refund policies.</li>
          <li>The 7-day free trial (yearly plan only) converts to a paid subscription automatically unless cancelled.</li>
        </ul>

        <h2>5. Household Plans</h2>
        <p>
          Household plans allow two users to share debt data within the App. By inviting a partner, you consent to sharing your selected debt information with them. You can revoke sharing at any time.
        </p>

        <h2>6. AI Coach Disclaimer</h2>
        <p>
          The AI Coach is powered by third-party AI services (OpenAI). While we strive for accuracy, AI-generated responses may contain errors or inaccuracies. You should verify any financial calculations or suggestions independently. We are not liable for actions taken based on AI Coach responses.
        </p>

        <h2>7. Data and Privacy</h2>
        <p>
          Your use of Payoff is also governed by our <a href="/privacy-policy">Privacy Policy</a>. By using the App, you consent to the collection and use of data as described therein.
        </p>

        <h2>8. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the App for any unlawful purpose</li>
          <li>Attempt to reverse engineer, decompile, or disassemble the App</li>
          <li>Share your account credentials with others (use Household mode instead)</li>
          <li>Use the AI Coach to generate content that is harmful, abusive, or illegal</li>
        </ul>

        <h2>9. Limitation of Liability</h2>
        <p>
          Payoff is provided &quot;as is&quot; without warranties of any kind. We are not liable for any financial losses, missed payments, or incorrect calculations that may result from using the App. Your use of Payoff is at your own risk.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you violate these Terms. You can delete your account at any time through the App or at <a href="/delete-account">payoffdebtplanner.com/delete-account</a>.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the new Terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions about these Terms, contact us at <a href="mailto:payoffdebtplanner@zohomail.eu">payoffdebtplanner@zohomail.eu</a>.
        </p>
      </div>
    </main>
  );
}
