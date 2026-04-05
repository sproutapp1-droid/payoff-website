/**
 * Programmatic SEO guide data.
 *
 * Each entry generates a unique page at /[lang]/guides/[slug].
 * To add a new page, add an entry here — the template handles the rest
 * (metadata, schema, layout, sitemap).
 */

export interface GuideStep {
  title: string;
  text: string;
}

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface GuideStat {
  value: string;
  label: string;
  description: string;
}

export interface Guide {
  slug: string;
  /** H1 and meta title */
  title: string;
  /** Meta description — 150-160 chars */
  description: string;
  /** Bold definition block at top of page — 40-60 words, standalone for AI extraction */
  definitionBlock: string;
  /** Which calculator to link to (snowball | avalanche | hybrid | etc.) */
  recommendedCalculator: string;
  /** Why this calculator is recommended */
  calculatorReason: string;
  /** Hero stat */
  heroStat: GuideStat;
  /** Intro paragraphs (2-3) after definition block */
  intro: string[];
  /** Step-by-step payoff guide specific to this debt type */
  steps: GuideStep[];
  /** Unique tips specific to this debt type */
  tips: string[];
  /** FAQ items */
  faqs: GuideFAQ[];
  /** Keywords for meta tags */
  keywords: string[];
  /** Related blog post slugs */
  relatedPosts: string[];
  /** Related calculator slugs */
  relatedCalculators: string[];
  /** Category label shown on page */
  category: string;
}

export const guides: Guide[] = [
  // ─── DEBT TYPE GUIDES ────────────────────────────────────────────
  {
    slug: 'pay-off-credit-card-debt',
    title: 'How to Pay Off Credit Card Debt Fast (2026 Guide)',
    description:
      'Learn exactly how to pay off credit card debt with proven strategies. Free calculator, step-by-step plan, and tips to save thousands on interest.',
    definitionBlock:
      'To pay off credit card debt, list all your cards with their balances and APRs, then choose a payoff strategy — avalanche (highest interest first) saves the most money, while snowball (smallest balance first) keeps you motivated. Paying even £50 extra per month on a £3,000 balance at 22% APR saves over £2,800 in interest and cuts payoff time from 17 years to under 3 years.',
    recommendedCalculator: 'avalanche',
    calculatorReason:
      'Credit cards typically have the highest interest rates (18-30% APR), making the avalanche method especially powerful — you stop the most expensive debt from growing first.',
    heroStat: {
      value: '22.8%',
      label: 'Average credit card APR',
      description:
        'At this rate, a £5,000 balance costs over £1,100 per year in interest alone if you only make minimums.',
    },
    intro: [
      "Credit card debt is the most expensive type of consumer debt most people carry. With average APRs above 22%, every month you carry a balance costs significantly more than other debt types like student loans or car finance.",
      "The good news is that credit card debt is also one of the most responsive to extra payments. Because interest compounds monthly on the outstanding balance, even small additional payments have an outsized impact on your total cost and payoff timeline.",
      "This guide walks you through a step-by-step plan tailored specifically to credit card debt — not generic advice, but strategies designed for high-APR revolving balances.",
    ],
    steps: [
      {
        title: 'List every credit card with balance, APR, and minimum payment',
        text: "Check each card's latest statement. Note the balance, the interest rate (often different for purchases vs balance transfers), and the minimum payment. Include store cards — they often have the highest rates.",
      },
      {
        title: 'Stop adding new charges',
        text: "Freeze or remove cards from digital wallets while you pay down. If you keep spending on cards you're trying to pay off, you're filling the bath while trying to drain it. Use debit or cash for daily spending.",
      },
      {
        title: 'Choose your payoff order',
        text: "For credit cards specifically, the avalanche method (highest APR first) usually saves the most because the rate spread between cards is often large. But if you have a small-balance card under £500, consider knocking it out first for a quick motivational win.",
      },
      {
        title: 'Find extra money in your budget',
        text: "Even £30-50 per month extra makes a dramatic difference on high-APR debt. Review subscriptions, negotiate bills, sell unused items, or redirect a small portion of your income. The Payoff app's budget hub helps you find this automatically.",
      },
      {
        title: 'Consider a balance transfer (but read the fine print)',
        text: "If you have good credit, a 0% balance transfer card can freeze interest for 12-21 months. But watch for transfer fees (2-5%), and make sure you'll pay it off before the 0% period ends — or the deferred interest hits all at once.",
      },
      {
        title: 'Automate extra payments and track progress',
        text: "Set up automatic payments above the minimum. Track your progress monthly — seeing balances fall is motivating. Use a debt payoff calculator to see exactly how each payment moves your debt-free date closer.",
      },
    ],
    tips: [
      'Call your card issuer and ask for a rate reduction — a 2-3% drop on a £5,000 balance saves hundreds. Success rate: about 70% if you have a good payment history.',
      'Pay more than once per month if possible. Two payments of £100 beats one payment of £200 because interest is calculated on the average daily balance.',
      "Don't close cards after paying them off if they're your oldest accounts — it can hurt your credit score. Just stop using them.",
      'If you receive a windfall (tax refund, bonus, gift), put at least 50% toward your highest-rate card. One lump payment can shift your payoff date by months.',
    ],
    faqs: [
      {
        q: 'Should I pay off credit cards or save first?',
        a: "Build a small emergency buffer (£500-1,000) first, then focus on credit card debt. At 22%+ APR, credit card interest costs far more than savings interest earns. Once cards are paid off, redirect those payments to your emergency fund.",
      },
      {
        q: 'Is it better to pay off one card at a time or spread payments?',
        a: "Focus on one card at a time (while paying minimums on the rest). Spreading extra payments across all cards is less effective — you pay more total interest and don't get the motivational boost of seeing a card hit £0.",
      },
      {
        q: 'How long does it take to pay off credit card debt?',
        a: 'It depends on your balance, rate, and extra payments. The average person paying only minimums takes 17+ years to pay off a typical balance. With the avalanche method and extra payments, most people can be credit-card-debt-free in 2-4 years.',
      },
      {
        q: 'Will paying off credit card debt improve my credit score?',
        a: "Yes — significantly. Reducing your credit utilisation ratio (balance vs limit) is one of the fastest ways to boost your score. Paying a card from 90% utilisation to 30% can improve your score by 50-100 points within a billing cycle.",
      },
      {
        q: 'What if I can only afford minimum payments?',
        a: "Start there — minimums keep you current and avoid late fees. Then look for any extra: £10, £20, even £5. On high-APR debt, small extras have a disproportionate impact. You can also call your issuer to negotiate a lower rate or hardship plan.",
      },
    ],
    keywords: [
      'how to pay off credit card debt',
      'pay off credit cards fast',
      'credit card debt payoff plan',
      'credit card debt strategy',
      'best way to pay off credit cards',
      'credit card debt calculator',
    ],
    relatedPosts: [
      'how-to-pay-off-credit-card-debt',
      'debt-avalanche-method-guide',
      'high-interest-debt-first',
      'minimum-payments-trap',
    ],
    relatedCalculators: ['avalanche', 'snowball'],
    category: 'Credit Cards',
  },

  {
    slug: 'pay-off-student-loans',
    title: 'How to Pay Off Student Loans Faster (2026 Guide)',
    description:
      'A step-by-step guide to paying off student loans faster. Compare repayment strategies, see how extra payments save thousands, and use our free calculator.',
    definitionBlock:
      'To pay off student loans faster, make payments above the minimum and direct extra money to the highest-interest loan first (avalanche method). For US federal loans averaging 5-7% APR, paying just $100 extra per month on a $38,000 balance saves over $7,000 in interest and cuts 7+ years off the standard 10-year repayment. UK Plan 2 loans work differently — they\'re written off after 30 years, so early repayment only makes sense if you\'ll actually clear the full balance.',
    recommendedCalculator: 'avalanche',
    calculatorReason:
      'Student loans often have varying rates across multiple loans. The avalanche method targets the highest-rate loan first, which is especially effective when you have a mix of subsidised and unsubsidised loans.',
    heroStat: {
      value: '$38,000',
      label: 'Average US student loan balance',
      description:
        'The average graduate takes 20 years to fully repay. A structured plan can cut that in half.',
    },
    intro: [
      "Student loans are the second-largest category of consumer debt after mortgages. Unlike credit cards, they typically have lower interest rates (3-8%), but the balances are much larger — making them a long-term commitment that can delay other life goals like buying a home or starting a family.",
      "The key insight with student loans is that small extra payments compound dramatically over a long repayment period. Because these loans often span 10-25 years, even modest additional payments in the early years save thousands.",
      "This guide covers strategies specific to student loans, including how to handle multiple loans with different rates, when it makes sense to pay off early vs investing, and the differences between US federal and UK student loan repayment.",
    ],
    steps: [
      {
        title: 'List all your student loans with balances, rates, and servicers',
        text: "Most graduates have 4-6 separate loans with different rates. Log into your servicer's website or check studentaid.gov (US) / Student Loans Company (UK) to get the full picture. Note which are federal vs private — this affects your options.",
      },
      {
        title: 'Understand your repayment plan options',
        text: "US borrowers: compare Standard (10yr), Graduated, Extended, and income-driven plans (IBR, PAYE, SAVE). UK borrowers: repayment is automatic above the threshold (£27,295 for Plan 2). Make sure you're on the right plan before optimising.",
      },
      {
        title: 'Decide whether early repayment makes financial sense',
        text: "If your student loan rate is below 5% and you could invest at 7%+, you may be better off investing the difference. If your rate is above 6%, or you value the psychological freedom of being debt-free, prioritise repayment. UK Plan 2 borrowers: only pay extra if you'll realistically clear the full balance before the 30-year write-off.",
      },
      {
        title: 'Target the highest-rate loan first',
        text: "Pay minimums on all loans, then direct every extra pound or dollar to the highest-rate loan. If you have a mix of 4% and 7% loans, the 7% loan costs nearly twice as much in interest — eliminating it first saves the most money.",
      },
      {
        title: 'Use windfalls strategically',
        text: "Tax refunds, work bonuses, and gifts can make a huge dent. A single $1,000 extra payment on a $30,000 loan at 6% saves over $1,200 in interest over the life of the loan. Direct windfalls to your highest-rate loan.",
      },
      {
        title: 'Automate and track progress',
        text: "Set up autopay for at least minimums (many servicers offer a 0.25% rate reduction for autopay). Then set a separate recurring extra payment to your target loan. Track your progress monthly with a debt payoff calculator.",
      },
    ],
    tips: [
      'US borrowers: enrolling in autopay typically gives a 0.25% interest rate reduction. It adds up — on a $38,000 balance, that saves about $950 over 10 years.',
      'When making extra payments, specify they should go to principal, not future payments. Some servicers advance your due date instead of reducing principal, which costs you more.',
      "Consider refinancing private loans if your credit has improved since graduation — you may qualify for a significantly lower rate. But don't refinance federal loans unless you're sure you won't need income-driven plans or forgiveness options.",
      "If you're on an income-driven repayment plan working toward forgiveness (PSLF or 20/25-year), don't make extra payments — they won't help if the remaining balance will be forgiven.",
    ],
    faqs: [
      {
        q: 'Should I pay off student loans or invest?',
        a: "Compare your loan rate to expected investment returns. If loans are above 6-7%, pay them off first. If below 4-5%, investing may yield better returns. Between 4-7% is a grey area — consider splitting extra money 50/50 for both financial and psychological benefit.",
      },
      {
        q: 'Should I pay off student loans before buying a house?',
        a: "Not necessarily. Your debt-to-income ratio matters more than total debt. If your student loan payments are manageable and you have a good down payment, you can do both. Use a calculator to see how extra payments affect your timeline.",
      },
      {
        q: 'Does paying off student loans early hurt your credit score?',
        a: "Your score may dip slightly when you close the account (reducing your credit mix), but the long-term impact of having less debt is positive. The dip is usually 5-15 points and recovers within a few months.",
      },
      {
        q: 'How do UK student loans work differently?',
        a: "UK Plan 2 loans (post-2012) are repaid at 9% of income above £27,295, with interest of RPI + up to 3%. The balance is written off after 30 years. Most borrowers won't repay in full, so extra payments only make sense if your balance is relatively small or your income is high enough to clear it.",
      },
    ],
    keywords: [
      'how to pay off student loans',
      'pay off student loans faster',
      'student loan payoff plan',
      'student loan repayment strategy',
      'student loan calculator',
      'student debt payoff',
    ],
    relatedPosts: [
      'student-loan-payoff-strategies',
      'debt-avalanche-method-guide',
      'emergency-fund-vs-debt',
    ],
    relatedCalculators: ['avalanche', 'deadline'],
    category: 'Student Loans',
  },

  {
    slug: 'pay-off-car-loan',
    title: 'How to Pay Off a Car Loan Early (2026 Guide)',
    description:
      'Learn how to pay off your car loan faster and save on interest. Step-by-step plan, calculator, and tips specific to auto loans.',
    definitionBlock:
      'To pay off a car loan early, make extra payments toward the principal each month. On a typical $28,000 car loan at 7% APR over 60 months, paying just $100 extra per month saves over $1,800 in interest and pays off the loan 14 months early. Check your loan agreement for prepayment penalties before starting — most modern auto loans have none.',
    recommendedCalculator: 'deadline',
    calculatorReason:
      'Car loans have a fixed term, so the deadline calculator lets you see exactly how much extra you need each month to pay it off by a target date — like before the warranty expires.',
    heroStat: {
      value: '$733',
      label: 'Average US monthly car payment',
      description:
        'The average new car loan is $728/month for 68 months. That\'s nearly 6 years of payments on a depreciating asset.',
    },
    intro: [
      "Car loans are the third-largest consumer debt category, and they come with a unique problem: unlike a house, your car loses value every month. If your loan term is long enough, you can end up owing more than the car is worth — a situation called being 'underwater' or 'upside down'.",
      "The average new car loan in 2026 is $28,000-35,000 at 7-8% APR for 60-72 months. Used car loans average $24,000 at 11-12% APR. Those rates make extra payments surprisingly impactful.",
      "This guide focuses specifically on auto loans — the strategies, pitfalls, and opportunities that are unique to car debt.",
    ],
    steps: [
      {
        title: 'Check your loan terms for prepayment penalties',
        text: "Most modern car loans have no penalty for early payoff, but some lenders charge a fee. Check your contract or call your lender. If there is a penalty, calculate whether the interest savings still make it worthwhile.",
      },
      {
        title: 'Find your current payoff balance and rate',
        text: "Your payoff balance may differ from your statement balance because of how interest accrues daily. Call your lender or check online for the exact payoff quote. Note your APR — if it's above 5%, extra payments will save you significant money.",
      },
      {
        title: 'Round up your payments',
        text: "The easiest starting point: if your payment is $487, round up to $500. That extra $13/month barely feels different but saves hundreds in interest over the loan. Some lenders let you set this up as an automatic round-up.",
      },
      {
        title: 'Make one extra payment per year',
        text: "If you're paid biweekly, you get 26 paychecks per year. Set aside half a car payment from each paycheck, and you'll make 13 monthly payments instead of 12 — one full extra payment without feeling the pinch.",
      },
      {
        title: 'Direct windfalls to the principal',
        text: "Tax refunds, bonuses, or cash gifts can make a major dent. A single $1,000 extra payment early in a $28,000 loan at 7% saves about $400 in interest. Specify that extra payments go to principal, not toward future payments.",
      },
      {
        title: 'Consider refinancing if rates have dropped',
        text: "If your credit score has improved since you bought the car, or if market rates have dropped, refinancing can lower your rate. Even a 2% reduction on a $25,000 balance saves about $1,500 over the remaining term.",
      },
    ],
    tips: [
      "Don't extend your loan term when refinancing just to lower the monthly payment — you'll pay more interest overall. Refinance to a lower rate at the same or shorter term.",
      "If you're underwater on your car loan (owe more than it's worth), focus on aggressive extra payments until you have positive equity. This protects you if the car is totalled or stolen.",
      'Avoid the temptation to trade in a car with remaining loan balance for a new car. Rolling negative equity into a new loan is one of the most expensive financial mistakes people make.',
      'If your car loan rate is below 4%, you may be better off investing extra money rather than prepaying. Use the interest rate as your guide.',
    ],
    faqs: [
      {
        q: 'Is it worth paying off a car loan early?',
        a: "If your rate is above 5%, yes — you'll save meaningful money on interest. If it's below 3-4%, the math favours investing instead. Also consider the psychological benefit of eliminating a monthly payment.",
      },
      {
        q: 'Does paying off a car loan early hurt your credit?',
        a: "Your score may dip slightly (5-10 points) when the account closes, but the reduction in total debt helps your overall profile. The dip is temporary and recovers within a few months.",
      },
      {
        q: 'Should I pay off my car loan or credit cards first?',
        a: "Almost always credit cards first — they have much higher interest rates (22% vs 7% average). The avalanche method naturally handles this: you'll attack the highest rate regardless of debt type.",
      },
      {
        q: 'Can I pay off a car loan with a personal loan?',
        a: "Only if the personal loan has a significantly lower rate. In practice, personal loan rates are often similar to or higher than car loan rates, so this rarely makes sense. Your car itself serves as collateral, which typically earns you a lower rate.",
      },
    ],
    keywords: [
      'how to pay off car loan early',
      'pay off car loan faster',
      'car loan payoff calculator',
      'auto loan early payoff',
      'car loan extra payments',
      'car loan repayment strategy',
    ],
    relatedPosts: [
      'extra-payments-save-thousands',
      'debt-avalanche-method-guide',
      'debt-payoff-calculator-guide',
    ],
    relatedCalculators: ['deadline', 'avalanche'],
    category: 'Car Loans',
  },

  {
    slug: 'pay-off-medical-debt',
    title: 'How to Pay Off Medical Debt (2026 Guide)',
    description:
      'A step-by-step guide to managing and paying off medical debt. Learn about negotiation, payment plans, financial assistance, and payoff strategies.',
    definitionBlock:
      'To pay off medical debt, first verify the charges are correct (medical billing errors occur in up to 80% of bills), then negotiate — most hospitals offer financial assistance programs and will accept 40-60% of the original amount. For remaining debt, use the snowball method (smallest bill first) because medical bills typically have 0% interest, making quick wins the priority over interest savings.',
    recommendedCalculator: 'snowball',
    calculatorReason:
      'Medical bills typically carry 0% interest (unless sent to collections), so the snowball method is ideal — you eliminate individual bills quickly for motivational wins without an interest penalty.',
    heroStat: {
      value: '80%',
      label: 'Of medical bills contain errors',
      description:
        'Always review your bills line by line before paying. Common errors include duplicate charges, incorrect procedure codes, and charges for services not received.',
    },
    intro: [
      "Medical debt is unlike any other kind of debt. You didn't choose it. You didn't plan for it. And the billing system behind it is one of the most confusing, error-prone, and negotiable in existence.",
      "The US has over $220 billion in medical debt, and 1 in 5 Americans carry some form of it. But here's what most people don't realise: medical debt is often the most negotiable type of debt, and there are multiple paths to reducing or eliminating it that don't exist for credit cards or loans.",
      "This guide walks you through the specific steps for medical debt — from verifying charges to negotiation tactics to structuring a payoff plan.",
    ],
    steps: [
      {
        title: 'Request an itemised bill and check for errors',
        text: "Never pay a medical bill without seeing the itemised version. Request one from the billing department. Check for duplicate charges, incorrect dates, procedures you didn't receive, and inflated charges. Up to 80% of medical bills contain at least one error.",
      },
      {
        title: 'Check if you qualify for financial assistance',
        text: "Most hospitals (especially non-profits) are legally required to have financial assistance or charity care programs. If your income is below 200-400% of the federal poverty line, you may qualify for significant reductions or full write-offs. Ask the billing department directly.",
      },
      {
        title: 'Negotiate the bill',
        text: "Medical prices are not fixed. Call the billing department and ask for: the cash-pay discount (often 20-50% off), a payment plan, or a lump-sum settlement. If you can offer to pay immediately, hospitals routinely accept 40-60% of the billed amount.",
      },
      {
        title: 'Set up a payment plan before it goes to collections',
        text: "Most providers offer 0% interest payment plans if you arrange them proactively. Once a bill goes to collections (usually after 90-180 days), it becomes much harder to negotiate and can damage your credit score.",
      },
      {
        title: 'Use the snowball method for multiple medical bills',
        text: "Since medical bills typically don't accrue interest, the snowball method (smallest balance first) is ideal. Clear the small bills first to reduce the number of accounts you're juggling, then focus on the larger ones.",
      },
      {
        title: 'Check if new protections apply to you',
        text: "The No Surprises Act (US, 2022+) protects against surprise out-of-network billing. Medical debt under $500 no longer appears on credit reports. These protections may reduce what you actually owe.",
      },
    ],
    tips: [
      "Never put medical debt on a credit card. You're converting 0% interest debt into 22%+ interest debt — one of the most expensive mistakes you can make.",
      'Ask for the "self-pay" or "uninsured" rate even if you have insurance. Sometimes the cash price is lower than your insurance-negotiated rate plus your deductible.',
      'If a bill has gone to collections, you can still negotiate. Debt collectors often bought the debt for pennies on the dollar and will accept 25-50% of the face value as settlement.',
      'Medical debt under $500 has been removed from credit reports since 2023. If you see it on your report, dispute it with the credit bureau.',
    ],
    faqs: [
      {
        q: 'Does medical debt affect your credit score?',
        a: "Since 2023, medical debt under $500 doesn't appear on credit reports. Larger medical collections can still affect your score, but the three major credit bureaus now give a 1-year grace period before reporting — giving you time to resolve the debt or set up a payment plan.",
      },
      {
        q: 'Can you negotiate medical bills after insurance?',
        a: "Yes. Even after insurance has paid their portion, you can negotiate your remaining balance. Ask about financial hardship programs, cash-pay discounts on your portion, or extended payment plans. Hospitals would rather get paid something than send it to collections.",
      },
      {
        q: 'Should I pay medical debt or credit cards first?',
        a: "Pay credit cards first — they charge 20%+ interest while medical bills are usually 0% interest. Set up a payment plan for medical debt (keeping it current), and direct extra payments to high-APR credit cards.",
      },
      {
        q: 'What happens if you don\'t pay medical debt?',
        a: "After 90-180 days of non-payment, the provider typically sends it to a collections agency. This can appear on your credit report and result in calls from collectors. In extreme cases, the collector may sue. Always communicate with the provider before this point — most will work with you.",
      },
    ],
    keywords: [
      'how to pay off medical debt',
      'medical debt negotiation',
      'hospital bill payment plan',
      'medical debt payoff',
      'negotiate medical bills',
      'medical debt credit score',
    ],
    relatedPosts: [
      'debt-snowball-method-guide',
      'debt-payoff-plan-beginners',
      'emergency-fund-vs-debt',
    ],
    relatedCalculators: ['snowball', 'cash-flow'],
    category: 'Medical Bills',
  },

  {
    slug: 'pay-off-personal-loan',
    title: 'How to Pay Off a Personal Loan Early (2026 Guide)',
    description:
      'Step-by-step guide to paying off a personal loan faster. Learn when extra payments make sense, how to avoid penalties, and which strategy saves the most.',
    definitionBlock:
      'To pay off a personal loan early, make extra payments directed toward the principal each month. On a typical £10,000 personal loan at 9% APR over 5 years, paying £75 extra per month saves over £1,100 in interest and clears the loan 18 months early. Always check for early repayment charges first — UK lenders can charge up to 2 months\' interest, while most US personal loans have no penalty.',
    recommendedCalculator: 'deadline',
    calculatorReason:
      'Personal loans have a fixed end date. The deadline calculator lets you set your target payoff date and see the exact extra payment needed — perfect for structured loan repayment.',
    heroStat: {
      value: '9.5%',
      label: 'Average personal loan APR',
      description:
        'Personal loan rates range from 6% (excellent credit) to 36% (poor credit). Your rate determines how much extra payments save.',
    },
    intro: [
      "Personal loans sit in the middle of the debt spectrum — lower rates than credit cards but higher than mortgages. They're used for everything from debt consolidation to home improvements to unexpected expenses.",
      "Because personal loans have a fixed term and fixed rate, they respond predictably to extra payments. Every additional pound goes directly to reducing principal, and you can calculate the exact savings with precision.",
      "This guide covers the specifics of personal loan early payoff — when it makes sense, how to do it, and what to watch out for.",
    ],
    steps: [
      {
        title: 'Check your loan terms for early repayment charges',
        text: "UK lenders can charge up to 1-2 months' interest as an early repayment fee. US personal loans rarely have prepayment penalties, but check your agreement. Calculate whether the interest savings outweigh any penalty — they usually do.",
      },
      {
        title: 'Know your current balance and rate',
        text: "Log into your lender's portal for the exact payoff balance. Note whether your loan uses simple interest (most personal loans) or precomputed interest (some subprime lenders) — with precomputed interest, early payoff saves less.",
      },
      {
        title: 'Decide between extra monthly payments or lump sums',
        text: "Both work. Regular extra payments are easier to budget for. Lump sums (from bonuses, tax refunds) make a bigger one-time impact. Ideally, do both — set up a recurring extra payment and add windfalls when they come.",
      },
      {
        title: 'Direct extra payments to principal',
        text: "When making extra payments, contact your lender to ensure they're applied to principal, not advanced to future payments. Some lenders default to advancing your due date, which doesn't reduce interest cost.",
      },
      {
        title: 'Consider the avalanche order if you have multiple debts',
        text: "If your personal loan isn't your highest-rate debt, you might save more by attacking higher-rate debts first. Use a debt payoff calculator to compare the total interest under different ordering strategies.",
      },
      {
        title: 'Track progress and celebrate milestones',
        text: "Personal loans have a satisfying quality: the balance goes down predictably with each payment. Track your progress percentage and celebrate milestones at 25%, 50%, and 75% paid. The Payoff app does this automatically with milestone celebrations.",
      },
    ],
    tips: [
      'If your personal loan rate is above 10%, consider refinancing. Rates have fluctuated significantly — if your credit has improved since you took the loan, you may qualify for a much lower rate.',
      'Biweekly payments (half your monthly payment every two weeks) result in 13 full payments per year instead of 12 — an easy extra payment without feeling the difference.',
      "If you took a personal loan for debt consolidation, avoid the trap of running up the credit cards again. Cut up or freeze the cards you consolidated.",
      "Don't raid your emergency fund to pay off a low-rate personal loan. Having 0 debt but 0 savings is a precarious position that leads to more debt if anything goes wrong.",
    ],
    faqs: [
      {
        q: 'Is it worth paying off a personal loan early?',
        a: "If your rate is above 7-8%, usually yes — the interest savings are significant. If below 5%, you might earn more by investing the extra money. Between 5-7%, it's a personal preference between mathematical optimisation and the peace of being debt-free.",
      },
      {
        q: 'Will paying off a personal loan early help my credit score?',
        a: "Paying off a personal loan can cause a small temporary dip (from closing an instalment account), but the long-term effect of lower total debt is positive. The dip is typically 5-15 points and recovers within 1-2 months.",
      },
      {
        q: 'Should I pay off a personal loan or credit card first?',
        a: "Almost always credit cards first — they have higher interest rates (22% average vs 9.5% for personal loans). The exception is if your personal loan has a very high rate (15%+) from a subprime lender.",
      },
      {
        q: 'Can I pay off a personal loan with another personal loan?',
        a: "This is refinancing — and it makes sense if the new loan has a significantly lower rate. But watch for origination fees (1-8%) and make sure the total cost (rate + fees) is actually lower than your current loan.",
      },
    ],
    keywords: [
      'how to pay off personal loan early',
      'personal loan early repayment',
      'personal loan payoff calculator',
      'pay off personal loan faster',
      'personal loan extra payments',
      'personal loan repayment strategy',
    ],
    relatedPosts: [
      'extra-payments-save-thousands',
      'debt-consolidation-vs-snowball',
      'debt-payoff-plan-beginners',
    ],
    relatedCalculators: ['deadline', 'avalanche'],
    category: 'Personal Loans',
  },

  // ─── AMOUNT-BASED GUIDES ────────────────────────────────────────

  {
    slug: 'pay-off-10k-debt',
    title: 'How to Pay Off $10,000 in Debt: A Realistic Plan',
    description:
      'A step-by-step plan to pay off $10,000 in debt — with timelines for different budgets, strategy recommendations, and a free calculator to see your payoff date.',
    definitionBlock:
      'To pay off $10,000 in debt, you need a structured plan with extra payments. At 15% average APR, paying $300/month clears $10K in 3 years 8 months (paying $3,100 in interest). Paying $500/month clears it in 2 years (paying $1,600 in interest). The avalanche method saves the most if your debts have different rates; the snowball method works best if you have 3+ separate debts and need motivational wins.',
    recommendedCalculator: 'snowball',
    calculatorReason:
      'At the $10K level, you likely have 2-4 separate debts. The snowball calculator shows how quickly you can eliminate individual debts for momentum.',
    heroStat: {
      value: '2 years',
      label: 'To pay off $10K at $500/month',
      description:
        'At 15% average APR, $500/month eliminates $10,000 in debt in about 24 months. Even $300/month gets you there in under 4 years.',
    },
    intro: [
      "$10,000 in debt is one of the most common amounts people face — it's enough to feel overwhelming but absolutely achievable with a plan. Most people at this level have a mix of credit cards, a personal loan, and maybe a small medical bill.",
      "The good news: at $10K, you can realistically become debt-free in 1-3 years depending on how much extra you can put toward it each month. And because the finish line is visible, staying motivated is easier than with larger balances.",
      "This guide gives you a concrete plan with real timelines based on different monthly budgets, plus the best strategy for your specific situation.",
    ],
    steps: [
      {
        title: 'List all debts that make up the $10K',
        text: "Write down each debt with its balance, interest rate, and minimum payment. At this level, you probably have 2-5 separate debts. Seeing them individually makes the total less intimidating.",
      },
      {
        title: 'Calculate your available extra payment',
        text: "After all minimums are paid, how much extra can you put toward debt? Even $50-100 makes a big difference at the $10K level. Use the Payoff budget hub to identify money you can redirect.",
      },
      {
        title: 'Pick your strategy based on your debt count',
        text: "If you have 1-2 debts: use avalanche (highest rate first). If you have 3+ debts: consider snowball (smallest first) — at the $10K level, you'll start eliminating debts within months, which is incredibly motivating.",
      },
      {
        title: 'Set your payoff date and work backward',
        text: "A 2-year target is aggressive but doable for most people at $10K. That's roughly $500/month total (including minimums). A 3-year target needs about $350/month. Use the deadline calculator to find your exact number.",
      },
      {
        title: 'Automate extra payments on day one',
        text: "Don't wait to feel motivated — set up automatic extra payments immediately after your budget is finalised. Automation removes decision fatigue and ensures consistency.",
      },
      {
        title: 'Track monthly and celebrate every $1,000 milestone',
        text: "At $10K, you have 10 natural milestones. Celebrate each $1,000 cleared — it reinforces the behaviour and keeps you going through the middle months when motivation naturally dips.",
      },
    ],
    tips: [
      'If most of your $10K is credit card debt, a balance transfer to a 0% card could save you $1,500+ in interest over 18 months. Just make sure you pay it off before the promotional period ends.',
      'The $10K level is where side income becomes most impactful. Even $200/month from freelancing, selling items, or overtime cuts your timeline by 6-8 months.',
      "Don't try to pay it all off at once by depleting savings. Keep at least $1,000 as an emergency buffer. Draining savings to pay debt often leads to more debt when something unexpected happens.",
      "At $10K, you're statistically in the top quartile of people who actually create a payoff plan. Most people at this level who follow a structured strategy become debt-free. The plan is what makes the difference.",
    ],
    faqs: [
      {
        q: 'How long does it take to pay off $10,000 in debt?',
        a: 'It depends on your extra payment and interest rates. At 15% average APR: $200/month extra takes about 5 years, $300/month takes 3.5 years, $500/month takes 2 years, $1,000/month takes about 11 months. Use a debt payoff calculator for your exact timeline.',
      },
      {
        q: 'Should I get a debt consolidation loan for $10K?',
        a: "Possibly — if you can get a rate significantly lower than your current average (e.g., consolidating 22% credit cards into an 8% personal loan). But avoid extending the term — a lower monthly payment over a longer period often costs more total interest.",
      },
      {
        q: 'Is $10,000 in debt a lot?',
        a: "It's enough to feel heavy but absolutely manageable. The average US household has $24,000 in non-mortgage debt. At $10K, you're below average and within realistic reach of being debt-free in 1-3 years with a structured plan.",
      },
      {
        q: 'What if I can only pay minimums on $10,000?',
        a: "Start there — it keeps you current and avoids late fees. Then look for any extra: cancel one subscription, sell something, pick up a few hours of overtime. Even $25/month extra on $10K at 18% saves $3,800 in interest and cuts 4 years off the payoff time.",
      },
    ],
    keywords: [
      'how to pay off 10000 in debt',
      'pay off 10k debt',
      '10000 debt payoff plan',
      'how long to pay off 10000',
      'debt payoff plan 10k',
    ],
    relatedPosts: [
      'debt-payoff-plan-beginners',
      'snowball-vs-avalanche',
      'extra-payments-save-thousands',
    ],
    relatedCalculators: ['snowball', 'avalanche', 'deadline'],
    category: 'By Amount',
  },

  {
    slug: 'pay-off-20k-debt',
    title: 'How to Pay Off $20,000 in Debt: Your Complete Roadmap',
    description:
      'A realistic plan to pay off $20,000 in debt. Timelines for different budgets, the best strategy for your situation, and a free calculator.',
    definitionBlock:
      'To pay off $20,000 in debt, you need $400-800/month in total payments depending on your target timeline. At 15% average APR, $500/month total clears $20K in about 5 years (paying $9,000+ in interest). Raising to $700/month cuts it to 3 years (paying $4,700 in interest). The hybrid method works well at this level — attack high-interest debts first while clearing any small balances under $500 for quick momentum.',
    recommendedCalculator: 'hybrid',
    calculatorReason:
      'At $20K, you likely have a mix of debt types and sizes. The hybrid calculator optimises for both interest savings and motivational wins.',
    heroStat: {
      value: '$4,300',
      label: 'Interest saved paying $700 vs $500/month',
      description:
        'On $20K at 15% average APR, the difference between $500/month and $700/month is $4,300 in interest and 2 years of payments.',
    },
    intro: [
      "$20,000 is the tipping point where debt starts to feel like a permanent fixture rather than a temporary problem. At this level, minimum payments barely make a dent, and the interest alone can cost $2,000-4,000 per year.",
      "But here's the reality: $20K is well within reach of a structured payoff plan. It typically takes 2-4 years with focused effort, and the strategies that work at this level are well-proven.",
      "This guide gives you a concrete roadmap with real numbers, multiple timeline options, and the specific strategy that works best for a $20K debt load.",
    ],
    steps: [
      {
        title: 'Get the complete picture',
        text: 'List every debt: credit cards, personal loans, medical bills, car loan. At $20K, most people have 3-7 separate debts. Note each balance, rate, and minimum payment. Total your minimums — this is your baseline.',
      },
      {
        title: 'Choose your target timeline',
        text: 'Be realistic: 2 years is aggressive (needs ~$1,000/month total), 3 years is challenging but doable (~$700/month), 4 years is steady (~$550/month). Pick a target that stretches you but doesn\'t break you.',
      },
      {
        title: 'Use the hybrid strategy',
        text: 'At $20K with multiple debts, the hybrid method works best: first eliminate any small debts under $500 (quick wins), then switch to avalanche (highest rate first) for the larger debts. This gives you early momentum without sacrificing significant interest savings.',
      },
      {
        title: 'Attack the biggest interest drain',
        text: "After clearing small debts, identify which debt is costing you the most per month in interest (highest rate x highest balance). That's your primary target. Often a single credit card is responsible for 40-50% of your total interest cost.",
      },
      {
        title: 'Build in margin for life',
        text: "Don't allocate 100% of your disposable income to debt. Keep 10-15% as buffer for unexpected expenses. A too-aggressive plan that crashes when the car needs repairs is worse than a steady plan you maintain for 3 years.",
      },
      {
        title: 'Review and adjust quarterly',
        text: "Every 3 months, review your progress and recalculate. Your minimum payments decrease as debts are eliminated, freeing up more money for the next target. The snowball effect accelerates noticeably after the first 6-12 months.",
      },
    ],
    tips: [
      'At $20K, consider whether one large debt consolidation loan makes sense. If you can get 8-10% on a consolidated loan vs 20%+ on credit cards, the interest savings are substantial. But only if you stop using the cards.',
      'Split your extra payments: 80% to the target debt, 20% to savings. Building a $1,000-2,000 emergency fund alongside your debt payoff prevents setbacks from becoming catastrophes.',
      "The hardest months are 6-12 into the plan, when the initial motivation fades but the finish line isn't visible yet. This is where tracking tools, milestone celebrations, and an AI coach make the difference.",
      'If you have a partner, tackling $20K together is dramatically more effective. Household mode in Payoff lets you split responsibilities and celebrate shared progress.',
    ],
    faqs: [
      {
        q: 'How long does it take to pay off $20,000 in debt?',
        a: 'At 15% average APR: $500/month total takes about 5 years, $700/month takes about 3 years, $1,000/month takes about 2 years. The exact timeline depends on your interest rate mix. Use a debt payoff calculator for precise numbers.',
      },
      {
        q: 'Is $20,000 in debt bad?',
        a: "It's below the US average of $24,000 in non-mortgage debt. It's significant enough to warrant a structured plan, but absolutely manageable. Millions of people at this level become debt-free every year with the right approach.",
      },
      {
        q: 'Should I use savings to pay off $20K in debt?',
        a: "Keep $1,000-2,000 as an emergency buffer, then direct savings above that to high-interest debt. The exception: don't touch retirement accounts — the tax penalty and lost compounding usually outweigh the interest savings.",
      },
      {
        q: 'Can I negotiate my debts to reduce the $20K?',
        a: "Medical bills: often yes (negotiate for 40-60% of the amount). Credit cards: if you're significantly behind, the issuer may offer a settlement. Personal loans: rarely negotiable unless you're in default. Always negotiate before the debt goes to collections.",
      },
    ],
    keywords: [
      'how to pay off 20000 in debt',
      'pay off 20k debt',
      '20000 debt payoff plan',
      'how long to pay off 20000',
      'debt payoff plan 20k',
    ],
    relatedPosts: [
      'debt-payoff-plan-beginners',
      'seven-debt-payoff-strategies',
      'couples-debt-payoff',
    ],
    relatedCalculators: ['hybrid', 'avalanche', 'deadline'],
    category: 'By Amount',
  },

  {
    slug: 'pay-off-50k-debt',
    title: 'How to Pay Off $50,000 in Debt: A Long-Term Strategy',
    description:
      'A realistic strategy for paying off $50,000+ in debt. Timelines, strategies for mixed debt types, and how to stay motivated over 3-5 years.',
    definitionBlock:
      'To pay off $50,000 in debt, you need a long-term strategy combining debt prioritisation, income growth, and lifestyle adjustments. At 12% average APR, paying $1,200/month total clears $50K in about 5 years (paying $22,000 in interest). The avalanche method saves the most at this level because the interest cost is substantial. Key: don\'t try to rush — a sustainable 3-5 year plan outperforms an aggressive plan you abandon after 6 months.',
    recommendedCalculator: 'avalanche',
    calculatorReason:
      'At $50K, interest costs are significant — the avalanche method can save $5,000-15,000+ compared to snowball, which matters more at larger balances.',
    heroStat: {
      value: '$22,000+',
      label: 'Total interest on $50K over 5 years',
      description:
        'At 12% average APR, paying $1,200/month means nearly half your payments go to interest. The right strategy can save $5,000-15,000 of that.',
    },
    intro: [
      "$50,000 in debt is a number that can feel impossible. But it's also a number that millions of people have successfully paid off — and you can too. The difference between people who clear $50K and people who stay stuck isn't income or luck. It's having a plan and sticking to it.",
      "At this level, the payoff journey is measured in years, not months. That means sustainability matters more than aggression. A plan you can maintain for 4 years beats a plan you burn out on after 4 months.",
      "This guide is specifically designed for larger debt loads — the strategies, psychology, and practical tips that work when the finish line is years away.",
    ],
    steps: [
      {
        title: 'Categorise your debts by type and rate',
        text: "At $50K, you likely have a mix: credit cards (18-25%), personal loans (7-15%), student loans (4-8%), maybe a car loan or medical debt. Group them by rate tier — this determines your attack order.",
      },
      {
        title: 'Set a realistic 3-5 year timeline',
        text: "3 years needs ~$1,700/month. 4 years needs ~$1,300/month. 5 years needs ~$1,100/month. Pick a target that's challenging but leaves room for life. You can always accelerate later if income increases.",
      },
      {
        title: 'Use the avalanche method strictly',
        text: "At $50K, the interest cost is too high to ignore. The avalanche method (highest rate first) can save $5,000-15,000 compared to snowball. If you need motivational wins, clear one small debt under $500 first, then switch to avalanche.",
      },
      {
        title: 'Focus on increasing income alongside cutting expenses',
        text: "At higher debt levels, you can't cut your way out — you need to earn your way out too. A side gig adding $500-1,000/month to your debt payments cuts years off the timeline. Even temporary income boosts (overtime, freelancing, selling assets) make a massive difference.",
      },
      {
        title: 'Build systems, not willpower',
        text: "Willpower fades. Systems persist. Automate every payment. Set up calendar reminders for quarterly reviews. Use an app that tracks progress and sends milestone celebrations. Remove the friction from every step.",
      },
      {
        title: 'Plan for the acceleration phase',
        text: "The first year is the slowest — you're mostly paying interest. But as debts get eliminated and minimums drop, more money cascades to the remaining debts. By year 3-4, the snowball effect is dramatic. Know this pattern so the slow start doesn't discourage you.",
      },
    ],
    tips: [
      'Consider a debt management plan (DMP) through a non-profit credit counselling agency. They can sometimes negotiate lower rates with creditors and consolidate payments — without a new loan.',
      "At $50K, therapy or financial coaching isn't a luxury — it's a tool. The psychological weight of large debt is real, and professional support can help you stay the course over multiple years.",
      "Don't compare yourself to people paying off $10K in 6 months. Your timeline is different, your challenge is different, and your success will be just as valid. Progress is progress.",
      "Every 6 months, recalculate your payoff date. As debts are eliminated and more money cascades, you'll often find you're ahead of schedule. That knowledge is incredibly motivating.",
    ],
    faqs: [
      {
        q: 'How long does it take to pay off $50,000 in debt?',
        a: 'At 12% average APR: $1,000/month takes about 6.5 years, $1,200/month takes about 5 years, $1,500/month takes about 4 years, $2,000/month takes about 2.5 years. Use a debt payoff calculator to model your specific debts.',
      },
      {
        q: 'Should I declare bankruptcy for $50K in debt?',
        a: "Probably not. $50K is large but manageable with a structured plan. Bankruptcy stays on your credit for 7-10 years and can affect employment and housing. It's typically a last resort for debt levels above $75-100K with no realistic repayment path.",
      },
      {
        q: 'Is a debt consolidation loan worth it at $50K?',
        a: "If you can get a significantly lower rate (e.g., consolidating 20% credit card debt into a 10% personal loan), yes. At $50K, even a 5% rate reduction saves $2,500+ per year in interest. But qualification may be difficult if your debt-to-income ratio is high.",
      },
      {
        q: 'How do I stay motivated paying off $50K over 5 years?',
        a: "Break it into milestones ($5K increments), track progress visually, celebrate each debt eliminated, and use an AI coach for personalised encouragement. The Payoff app's Focus Mode is specifically designed for this — showing only your progress percentage and next action.",
      },
    ],
    keywords: [
      'how to pay off 50000 in debt',
      'pay off 50k debt',
      '50000 debt payoff plan',
      'how long to pay off 50000',
      'large debt payoff strategy',
      'debt payoff plan 50k',
    ],
    relatedPosts: [
      'seven-debt-payoff-strategies',
      'focus-mode-financial-anxiety',
      'debt-avalanche-method-guide',
    ],
    relatedCalculators: ['avalanche', 'deadline', 'hybrid'],
    category: 'By Amount',
  },
];

/** Get all guide slugs (for generateStaticParams) */
export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

/** Get a guide by slug */
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
