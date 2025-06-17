"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CommonHeader from "../common/CommonHeader";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { teamMembers } from "@/data/teamMembersData";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "react-feather";
import { CountUp } from "countup.js";
import { useLocale, useTranslations } from "next-intl";
import { toArabicNumerals } from "@/helpers/ui/Arabic";

gsap.registerPlugin(ScrollTrigger);

const storyData = [
  {
    en: [
      /* ... unchanged story items ... */
    ],
    ar: [
      /* ... unchanged story items ... */
    ],
  },
];

const qualityData = {
  en: [
    /* ... unchanged quality items ... */
  ],
  ar: [
    /* ... unchanged quality items ... */
  ],
};

const AboutUs = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const rtl = locale === "ar";
  const t = useTranslations();
  const buttonRef = useRef(null);
  const countRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    /* ... unchanged stats array ... */
  ];

  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.fromTo(
      buttonRef.current,
      { x: rtl ? "100%" : "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          scrub: true,
          once: true,
        },
      }
    );

    ScrollTrigger.refresh();
  }, [rtl]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      countRefs.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            delay: index * 0.2,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
              onEnter: () => {
                const countUpEl = el.querySelector(".countup") as HTMLElement;
                if (countUpEl && !countUpEl.dataset.started) {
                  const end = parseFloat(countUpEl.dataset.end ?? "0");
                  const suffix = countUpEl.dataset.suffix || "";

                  const countUp = new CountUp(countUpEl, end, {
                    duration: 2,
                    suffix,
                    formattingFn: (n) => {
                      const formatted = `${Math.floor(n)}${suffix}`;
                      return rtl ? toArabicNumerals(formatted) : formatted;
                    },
                  });

                  if (!countUp.error) {
                    countUp.start();
                    countUpEl.dataset.started = "true";
                  }
                }
              },
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, [locale, rtl]);

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      const image = section.querySelector(".image");
      const content = section.querySelector(".content");
      if (!image || !content) return;

      const fromXImage = i % 2 === 0 ? (rtl ? 100 : -100) : rtl ? -100 : 100;
      const fromXContent = i % 2 === 0 ? (rtl ? -100 : 100) : rtl ? 100 : -100;

      gsap.fromTo(
        image,
        { x: fromXImage, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
            once: true,
          },
        }
      );

      gsap.fromTo(
        content,
        { x: fromXContent, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.3,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
            once: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [rtl]);

  return (
    <div className="min-h-screen bg-gray-50" dir={rtl ? "rtl" : "ltr"}>
      {/* Header */}
      <CommonHeader
        title={t("aboutus.title")}
        subtitle={t("aboutus.subtitle")}
        componentTitle={t("aboutus.componentTitle")}
      />

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <AppTitleHeader
            title={t("aboutus.story")}
            subtitle={t("aboutus.story1")}
          />
          {storyData[0][lang].map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionsRef.current[index] = el;
              }}
              className={`flex flex-col md:flex-row items-center gap-8 my-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 image opacity-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 content space-y-4 opacity-0">
                {item.paragraphs.map((text, pIndex) => (
                  <p key={pIndex} className="text-gray-600 text-lg">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section
        className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <AppTitleHeader
            title={t("aboutus.values")}
            subtitle={t("aboutus.values1")}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityData[lang].map(({ icon, label, description }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{label}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <AppTitleHeader
            title={t("aboutus.team")}
            subtitle={t("aboutus.team1")}
            secondarySubTitle={t("aboutus.team2")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
              >
                <Image
                  src={member.image}
                  alt={member.name[locale]}
                  width={800}
                  height={800}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name[locale]}
                  </h3>
                  <p className="text-gray-600">{member.role[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {t("aboutus.testimonials")}
          </h2>
          <blockquote className="text-xl text-gray-600 italic mb-4">
            &quot;{t("aboutus.quoto")}&quot;
          </blockquote>
          <p className="text-gray-800 font-semibold">-{t("aboutus.writer")}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ecbf4c] text-white py-16 mb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="p-1" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("aboutus.cta_title")}
            </h2>
            <p className="text-xl mb-8">{t("aboutus.cta_subtitle")}</p>
          </div>
          <div ref={buttonRef}>
            <Link
              href="/"
              className="inline-block bg-gray-50 text-brand font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              <span className="flex justify-center items-center">
                {t("aboutus.order_now")}
                <ArrowRight className="w-5 h-5 ms-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-full">
              <div className="py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {stats.map((stat, index) => {
                    const numberMatch =
                      stat.value.match(/^(\d+)([a-zA-Z+]+)?$/);
                    const number = numberMatch ? parseInt(numberMatch[1]) : 0;
                    const suffix = numberMatch?.[2] || "";
                    const display = stat.display || `${number}${suffix}`;
                    const label = rtl ? stat.labelAr : stat.labelEn;
                    const formatValue = rtl
                      ? toArabicNumerals(display)
                      : display;

                    return (
                      <div
                        key={index}
                        ref={(el) => {
                          countRefs.current[index] = el;
                        }}
                      >
                        <div
                          className={`countup text-5xl font-extrabold ${
                            stat.color || "text-slate-500"
                          }`}
                          data-end={number}
                          data-suffix={suffix}
                        >
                          {formatValue}
                        </div>
                        <div
                          className={`text-md font-normal mt-1 ${
                            stat.color || "text-gray-500"
                          }`}
                        >
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
