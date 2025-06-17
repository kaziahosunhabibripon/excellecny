"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { size } from "lodash";
import Image from "next/image";
import { Heart, Minus, Plus, ShoppingCart, Star } from "react-feather";
import toastAlert from "@/utils/toastConfig";
import { alterCardImage, truncateText } from "@/utils/appHelpers";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  addToCart,
  setGuestUserId,
  setOpenCartModal,
} from "@/redux/cart/cartSlice";
import { FoodItem } from "@/types/types";
import { addToCartItem } from "@/helpers/restApiRequest";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toArabicNumerals } from "@/helpers/ui/Arabic";

interface ProductCardProps {
  data: FoodItem;
  callback?: () => void;
  customClasses?: string;
  index?: number;
}

const isValidImgUrl = (img: string | undefined) => {
  return img?.startsWith("http://") || img?.startsWith("https://");
};

const ProductCard = ({
  data,
  customClasses = "w-40 h-40",
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const toastId = useRef<string | number | null>(null);
  const skipNextSync = useRef(false);

  const locale = useLocale();
  const t = useTranslations();

  const { id, image_url, price, sub_category, name, arabic_name } = data || {};

  const cartItem = useAppSelector((state) =>
    state.cart.cartData?.find((item) => item?.id === id)
  );

  const displayName = truncateText(
    locale === "ar" ? arabic_name || name : name,
    25
  );

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    if (cartItem && !skipNextSync.current) {
      setQuantity(cartItem.quantity);
    }
    if (skipNextSync.current) {
      skipNextSync.current = false;
    }
  }, [cartItem]);

  const foodImage = useMemo(
    () => (isValidImgUrl(image_url) ? image_url : alterCardImage),
    [image_url]
  );

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    try {
      const response = await addToCartItem({ item_id: id, quantity });
      if (size(response)) {
        const guestUserId = response?.data?.cart?.guest_id || "";
        dispatch(setGuestUserId(guestUserId));
        dispatch(
          addToCart({
            items: data,
            quantity,
            cartId: response?.data?.cart?.id,
            guestId: guestUserId,
          })
        );
        dispatch(setOpenCartModal(true));
        skipNextSync.current = true;
        setQuantity(1);
      }
    } catch (err) {
      const { response } = err as { response: { data: { message: string } } };
      toastAlert("error", response?.data?.message, "top-right", toastId, {
        autoClose: 4000,
      });
    }
  };

  return (
    <div
      className="max-w-sm rounded-xl overflow-hidden p-3 shadow-lg group bg-white transition-transform duration-300 ease-in-out"
      key={id}
    >
      <div className="relative overflow-hidden">
        <Link href="#">
          <Image
            src={foodImage}
            alt={displayName}
            width={200}
            height={200}
            loading="lazy"
            className={`${customClasses} object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110`}
          />
        </Link>
        <div className="absolute top-4 right-4 p-2 rounded-full border border-gray-200 hover:bg-[#cf3613] cursor-pointer">
          <Heart className="w-6 h-6 text-brand hover:text-white" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base 2xl:text-xl font-semibold text-gray-900 lowercase first-letter:uppercase">
              {displayName}
            </h3>
            <p className="text-gray-600 text-sm">{sub_category?.name}</p>
          </div>
          <div className="flex items-center px-2 py-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-gray-500 ml-1 group-hover:fill-[#ecbf4c] group-hover:text-[#ecbf4c] transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-900 font-medium text-base 2xl:text-lg">
            {t("product.currency")}
            {locale === "ar"
              ? toArabicNumerals(Math.round(Number(price)))
              : Math.round(Number(price))}
          </span>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#ecbf4c] rounded-full">
              <button
                onClick={handleDecrement}
                className="border border-[#ecbf4c] rounded-full h-8 w-8 bg-white flex items-center justify-center"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>

              <span className="px-1">
                {locale === "ar" ? toArabicNumerals(quantity) : quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="border border-[#ecbf4c] rounded-full h-8 w-8 bg-white flex items-center justify-center"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div
              onClick={handleAddToCart}
              className="cursor-pointer p-2 rounded-full border border-[#ecbf4c] hover:bg-[#ecbf4c] hover:[&>svg]:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-[#ecbf4c]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
