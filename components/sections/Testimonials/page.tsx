"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const reviews = data.reviews || [];
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  useEffect(() => {
    if (reviews.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (!review) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#0F1A2C] py-14 text-white sm:py-18 lg:py-20">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-5 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold tracking-[1.8px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.subtitle}
          </div>

          <h2 className="mt-3 text-[28px] font-extrabold leading-[1.2] sm:text-[38px] lg:text-[42px]">
            <span className="block text-white">{data.title_line1}</span>
            <span className="block bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
              {data.title_highlight}
            </span>
          </h2>

          <div className="relative mt-7 min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="max-w-[520px] text-[15px] leading-8 text-slate-300 sm:text-[16px]">
                  "{review.text}"
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="h-13 w-13 rounded-full border-2 border-[#D4AF37] object-cover shadow-md"
                    />
                    <div>
                      <p className="font-bold text-[16px] text-white">{review.author}</p>
                      <p className="text-[13px] text-[#E5B842]">{review.role}</p>
                    </div>
                  </div>
                  <span className="pr-2 text-[64px] font-serif leading-none text-[#D4AF37]/30 sm:text-[80px]">”</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex gap-2">
            {reviews.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-[#D4AF37]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[22px] border border-[#D4AF37]/30 bg-[#0F1A2C] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={review.image}
              src={review.image}
              alt={review.author}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
