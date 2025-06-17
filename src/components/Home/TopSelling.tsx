"use client";

import { useState } from "react";
import { categories } from "../../data/ProductData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { toArabicNumerals } from "@/helpers/ui/Arabic";

export default function TopSelling() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredCategories = activeFilter
    ? categories.filter((cat) => cat.categoryType.includes(activeFilter))
    : categories;

  const filterOptions = ["Bangladeshi", "Indian", "Arabian", "Pakistani"];

  const translatedFilter = [
    t("filterOptions.cat1"),
    t("filterOptions.cat2"),
    t("filterOptions.cat3"),
    t("filterOptions.cat4"),
  ];

  return (
    <div
      className="w-full py-12 px-4 md:px-6 container mx-auto"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <AppTitleHeader
        title={t("Topselling.title")}
        subtitle={t("Topselling.subtitle")}
        secondarySubTitle={t("Topselling.secondarySubTitle")}
      />

      {/* Filter */}
      <div className="flex items-center justify-between border-b border-[#ecbf4c] mb-8">
        <h1 className="text-3xl font-bold text-gray-600 mb-2">
          {t("Topselling.dialog")}
        </h1>
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((type, i) => (
            <button
              key={type}
              onClick={() =>
                setActiveFilter(activeFilter === type ? null : type)
              }
              className={`px-4 py-1 rounded-md border text-sm transition cursor-pointer
        ${
          activeFilter === type
            ? "bg-[#ecbf4c] text-white border-[#ecbf4c]"
            : "border-[#ecbf4c] text-gray-600 hover:bg-[#ecbf4c] hover:text-white"
        }
      `}
            >
              {translatedFilter[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Cards */}
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        spaceBetween={20}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          468: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {filteredCategories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="group block p-3  rounded-xl bg-white  transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={category.imageSrc}
                  alt={lang === "ar" ? category.nameAr : category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-[#ecbf4c]">
                  {lang === "ar" ? category.nameAr : category.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {locale === "ar"
                    ? `${toArabicNumerals(category.productCount)} منتج`
                    : `${category.productCount} Products`}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
