"use client";

import { motion } from 'framer-motion';
import { TopbarData } from '../../types';

function Icon({ name }: { name: string }) {
  const p = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true as const };
  if (name === 'Mail') {
    return (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </svg>
    );
  }
  if (name === 'Phone') {
    return (
      <svg {...p}>
        <path d="M6.5 3.5h3l1.5 4-2 1.2a12 12 0 0 0 6.3 6.3l1.2-2 4 1.5v3A2 2 0 0 1 18.5 19 15 15 0 0 1 5 5.5a2 2 0 0 1 1.5-2z" />
      </svg>
    );
  }
  if (name === 'MapPin') {
    return (
      <svg {...p}>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    );
  }
  const filled = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const };
  if (name === 'Linkedin') {
    return (
      <svg {...filled}>
        <path d="M6.5 9H3.7v11.2h2.8V9zM5.1 3.8A1.7 1.7 0 1 0 5.1 7a1.7 1.7 0 0 0 0-3.2zM20.3 13.4c0-3.2-1.7-4.7-4-4.7a3.4 3.4 0 0 0-3.1 1.7h-.1V9H10.4c0 1.8 0 11.2 0 11.2h2.8v-6.3c0-.3 0-.7.1-1 .3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.7v6H20.3v-6.8z" />
      </svg>
    );
  }
  if (name === 'Instagram') {
    return (
      <svg {...filled}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.6a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
      </svg>
    );
  }
  if (name === 'Youtube') {
    return (
      <svg {...filled}>
        <path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  return (
    <svg {...filled}>
      <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13V9a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export default function Topbar({ data }: { data: TopbarData }) {
  const hrefFor = (icon: string, value: string) => {
    if (icon === 'Mail') return `mailto:${value}`;
    if (icon === 'Phone') return `tel:${value.replace(/[^0-9+]/g, '')}`;
    return undefined;
  };

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="hidden w-full border-b border-[#1E2D4A] bg-[#0A1128] text-slate-200 sm:block"
    >
      <div className="mx-auto flex h-[44px] max-w-[1240px] items-center justify-between gap-2 px-4 sm:h-[46px] sm:px-5">
        <div className="flex min-w-0 flex-1 items-center text-[12px] font-medium sm:text-[13px]">
          {data.contact_info.map((item, index) => {
            const href = hrefFor(item.icon, item.value);
            const inner = (
              <span className="inline-flex min-w-0 items-center gap-1.5 transition-colors hover:text-[#D4AF37] sm:gap-2">
                <span className="text-[#D4AF37]">
                  <Icon name={item.icon} />
                </span>
                <span className="truncate">{item.value}</span>
              </span>
            );
            return (
              <motion.span
                key={item.icon}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.35 }}
                className="inline-flex items-center"
              >
                {index > 0 ? <span className="mx-3.5 hidden text-slate-600 sm:inline">|</span> : null}
                {href ? (
                  <a href={href} className={index === 0 ? 'inline-flex' : 'hidden sm:inline-flex'}>
                    {inner}
                  </a>
                ) : (
                  <span className={index === 0 ? 'inline-flex' : 'hidden md:inline-flex'}>{inner}</span>
                )}
              </motion.span>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {data.socials.map((social) => (
            <motion.a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.icon}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -2, scale: 1.08 }}
              transition={{ delay: 0.25 + data.socials.indexOf(social) * 0.06, duration: 0.3 }}
              className="grid h-7 w-7 place-items-center rounded-[6px] border border-slate-700 bg-[#0F1A2C] text-slate-300 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <Icon name={social.icon} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
