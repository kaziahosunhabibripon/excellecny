"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { toArabicNumerals } from "@/helpers/ui/Arabic";
import { useLocale } from "next-intl";

const PopularCard = ({ data, isArabic = false }) => {
  const { title, titleAr, price, currency, currencyAr, image } = data;

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imageRef.current;
    const overlay = overlayRef.current;

    const onEnter = () => {
      gsap.to(img, {
        scale: 1.1,
        opacity: 0.7,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(overlay, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(overlay, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const locale = useLocale();
  return (
    <div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden transition-all duration-300"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Image */}
      <Image
        ref={imageRef}
        width={800}
        height={800}
        src={image}
        alt={isArabic ? titleAr : title}
        className="w-full h-64 object-cover transition-all duration-300 p-2"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 translate-y-8"
      >
        <div>
          <h3 className="text-lg font-bold mb-1">
            {locale === "ar" ? titleAr : title}
          </h3>

          <p className="text-xl font-semibold text-yellow-300">
            {locale === "ar" ? currencyAr : currency}
            {locale === "ar"
              ? `${toArabicNumerals(Math.round(Number(price)))}`
              : ` ${Math.round(Number(price))}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
