"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectsSectionData } from '../../types';
import { fadeUp, inView, stagger } from '../../motion';

const PAGE_SIZE = 6;

export default function Projects({ data, paginate = false }: { data: ProjectsSectionData; paginate?: boolean }) {
  const [page, setPage] = useState(1);
  const totalPages = paginate ? Math.ceil(data.items.length / PAGE_SIZE) : 1;
  const visible = paginate ? data.items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : data.items;

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#0A1128] py-14 text-white sm:py-18 lg:py-20">
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/3 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-80 w-80 rounded-full bg-[#1E3E62]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-[11px] font-bold tracking-[1.6px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.subtitle}
          </span>
          <h2 className="mt-3 text-[28px] font-extrabold text-white sm:text-[38px] lg:text-[42px]">
            {data.title_line1}{' '}
            <span className="bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
              {data.title_highlight}
            </span>
          </h2>
        </motion.div>

        <motion.div
          key={page}
          variants={stagger}
          initial="hidden"
          animate={paginate ? 'show' : undefined}
          whileInView={paginate ? undefined : 'show'}
          viewport={inView}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[20px] border border-slate-800/80 bg-[#0F1A2C] shadow-xl transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[220px]"
                />
                <div className="absolute top-3 right-3 rounded-full border border-[#D4AF37]/40 bg-[#0A1128]/90 px-3 py-1 text-[11px] font-semibold text-[#E5B842] backdrop-blur-sm">
                  {item.category}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-[#E5B842]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-slate-400">Enterprise Production Case Study</p>
                </div>
                <a
                  href={item.href}
                  onClick={(e) => handleProjectClick(e, item.href)}
                  aria-label={item.title}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5B842] text-[#0A1128] shadow-md shadow-[#D4AF37]/20 transition-transform duration-200 group-hover:scale-110"
                >
                  <ArrowRight size={18} strokeWidth={2.4} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-[#0F1A2C] text-white shadow-sm disabled:opacity-40 hover:border-[#D4AF37]"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-3 text-sm font-semibold text-slate-300">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-[#0F1A2C] text-white shadow-sm disabled:opacity-40 hover:border-[#D4AF37]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
