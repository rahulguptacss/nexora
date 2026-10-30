"use client";

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, ShieldCheck, Zap } from 'lucide-react';
import { WhyChooseSectionData } from '../../types';
import { fadeUp, inView, stagger } from '../../motion';

const itemIcons: Record<string, ReactNode> = {
  users: <Award size={24} className="text-[#0A1128]" />,
  bulb: <Zap size={24} className="text-[#0A1128]" />,
  support: <Clock size={24} className="text-[#0A1128]" />,
};

export default function WhyChoose({ data }: { data: WhyChooseSectionData }) {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#0F1A2C] py-14 text-white sm:py-18 lg:py-20">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-[#1E3E62]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-[11px] font-bold tracking-[1.6px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.subtitle}
          </span>
          <h2 className="mx-auto mt-3 max-w-[760px] text-[28px] font-extrabold leading-[1.2] text-white sm:text-[38px] lg:text-[42px]">
            <span>{data.title_line1} </span>
            <span className="bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
              {data.title_highlight}
            </span>
          </h2>
          <span className="mx-auto mt-3 flex h-[3px] w-20 overflow-hidden rounded-full">
            <span className="h-full w-1/2 bg-[#D4AF37]" />
            <span className="h-full w-1/2 bg-slate-700" />
          </span>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={inView} className="space-y-4">
            {data.items.map((item) => {
              const iconNode = itemIcons[item.icon] || <ShieldCheck size={24} className="text-[#0A1128]" />;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-4 rounded-[16px] border border-slate-800/80 bg-[#0A1128] p-5 shadow-lg transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[#D4AF37]/10"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#E5B842] to-[#D4AF37] shadow-sm">
                    {iconNode}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-6 text-slate-300">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[20px] border border-slate-700/80 bg-[#0A1128] p-2.5 shadow-2xl sm:rounded-[24px]">
              <img
                src={data.image}
                alt={data.title_highlight}
                className="h-[280px] w-full rounded-[16px] object-cover sm:h-[380px] sm:rounded-[20px]"
              />
            </div>
            {/* Floating Quality Badge */}
            <div className="absolute -bottom-4 -right-2 rounded-2xl border border-[#D4AF37]/40 bg-[#0A1128] px-5 py-3 text-white shadow-xl sm:-bottom-5 sm:right-6">
              <p className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase">Guaranteed</p>
              <p className="text-[15px] font-bold text-white">99.99% Enterprise Uptime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
