"use client";

import { Mail, MapPin, CalendarDays } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export default function ContactBand() {
  return (
    <section id="contact" className="bg-walnut-800 py-28 text-cream-100 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <p className="kicker mb-6 text-cream-100/70">GET IN TOUCH</p>
          <h2 className="display-fa text-balance text-3xl text-cream-100 md:text-5xl">
            در ارتباط باشیم.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.95] text-cream-100/80 md:text-lg">
            برای مشاوره، بازدید از شوروم یا دریافت کاتالوگ برندها،
            از طریق یکی از راه‌های زیر با تیم ما در تماس باشید.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-cream-100/15 pt-14 md:grid-cols-3 md:gap-10">
          <Reveal delay={0.05}>
            <Item
              icon={<Mail size={18} />}
              label="EMAIL"
              value="s.nahvi@designstation.net"
              href="mailto:s.nahvi@designstation.net"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Item
              icon={<CalendarDays size={18} />}
              label="BOOK A VISIT"
              value="رزرو بازدید شوروم"
              href="#"
            />
          </Reveal>
          <Reveal delay={0.25}>
            <Item
              icon={<MapPin size={18} />}
              label="VISIT US"
              value="پالادیوم، تهران"
              href="#"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start justify-between gap-6 border-b border-cream-100/15 pb-6 transition hover:border-cream-100"
    >
      <div className="space-y-3">
        <p className="kicker text-cream-100/60">{label}</p>
        <p className="display-fa text-lg text-cream-100 md:text-xl">{value}</p>
      </div>
      <span className="mt-1 text-cream-100/60 transition group-hover:text-cream-100">
        {icon}
      </span>
    </a>
  );
}
