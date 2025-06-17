"use client";

import { toArabicNumerals } from "@/helpers/ui/Arabic";
import { useLocale } from "next-intl";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
}

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const locale = useLocale();

  return (
    <div className="bg-white p-4 rounded-md border group border-gray-100 cursor-pointer flex items-center gap-4">
      <div className="relative flex-shrink-0 items-center justify-center rounded-full w-[120px] h-auto">
        <Image
          src={item.image || "/fallback-image.png"}
          alt={item.name}
          width={800}
          height={800}
          loading="lazy"
          className="rounded-full object-contain p-4  transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base md:text-xl text-gray-900">
            {item.name}
          </h3>
          <div className="flex items-center">
            <span className="text-brand font-semibold text-lg">
              {item.currency}{" "}
              {locale === "ar"
                ? toArabicNumerals(item.price)
                : item.price.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
      </div>
    </div>
  );
}
