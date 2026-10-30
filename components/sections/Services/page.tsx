"use client";

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Cloud, Code2, Cpu, Settings, ShieldCheck, Smartphone } from 'lucide-react';
import { ServicesSectionData } from '../../types';
import { fadeUp, inView, stagger } from '../../motion';

const icons: Record<string, ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  code: Code2,
  smartphone: Smartphone,
  cloud: Cloud,
  gear: Settings,
  chart: Cpu,
  shield: ShieldCheck,
};

export default function Services({ data }: { data: ServicesSectionData }) {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0A1128] py-14 text-white sm:py-18 lg:py-20">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-[#1E3E62]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-[11px] font-bold tracking-[2px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.subtitle}
          </span>
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight tracking-tight sm:text-[36px] lg:text-[42px]">
            {data.title_line1}{' '}
            <span className="bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
              {data.title_highlight}
            </span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[640px] text-[15px] leading-7 text-slate-300 sm:text-[16px]">
            {data.description}
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={inView} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => {
            const Icon = icons[item.icon] || Code2;
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-[20px] border border-slate-800/80 bg-[#0F1A2C] p-6 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
              >
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0A1128] shadow-lg shadow-[#D4AF37]/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-[19px] font-bold text-white transition-colors group-hover:text-[#E5B842]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#D4AF37] transition-all group-hover:text-[#F3C766] group-hover:gap-2.5"
                  >
                    <span>Inquire Solution</span>
                    <span aria-hidden>→</span>
                  </a>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37]" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
