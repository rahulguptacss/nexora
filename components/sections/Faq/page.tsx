'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { fadeUp, inView } from '../../motion';
import { FaqData } from '../../types';

export default function Faq({ data }: { data: FaqData }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#0A1128] py-14 text-white sm:py-18 lg:py-20">
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 h-80 w-80 rounded-full bg-[#1E3E62]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-[11px] font-bold tracking-[1.4px] text-[#E5B842] sm:text-[12px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {data.badge}
            </span>
            <h2 className="mt-3.5 max-w-[440px] text-[28px] font-extrabold leading-[1.15] text-white sm:text-[38px] lg:text-[42px]">
              {data.title}{' '}
              <span className="bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
                {data.title_highlight}
              </span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-slate-300 sm:text-[16px]">
              {data.description}
            </p>
            <ul className="mt-6 space-y-3.5">
              {data.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-slate-200">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] text-[#0A1128]">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-3.5">
            {data.items.map((item, index) => {
              const isOpen = open === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ delay: index * 0.05 }}
                  className={`overflow-hidden rounded-[16px] border transition-all duration-200 ${
                    isOpen ? 'border-[#D4AF37]/60 bg-[#0F1A2C] shadow-xl' : 'border-slate-800/80 bg-[#0F1A2C] shadow-md hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15.5px] font-bold transition-colors sm:text-[16.5px] bg-[#0F1A2C] text-white hover:text-[#E5B842]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-[#0A1128]/70"
                      >
                        <div className="border-t border-slate-800/80 px-5 py-4 text-[14.5px] leading-7 text-slate-300">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
