import Image from 'next/image';
import { Lightbulb, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import DownloadButtons from '@/components/landing/DownloadButtons';

function Callout({ type = 'tip', children }: { type?: 'tip' | 'warning' | 'info'; children: React.ReactNode }) {
  const styles = {
    tip: { bg: 'bg-primary/5', border: 'border-l-4 border-primary', icon: <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" /> },
    warning: { bg: 'bg-accent/10', border: 'border-l-4 border-accent', icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" /> },
    info: { bg: 'bg-secondary/10', border: 'border-l-4 border-secondary', icon: <Info className="w-5 h-5 text-secondary flex-shrink-0" /> },
  };

  const s = styles[type];
  return (
    <div className={`${s.bg} ${s.border} rounded-xl p-5 my-6 flex gap-3`}>
      <div className="mt-0.5">{s.icon}</div>
      <div className="text-gray-700 text-[15px] leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-primary/5 rounded-xl p-5">
        <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Advantages
        </h4>
        <ul className="space-y-2">
          {pros.map((p, i) => (
            <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-primary mt-1">+</span> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-secondary/5 rounded-xl p-5">
        <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Considerations
        </h4>
        <ul className="space-y-2">
          {cons.map((c, i) => (
            <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-secondary mt-1">-</span> {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-bold text-primary">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 border-t border-gray-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-6 my-8">
      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" /> Key Takeaway
      </h4>
      <div className="text-white/90 leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

function CTABox({ title, description }: { title: string; description: string; buttonText?: string; href?: string }) {
  return (
    <div className="bg-background rounded-2xl border-2 border-primary/10 p-8 my-8 text-center">
      <h4 className="font-extrabold text-xl text-primary mb-2">{title}</h4>
      <p className="text-gray-600 mb-5">{description}</p>
      <DownloadButtons />
    </div>
  );
}

function StepByStep({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="my-8 space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
            {i + 1}
          </div>
          <div>
            <h4 className="font-bold text-lg">{step.title}</h4>
            <p className="text-gray-600 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  ProsCons,
  ComparisonTable,
  KeyTakeaway,
  CTABox,
  StepByStep,
  BlogImage,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl md:text-4xl font-extrabold mt-10 mb-4 text-gray-900" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-20" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-gray-700 leading-relaxed mb-5" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-700" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-700" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-secondary pl-5 italic text-gray-600 my-6" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-gray-900" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
  hr: () => <hr className="border-t-2 border-gray-100 my-10" />,
};
