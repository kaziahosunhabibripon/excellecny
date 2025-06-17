"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import NoDataFoundIcon from "@/helpers/ui/customSvg/NoDataFoundIcon";
import ProductCard from "../SingleFood/ProductCard";
import { useAppSelector } from "@/redux/hooks/hooks";
import { FoodItem } from "@/types/types";
import { FoodGroup } from "@/types/GroupFoodTypes";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const FoodCardNSlider = ({
  group,
  items,
}: {
  group: FoodGroup;
  items: FoodItem[];
}) => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const router = useRouter();
  const { modalProps, selectedSearchData } = useAppSelector(
    (state) => state.app
  );
  const t = useTranslations();
  const locale = useLocale();

  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (group?.categories && size(group.categories) > 0) {
      const setMenuCategory = group.categories.find(
        (cat) => cat.name.trim().toLowerCase() === "set menu"
      );
      if (setMenuCategory) {
        setActiveMainCategory(setMenuCategory);
      } else {
        setActiveMainCategory(group.categories[0]);
      }
      setActiveSubCategory(null);
    }
  }, [group]);

  const handleMainCategoryChange = (mainCat) => {
    setActiveMainCategory(mainCat);
    setActiveSubCategory(null);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  const handleSubCategoryChange = (subCat) => {
    setActiveSubCategory(subCat);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  const filteredItems = useMemo(() => {
    if (activeMainCategory) {
      if (activeSubCategory) {
        return items.filter(
          (item) => item?.purchase_sub_category_id === activeSubCategory.id
        );
      } else {
        return items.filter(
          (item) => item?.purchase_category_id === activeMainCategory.id
        );
      }
    }
    return items;
  }, [items, activeMainCategory, activeSubCategory]);

  const handleRedirect = (params) => {
    router.push(`/food/${params?.id}`);
  };

  useEffect(() => {
    if (
      selectedSearchData &&
      activeMainCategory &&
      selectedSearchData?.purchase_category_id === activeMainCategory?.id
    ) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedSearchData, activeMainCategory]);

  useEffect(() => {
    if (modalProps?.id === group?.id && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [modalProps, group]);

  const handleMouseEnter = () => {
    swiperInstance?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperInstance?.autoplay?.start();
  };

  const getDisplayName = (item) => {
    return locale === "ar" ? item.arabic_name || item.name : item.name;
  };

  return (
    <div className="h-full w-full py-8 bg-[#f2f2f25b]" ref={sectionRef}>
      <AppTitleHeader
        title={getDisplayName(group)}
        secondaryTitle={t("food.secondaryTitle")}
      />

      {/* Main Category Tabs */}
      <div className="flex md:justify-center !ml-8 !mr-8 md:mr-0 md:ml-0 gap-8 overflow-x-auto pb-2">
        {group?.categories?.map((mainCat) => (
          <button
            key={mainCat.id}
            role="button"
            tabIndex={0}
            onClick={() => handleMainCategoryChange(mainCat)}
            className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap ${
              activeMainCategory?.id === mainCat.id
                ? "text-brand"
                : "text-gray-600"
            }`}
          >
            {getDisplayName(mainCat)}
            {activeMainCategory?.id === mainCat.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        ))}
      </div>

      {/* Sub Category Tabs */}
      {activeMainCategory?.sub_categories?.length > 0 && (
        <div className="flex md:justify-center !ml-8 !mr-8 md:mr-0 md:ml-0 gap-8 overflow-x-auto pb-2">
          <button
            role="button"
            tabIndex={0}
            onClick={() => handleSubCategoryChange(null)}
            className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap ${
              !activeSubCategory ? "text-brand" : "text-gray-600"
            }`}
          >
            {t("All")}
            {!activeSubCategory && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
          {activeMainCategory.sub_categories.map((subCat) => (
            <button
              key={subCat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSubCategoryChange(subCat)}
              className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap first-letter:uppercase lowercase ${
                activeSubCategory?.id === subCat.id
                  ? "text-brand"
                  : "text-gray-600"
              }`}
            >
              {getDisplayName(subCat)}
              {activeSubCategory?.id === subCat.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 md:px-12">
        {size(filteredItems) > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={true}
            grabCursor={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="foodCard"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              468: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 10 },
            }}
          >
            {filteredItems.map((item) => (
              <SwiperSlide
                key={item?.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ProductCard
                  key={item?.id}
                  data={item}
                  callback={() => handleRedirect(item)}
                  customClasses="w-[400px] h-[300px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="flex flex-col justify-center items-center gap-4">
              <NoDataFoundIcon />
              <p className="font-medium first-letter:uppercase lowercase">
                {t("noItems")}
                {activeSubCategory && (
                  <>
                    {t("for")}
                    <span className="text-brand font-medium">
                      {getDisplayName(activeSubCategory)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FoodCardNSlider);
