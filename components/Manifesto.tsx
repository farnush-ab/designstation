"use client";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = [
  { t: "دقت", i: false },
  { t: "است", i: true },
  { t: "کیفیت", i: false },
  { t: "پایدار", i: true },
  { t: "و", i: false },
  { t: "خدمت", i: true },
  { t: "بی‌دریغ.", i: false },
];

function Word({
  progress,
  from,
  to,
  text,
  italic,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  text: string;
  italic: boolean;
}) {
  const opacity = useTransform(progress, [from, to], [0.18, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block ${italic ? "italic-serif italic ml-3 mr-1 text-brass-500" : ""}`}
    >
      {text}{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="manifesto" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] container-x">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest2 text-ink-900/60">
          <span>۰۱ · manifesto</span>
          <span className="h-px flex-1 bg-line" />
          <span className="serif italic normal-case text-sm text-ink-900/60">
            our promise
          </span>
        </div>

        <p className="mt-10 display text-[9vw] leading-[1.05] text-ink-900 sm:text-[6vw] lg:text-[4.4vw]">
          {words.map((w, k) => {
            const start = Math.max(0, k / words.length - 0.05);
            const end = Math.min(1, (k + 1) / words.length + 0.05);
            return (
              <Word
                key={k}
                progress={scrollYProgress}
                from={start}
                to={end}
                text={w.t}
                italic={w.i}
              />
            );
          })}
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {[
            { n: "۰۱", t: "اصالت", d: "همه قطعات مستقیم از تولیدکننده‌های مورد تأیید جهانی." },
            { n: "۰۲", t: "دقت", d: "با تلورانس‌های صنعتی، سازگاری کامل با چرخ‌های استاندارد." },
            { n: "۰۳", t: "خدمت", d: "تیم فنی همراه، آموزش، و پشتیبانی بلندمدت." },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-line pt-5"
            >
              <div className="flex items-baseline justify-between">
                <span className="serif italic text-xl text-brass-500">— {b.n}</span>
                <span className="kicker">principle</span>
              </div>
              <h3 className="serif mt-3 text-3xl text-ink-900 sm:text-4xl">{b.t}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-900/70">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
