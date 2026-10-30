'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, inView } from '../../motion';
import ServiceSelect from '../../ui/ServiceSelect/page';
import { ContactData } from '../../types';

export default function Contact({ data }: { data: ContactData }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-x-hidden bg-[#0F1A2C] py-14 text-white sm:py-18 lg:py-20">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[#1E3E62]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="max-w-[700px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold tracking-[1.6px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.eyebrow}
          </p>
          <h2 className="mt-3.5 text-[28px] font-extrabold leading-tight text-white sm:text-[38px] lg:text-[42px]">
            {data.title}
          </h2>
          <p className="mt-3.5 text-[15px] leading-7 text-slate-300 sm:text-[16px]">
            {data.description}
          </p>
        </motion.div>

        {/* Form and Office Highlight */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5 }}
            className="rounded-[20px] border border-slate-800/80 bg-[#0A1128] p-6 shadow-xl sm:p-8"
          >
            <p className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[1.4px] text-[#E5B842]">
              <span className="h-[2px] w-5 bg-[#D4AF37]" />
              {data.form_eyebrow}
            </p>
            <h3 className="mt-2 text-[24px] font-extrabold text-white sm:text-[30px]">{data.form_title}</h3>
            <p className="mt-1 text-[14px] text-slate-400">{data.form_text}</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl border border-[#D4AF37]/40 bg-[#0F1A2C] p-6 text-center text-white shadow-xl"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#E5B842] text-[#0A1128]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="mt-4 text-[20px] font-bold text-white">Consultation Request Received!</h4>
                <p className="mt-2 text-[14px] leading-6 text-slate-300">
                  Thank you for reaching out to Nexora Technologies. A senior solutions architect will contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 inline-flex items-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] px-6 py-2 text-xs font-bold text-[#0A1128]"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    placeholder={data.placeholders.name}
                    className="h-12 rounded-xl border border-slate-700/80 bg-[#0F1A2C] px-4 text-[14px] text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={data.placeholders.email}
                    className="h-12 rounded-xl border border-slate-700/80 bg-[#0F1A2C] px-4 text-[14px] text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                  <input
                    required
                    name="phone"
                    inputMode="numeric"
                    placeholder={data.placeholders.phone}
                    onChange={(event) => { event.target.value = event.target.value.replace(/[^0-9+]/g, ''); }}
                    className="h-12 rounded-xl border border-slate-700/80 bg-[#0F1A2C] px-4 text-[14px] text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                  <div data-select-field className="min-w-0">
                    <ServiceSelect name="service" placeholder={data.placeholders.service} options={data.services} />
                  </div>
                </div>
                <textarea
                  required
                  name="message"
                  placeholder={data.placeholders.message}
                  className="mt-3.5 h-28 w-full rounded-xl border border-slate-700/80 bg-[#0F1A2C] px-4 py-3 text-[14px] text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5B842] text-[15px] font-bold text-[#0A1128] shadow-md shadow-[#D4AF37]/25 transition-all hover:from-[#E5B842] hover:to-[#D4AF37]"
                >
                  {data.submit}
                </motion.button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-slate-400">
                  <Shield size={13} className="text-[#E5B842]" />
                  {data.privacy}
                </p>
              </form>
            )}
          </motion.div>

          {/* Office Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#1E2D4A] bg-[#0A1128] text-white shadow-xl"
          >
            <motion.img
              src={data.office_image}
              alt={data.office_title}
              initial={{ scale: 1.04 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.7 }}
              className="h-[230px] w-full object-cover sm:h-[280px]"
            />
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[24px] font-extrabold text-white sm:text-[28px]">{data.office_title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-6 text-slate-300">{data.office_text}</p>
              </div>
              <div className="mt-6 flex flex-col gap-4 border-t border-slate-800/80 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3.5 text-[14px]">
                  <p className="flex gap-2.5">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                    <span>
                      <span className="font-bold text-white">{data.address_label}</span>
                      <br />
                      <span className="text-slate-300">{data.address}</span>
                    </span>
                  </p>
                  <p className="flex gap-2.5 whitespace-pre-line">
                    <Mail size={17} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                    <span>
                      <span className="font-bold text-white">{data.hours_label}</span>
                      <br />
                      <span className="text-slate-300">{data.hours}</span>
                    </span>
                  </p>
                </div>
                <a
                  href={data.phone_href}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-[#0F1A2C] px-4 py-2.5 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] text-[#0A1128]">
                    <Phone size={16} />
                  </span>
                  <span className="block text-[15px] font-bold">{data.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
