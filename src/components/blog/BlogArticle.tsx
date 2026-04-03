'use client';

interface BlogArticleProps {
  content: string;
}

export function BlogArticle({ content }: BlogArticleProps) {
  // Simple MDX-to-JSX rendering using a basic parser
  // This handles standard markdown + our custom components
  return (
    <div className="prose max-w-none">
      <MarkdownRenderer content={content} />
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{processInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} id={slugify(line.slice(3))}>{processInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++}>{processInline(line.slice(2))}</h1>);
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<hr key={key++} />);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++}>
          <p>{processInline(quoteLines.join(' '))}</p>
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++}>
          {listItems.map((item, j) => (
            <li key={j}>{processInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++}>
          {listItems.map((item, j) => (
            <li key={j}>{processInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // JSX components (Callout, KeyTakeaway, etc.) — render as styled divs
    if (line.trim().startsWith('<Callout')) {
      const typeMatch = line.match(/type="(\w+)"/);
      const type = typeMatch ? typeMatch[1] : 'tip';
      const contentLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('</Callout>')) {
        contentLines.push(lines[i]);
        i++;
      }
      i++; // skip closing tag
      const bgClass = type === 'tip' ? 'bg-primary/5 border-primary' : type === 'warning' ? 'bg-accent/10 border-amber-500' : 'bg-secondary/10 border-secondary';
      elements.push(
        <div key={key++} className={`${bgClass} border-l-4 rounded-xl p-5 my-6`}>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-0">
            {processInline(contentLines.join(' ').trim())}
          </p>
        </div>
      );
      continue;
    }

    if (line.trim().startsWith('<KeyTakeaway')) {
      const contentLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('</KeyTakeaway>')) {
        contentLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <div key={key++} className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-6 my-8">
          <h4 className="font-bold text-lg mb-2">Key Takeaway</h4>
          <p className="text-white/90 leading-relaxed mb-0">{processInline(contentLines.join(' ').trim())}</p>
        </div>
      );
      continue;
    }

    // Skip unknown JSX tags
    if (line.trim().startsWith('<') && !line.trim().startsWith('</')) {
      // Skip to closing tag or just skip the line
      i++;
      continue;
    }
    if (line.trim().startsWith('</')) {
      i++;
      continue;
    }

    // Regular paragraph — collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('* ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].trim().startsWith('<') &&
      !/^\d+\.\s/.test(lines[i]) &&
      lines[i].trim() !== '---'
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(<p key={key++}>{processInline(paraLines.join(' '))}</p>);
    }
  }

  return <>{elements}</>;
}

function processInline(text: string): React.ReactNode {
  // Process bold, italic, links, and code
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    // Link
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);
    // Code
    const codeMatch = remaining.match(/`(.+?)`/);

    // Find the earliest match
    const matches = [
      boldMatch && { type: 'bold', match: boldMatch, index: boldMatch.index! },
      italicMatch && { type: 'italic', match: italicMatch, index: italicMatch.index! },
      linkMatch && { type: 'link', match: linkMatch, index: linkMatch.index! },
      codeMatch && { type: 'code', match: codeMatch, index: codeMatch.index! },
    ].filter(Boolean) as { type: string; match: RegExpMatchArray; index: number }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const earliest = matches.reduce((a, b) => (a.index < b.index ? a : b));

    // Add text before the match
    if (earliest.index > 0) {
      parts.push(remaining.slice(0, earliest.index));
    }

    if (earliest.type === 'bold') {
      parts.push(<strong key={partKey++}>{earliest.match[1]}</strong>);
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    } else if (earliest.type === 'italic') {
      parts.push(<em key={partKey++}>{earliest.match[1]}</em>);
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    } else if (earliest.type === 'link') {
      parts.push(
        <a key={partKey++} href={earliest.match[2]} className="text-primary underline">
          {earliest.match[1]}
        </a>
      );
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    } else if (earliest.type === 'code') {
      parts.push(
        <code key={partKey++} className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-sm">
          {earliest.match[1]}
        </code>
      );
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    }
  }

  return <>{parts}</>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
