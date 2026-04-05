'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, Smartphone } from 'lucide-react';

interface BlogArticleProps {
  content: string;
}

export function BlogArticle({ content }: BlogArticleProps) {
  return (
    <div className="prose max-w-none">
      <MarkdownRenderer content={content} />
    </div>
  );
}

// ─── Attribute Parsing ──────────────────────────────────────────────

function parseAttributes(tagLine: string): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};

  // Match attr="value" (string attributes)
  const strRegex = /(\w+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = strRegex.exec(tagLine)) !== null) {
    attrs[m[1]] = m[2];
  }

  // Match attr={jsonValue} (JSON attributes: arrays, objects, numbers, booleans)
  // Uses brace-depth counting to handle nested objects/arrays
  const attrNameRegex = /(\w+)=\{/g;
  while ((m = attrNameRegex.exec(tagLine)) !== null) {
    const name = m[1];
    const start = m.index + m[0].length;
    let depth = 1;
    let j = start;
    // Track whether we're inside a string to avoid counting braces in string values
    let inString = false;
    let escaped = false;
    while (j < tagLine.length && depth > 0) {
      const ch = tagLine[j];
      if (escaped) { escaped = false; j++; continue; }
      if (ch === '\\') { escaped = true; j++; continue; }
      if (ch === '"') { inString = !inString; j++; continue; }
      if (!inString) {
        if (ch === '{' || ch === '[') depth++;
        else if (ch === '}' || ch === ']') depth--;
      }
      j++;
    }
    const raw = tagLine.slice(start, j - 1);
    try {
      // Convert JS object syntax to valid JSON: add quotes around bare keys
      const jsonStr = raw.replace(/(\{|,)\s*(\w+)\s*:/g, '$1 "$2":');
      attrs[name] = JSON.parse(jsonStr);
    } catch {
      attrs[name] = raw;
    }
  }

  return attrs;
}

/**
 * Extract inline content when open + close tag are on the same line.
 * Returns the content string if found, otherwise null.
 */
function extractInlineContent(tag: string, line: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>(.+?)</${tag}>`);
  const match = line.match(regex);
  return match ? match[1] : null;
}

function collectUntilClose(tag: string, lines: string[], startIndex: number): { content: string[]; endIndex: number } {
  const contentLines: string[] = [];
  let i = startIndex;
  while (i < lines.length && !lines[i].trim().startsWith(`</${tag}>`)) {
    contentLines.push(lines[i]);
    i++;
  }
  return { content: contentLines, endIndex: i + 1 }; // skip closing tag
}

// ─── Component Renderers ────────────────────────────────────────────

function renderCallout(line: string, lines: string[], i: number, key: number): { element: React.ReactNode; newIndex: number } {
  const attrs = parseAttributes(line);
  const type = (attrs.type as string) || 'tip';

  // Check if open + close are on the same line
  const inline = extractInlineContent('Callout', line);
  const text = inline ?? (() => {
    const { content } = collectUntilClose('Callout', lines, i + 1);
    return content.join(' ').trim();
  })();
  const endIndex = inline ? i + 1 : collectUntilClose('Callout', lines, i + 1).endIndex;

  const styles: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
    tip: { bg: 'bg-primary/5', border: 'border-primary', icon: <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" /> },
    warning: { bg: 'bg-accent/10', border: 'border-amber-500', icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" /> },
    info: { bg: 'bg-secondary/10', border: 'border-secondary', icon: <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0" /> },
  };
  const s = styles[type] || styles.tip;

  return {
    element: (
      <div key={key} className={`${s.bg} ${s.border} border-l-4 rounded-xl p-5 my-6 flex gap-3`}>
        <div className="mt-0.5">{s.icon}</div>
        <div className="text-gray-700 text-[15px] leading-relaxed [&>p]:mb-0">
          {processInline(text)}
        </div>
      </div>
    ),
    newIndex: endIndex,
  };
}

function renderKeyTakeaway(lines: string[], i: number, key: number): { element: React.ReactNode; newIndex: number } {
  // Check if open + close are on the same line
  const inline = extractInlineContent('KeyTakeaway', lines[i]);
  const text = inline ?? (() => {
    const { content, endIndex: _end } = collectUntilClose('KeyTakeaway', lines, i + 1);
    return content.join(' ').trim();
  })();
  const endIndex = inline ? i + 1 : collectUntilClose('KeyTakeaway', lines, i + 1).endIndex;

  return {
    element: (
      <div key={key} className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-6 my-8">
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Key Takeaway
        </h4>
        <p className="text-white/90 leading-relaxed mb-0">{processInline(text)}</p>
      </div>
    ),
    newIndex: endIndex,
  };
}

function renderProsCons(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const pros = (attrs.pros as string[]) || [];
  const cons = (attrs.cons as string[]) || [];

  return {
    element: (
      <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-primary/5 rounded-xl p-5">
          <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Advantages
          </h4>
          <ul className="space-y-2">
            {pros.map((p: string, j: number) => (
              <li key={j} className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-primary mt-1 font-bold">+</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary/5 rounded-xl p-5">
          <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Considerations
          </h4>
          <ul className="space-y-2">
            {cons.map((c: string, j: number) => (
              <li key={j} className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-secondary mt-1 font-bold">-</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  };
}

function renderComparisonTable(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const headers = (attrs.headers as string[]) || [];
  const rows = (attrs.rows as string[][]) || [];

  return {
    element: (
      <div key={key} className="overflow-x-auto my-6 rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary/5">
              {headers.map((h: string, j: number) => (
                <th key={j} className="px-4 py-3 text-left font-bold text-primary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: string[], j: number) => (
              <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                {row.map((cell: string, k: number) => (
                  <td key={k} className="px-4 py-3 border-t border-gray-100">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  };
}

function renderStepByStep(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const steps = (attrs.steps as { title: string; description: string }[]) || [];

  return {
    element: (
      <div key={key} className="my-8 space-y-4">
        {steps.map((step, j) => (
          <div key={j} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
              {j + 1}
            </div>
            <div>
              <h4 className="font-bold text-lg">{step.title}</h4>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };
}

function renderCTABox(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const title = (attrs.title as string) || '';
  const description = (attrs.description as string) || '';
  const buttonText = (attrs.buttonText as string) || 'Learn more';
  const href = (attrs.href as string) || '/';

  return {
    element: (
      <div key={key} className="bg-background rounded-2xl border-2 border-primary/10 p-8 my-8 text-center">
        <h4 className="font-extrabold text-xl text-primary mb-2">{title}</h4>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-3 font-bold hover:bg-primary/90 transition no-underline"
        >
          {buttonText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  };
}

function renderBlogImage(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const src = (attrs.src as string) || '';
  const alt = (attrs.alt as string) || '';
  const caption = attrs.caption as string | undefined;

  return {
    element: (
      <figure key={key} className="my-8">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{caption}</figcaption>
        )}
      </figure>
    ),
  };
}

function renderScenario(line: string, lines: string[], i: number, key: number): { element: React.ReactNode; newIndex: number } {
  const attrs = parseAttributes(line);
  const title = (attrs.title as string) || 'Example Scenario';
  const { content, endIndex } = collectUntilClose('Scenario', lines, i + 1);

  return {
    element: (
      <div key={key} className="bg-accent/8 border border-accent/20 rounded-2xl p-6 my-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-0">{title}</h4>
        </div>
        <div className="text-gray-700 leading-relaxed [&>p]:mb-3 [&>ul]:mb-3 [&>ul]:list-disc [&>ul]:pl-5">
          <MarkdownRenderer content={content.join('\n')} />
        </div>
      </div>
    ),
    newIndex: endIndex,
  };
}

function renderPhoneFrame(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const src = (attrs.src as string) || '';
  const alt = (attrs.alt as string) || '';
  const caption = attrs.caption as string | undefined;

  return {
    element: (
      <figure key={key} className="my-8 flex flex-col items-center">
        <div className="relative w-[280px] rounded-[2.5rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-2xl z-10" />
          <div className="relative w-full aspect-[9/19.5] bg-white overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover object-top" />
          </div>
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-gray-500 mt-4 italic">{caption}</figcaption>
        )}
      </figure>
    ),
  };
}

function renderStatHighlight(line: string, key: number): { element: React.ReactNode } {
  const attrs = parseAttributes(line);
  const value = (attrs.value as string) || '';
  const label = (attrs.label as string) || '';
  const description = attrs.description as string | undefined;

  return {
    element: (
      <div key={key} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 my-8 text-center">
        <div className="text-5xl md:text-6xl font-extrabold text-primary mb-2">{value}</div>
        <div className="text-lg font-bold text-gray-900 mb-1">{label}</div>
        {description && <p className="text-gray-500 text-sm max-w-md mx-auto">{description}</p>}
      </div>
    ),
  };
}

function renderPhoneGallery(line: string, lines: string[], i: number, key: number): { element: React.ReactNode; newIndex: number } {
  const { content, endIndex } = collectUntilClose('PhoneGallery', lines, i + 1);

  // Parse PhoneFrame tags from content
  const frames: { src: string; alt: string; caption?: string }[] = [];
  for (const cl of content) {
    if (cl.trim().startsWith('<PhoneFrame')) {
      const attrs = parseAttributes(cl);
      frames.push({
        src: (attrs.src as string) || '',
        alt: (attrs.alt as string) || '',
        caption: attrs.caption as string | undefined,
      });
    }
  }

  return {
    element: (
      <div key={key} className="my-10 overflow-x-auto">
        <div className="flex gap-6 justify-center flex-wrap lg:flex-nowrap">
          {frames.map((frame, j) => (
            <figure key={j} className="flex flex-col items-center flex-shrink-0">
              <div className="relative w-[220px] md:w-[240px] rounded-[2rem] border-[6px] border-gray-900 bg-gray-900 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-b-xl z-10" />
                <div className="relative w-full aspect-[9/19.5] bg-white overflow-hidden">
                  <Image src={frame.src} alt={frame.alt} fill className="object-cover object-top" />
                </div>
              </div>
              {frame.caption && (
                <figcaption className="text-center text-xs text-gray-500 mt-3 max-w-[220px]">{frame.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    ),
    newIndex: endIndex,
  };
}

// ─── Main Renderer ──────────────────────────────────────────────────

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
    if (line.startsWith('#### ')) {
      elements.push(<h4 key={key++} className="text-lg font-bold mt-6 mb-2 text-gray-900">{processInline(line.slice(5))}</h4>);
      i++;
      continue;
    }
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

    // Markdown image: ![alt](src) or ![alt](src "caption")
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)"]+)(?:\s+"([^"]*)")?\)$/);
    if (imgMatch) {
      const [, alt, src, caption] = imgMatch;
      elements.push(
        <figure key={key++} className="my-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
            <Image src={src} alt={alt} fill className="object-cover" />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{caption}</figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Markdown table: | header | header |
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string) =>
          row.split('|').slice(1, -1).map((cell) => cell.trim());

        const headers = parseRow(tableLines[0]);
        // Skip separator row (index 1)
        const bodyRows = tableLines.slice(2).map(parseRow);

        elements.push(
          <div key={key++} className="overflow-x-auto my-6 rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/5">
                  {headers.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left font-bold text-primary">{processInline(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 border-t border-gray-100">{processInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
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

    // JSX Components
    const tagMatch = line.trim().match(/^<(\w+)/);
    if (tagMatch) {
      const tagName = tagMatch[1];

      // Self-closing components (no content between tags)
      const isSelfClosing = line.trim().endsWith('/>');

      switch (tagName) {
        case 'Callout': {
          const result = renderCallout(line, lines, i, key++);
          elements.push(result.element);
          i = result.newIndex;
          continue;
        }
        case 'KeyTakeaway': {
          const result = renderKeyTakeaway(lines, i, key++);
          elements.push(result.element);
          i = result.newIndex;
          continue;
        }
        case 'Scenario': {
          const result = renderScenario(line, lines, i, key++);
          elements.push(result.element);
          i = result.newIndex;
          continue;
        }
        case 'PhoneGallery': {
          const result = renderPhoneGallery(line, lines, i, key++);
          elements.push(result.element);
          i = result.newIndex;
          continue;
        }
        case 'ProsCons': {
          const result = renderProsCons(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        case 'ComparisonTable': {
          const result = renderComparisonTable(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        case 'StepByStep': {
          // StepByStep may span multiple lines if the JSON is long
          if (isSelfClosing) {
            const result = renderStepByStep(line, key++);
            elements.push(result.element);
            i++;
          } else {
            // Collect all lines until closing tag for multi-line attribute
            const collected: string[] = [line];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('</StepByStep>') && !lines[i].trim().endsWith('/>')) {
              collected.push(lines[i]);
              i++;
            }
            if (i < lines.length) {
              collected.push(lines[i]);
              i++;
            }
            const result = renderStepByStep(collected.join(' '), key++);
            elements.push(result.element);
          }
          continue;
        }
        case 'CTABox': {
          const result = renderCTABox(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        case 'BlogImage': {
          const result = renderBlogImage(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        case 'PhoneFrame': {
          if (isSelfClosing) {
            const result = renderPhoneFrame(line, key++);
            elements.push(result.element);
            i++;
            continue;
          }
          // Non-self-closing, skip content
          const result = renderPhoneFrame(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        case 'StatHighlight': {
          const result = renderStatHighlight(line, key++);
          elements.push(result.element);
          i++;
          continue;
        }
        default: {
          // Skip unknown tags
          if (line.trim().startsWith('</')) {
            i++;
            continue;
          }
          i++;
          continue;
        }
      }
    }

    // Closing tags (standalone)
    if (line.trim().startsWith('</')) {
      i++;
      continue;
    }

    // Regular paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('* ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].trim().startsWith('<') &&
      !lines[i].trim().startsWith('|') &&
      !/^\d+\.\s/.test(lines[i]) &&
      lines[i].trim() !== '---' &&
      !/^!\[/.test(lines[i].trim())
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

// ─── Inline Processing ──────────────────────────────────────────────

function processInline(text: string): React.ReactNode {
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
