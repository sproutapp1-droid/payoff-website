# Blog Post Template

## Frontmatter
```yaml
---
title: "Descriptive SEO Title (60-70 chars)"
description: "Meta description targeting primary keyword (150-160 chars)"
date: "2026-MM-DD"
author: "Payoff Team"
category: "Guides|Strategies|Features|Wellness|Planning"
tags: ["primary keyword", "secondary keyword", "long-tail variant", "related term", "another variant", "brand term"]
---
```

## Available MDX Components

### Callout (tip/warning/info)
```
<Callout type="tip">
Helpful tip text here.
</Callout>
```

### StatHighlight
```
<StatHighlight value="$45,000" label="Average household debt" description="Optional description below the stat." />
```

### ProsCons
```
<ProsCons pros={["Pro item 1", "Pro item 2", "Pro item 3"]} cons={["Con item 1", "Con item 2", "Con item 3"]} />
```

### ComparisonTable
```
<ComparisonTable headers={["Feature", "Snowball", "Avalanche"]} rows={[["Focus", "Smallest balance", "Highest APR"], ["Best for", "Motivation", "Saving money"]]} />
```

### StepByStep
```
<StepByStep steps={[{title: "Step 1 Title", description: "Step 1 description."}, {title: "Step 2 Title", description: "Step 2 description."}]} />
```

### CTABox
```
<CTABox title="Ready to start?" description="The Payoff app has everything you need." buttonText="Join the Waitlist" href="/#waitlist" />
```
Note: href should be `/#waitlist` until app launch, then replace with download links.

### KeyTakeaway
```
<KeyTakeaway>
Important summary or takeaway text here.
</KeyTakeaway>
```

### Scenario
```
<Scenario title="Meet Sarah: 4 debts, $700/month">
Scenario content with markdown support.
</Scenario>
```

### BlogImage / PhoneFrame
```
<BlogImage src="/screenshots/feature.png" alt="Feature screenshot" caption="Optional caption" />
<PhoneFrame src="/screenshots/app-screen.png" alt="App screen" caption="Optional" />
```

## Content Structure
1. Opening hook (1-2 paragraphs, empathetic tone)
2. Main content with H2/H3 sections
3. Mid-article CTA (CTABox)
4. More content
5. Key takeaway or summary
6. Closing CTA paragraph linking to /#waitlist

## Internal Linking
- Link to calculators: `/en/calculator/snowball`, `/en/calculator/avalanche`
- Link to related blog posts: `/blog/{slug}`
- Link to homepage features: `/#features`, `/#pricing`

## Tone Guidelines
- Warm, friendly, emotionally supportive
- Acknowledge debt is stressful
- Use "you" language
- Celebrate progress, not perfection
- Avoid judgmental language about spending habits
