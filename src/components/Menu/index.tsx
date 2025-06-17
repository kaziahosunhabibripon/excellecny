"use client";

import { useEffect, useState, useRef } from "react";
import CommonHeader from "../common/CommonHeader";
import { MenuCard } from "./MenuCard";
import { useLocale, useTranslations } from "next-intl";
import { useGetAllFoodsQuery } from "@/redux/apiSlice/apiSlice";
import Loader from "@/helpers/ui/Loader";
import gsap from "gsap";

const ITEMS_PER_PAGE = 10;

interface FoodItem {
  id: number;
  name: string;
  arabic_name: string;
  description: string | null;
  image_url: string;
  price: number;
  offer_price: string;
}

const MenuComponent = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { data: foodsData, isLoading } = useGetAllFoodsQuery({});
  const [visibleFoods, setVisibleFoods] = useState<FoodItem[]>([]);
  const [page, setPage] = useState(1);
  const loadingMoreRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Append next batch of foods when page changes
  useEffect(() => {
    if (foodsData?.items?.length) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = page * ITEMS_PER_PAGE;
      const nextItems = foodsData.items.slice(start, end);

      setVisibleFoods((prev) => [...prev, ...nextItems]);
    }
  }, [foodsData, page]);

  // Scroll event handler to load more on near-bottom scroll
  useEffect(() => {
    const onScroll = () => {
      if (loadingMoreRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight > fullHeight - 150) {
        if (visibleFoods.length < (foodsData?.items?.length || 0)) {
          loadingMoreRef.current = true;
          setPage((prev) => prev + 1);
          setTimeout(() => {
            loadingMoreRef.current = false;
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleFoods, foodsData]);

  // GSAP animation for newly added items
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".menu-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.6,
      }
    );
  }, [visibleFoods]);

  if (isLoading) {
    return (
      <div className="py-14 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section
      className="min-h-screen bg-[#f2f2f25b]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <CommonHeader
        title={t("menu.title")}
        componentTitle={t("menu.componentTitle")}
      />
      <div
        ref={containerRef}
        className="container mx-auto px-4 py-8 grid grid-cols-2 gap-6"
      >
        {visibleFoods.map((item) => (
          <MenuCard
            key={item.id}
            item={{
              id: item.id,
              name: locale === "ar" ? item.arabic_name : item.name,
              description: item.description ?? "",
              image: item.image_url,
              price: item.price,
              currency: locale === "ar" ? "د.إ" : "AED",
            }}
          />
        ))}
      </div>

      {visibleFoods.length < (foodsData?.items?.length || 0) && (
        <div className="mt-8 text-center text-gray-500 font-medium">
          {locale === "ar" ? "جاري التحميل ..." : "Loading more..."}
        </div>
      )}
    </section>
  );
};

export default MenuComponent;
