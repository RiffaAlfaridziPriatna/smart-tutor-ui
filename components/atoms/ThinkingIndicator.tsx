'use client';

import { useEffect, useState } from 'react';

export default function ThinkingIndicator() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <span>Thinking{'.'.repeat(dots)}</span>;
}

