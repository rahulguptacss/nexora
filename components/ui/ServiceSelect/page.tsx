'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

export default function ServiceSelect({
  name,
  placeholder,
  options,
  tone = 'dark',
}: {
  name: string;
  placeholder: string;
  options: string[];
  tone?: 'light' | 'dark' | 'onPurple';
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [box, setBox] = useState({ top: 0, left: 0, width: 0 });
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);

  const place = () => {
    const node = root.current;
    const field = node?.closest('[data-select-field]') ?? node;
    const rect = field?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.max(rect.width, 220);
    const left = Math.min(rect.left, window.innerWidth - width - 12);
    setBox({ top: rect.bottom + 6, left: Math.max(8, left), width });
  };

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (root.current?.contains(target) || menu.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={root} className="relative min-w-0">
      <input type="text" name={name} value={value} required readOnly tabIndex={-1} className="pointer-events-none absolute h-0 w-0 opacity-0" />
      <button
        type="button"
        onClick={() => {
          place();
          setOpen((current) => !current);
        }}
        className={`flex h-12 w-full items-center justify-between gap-2 text-left text-[14px] outline-none transition-all ${
          tone === 'dark'
            ? 'rounded-xl border border-slate-700 bg-[#0F1A2C] px-4 text-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
            : tone === 'light'
            ? 'rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-[#0A1128] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20'
            : 'min-w-0 bg-transparent text-[#0A1128]'
        }`}
      >
        <span className={value ? (tone === 'dark' ? 'text-white font-medium' : 'text-[#0A1128] font-medium') : 'text-slate-400'}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-[#D4AF37]' : ''}`} />
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <ul
          ref={menu}
          style={{ top: box.top, left: box.left, width: box.width }}
          className={`fixed z-[300] max-h-56 overflow-auto rounded-xl py-1.5 shadow-2xl ${
            tone === 'dark'
              ? 'border border-slate-700 bg-[#0F1A2C] text-white shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
              : 'border border-slate-200 bg-white shadow-[0_16px_36px_rgba(10,17,40,0.14)]'
          }`}
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  setValue(option);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-4 py-2.5 text-left text-[14px] transition-colors ${
                  value === option
                    ? (tone === 'dark' ? 'bg-[#D4AF37]/20 font-bold text-[#E5B842]' : 'bg-[#D4AF37]/15 font-bold text-[#0A1128]')
                    : (tone === 'dark' ? 'text-slate-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#D4AF37]')
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}
