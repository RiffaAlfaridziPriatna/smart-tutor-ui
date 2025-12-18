'use client';

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export interface MathRendererProps {
  content: string;
  displayMode?: boolean;
  className?: string;
}

export default function MathRenderer({
  content,
  displayMode = false,
  className = '',
}: MathRendererProps) {
  const parts = content.split(/(\$[^$]+\$)/g);

  return (
    <div className={`math-content ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const mathContent = part.slice(1, -1);
          return displayMode ? (
            <BlockMath key={index} math={mathContent} />
          ) : (
            <InlineMath key={index} math={mathContent} />
          );
        } else if (part.trim()) {
          return <span key={index}>{part}</span>;
        }
        return null;
      })}
    </div>
  );
}

