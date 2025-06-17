"use client";

import { useEffect, useMemo, useState } from "react";
import OrderSummary from "./OrderSummary";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { CreditCard, DollarSign } from "react-feather";
import { size } from "lodash";
import toastAlert from "@/utils/toastConfig";
import CommonHeader from "../common/CommonHeader";
import { requestForCheckout } from "@/helpers/restApiRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setDefaultCart } from "@/redux/cart/cartSlice";
import { useLocale, useTranslations } from "use-intl";

type CartItems = {
  price: number;
  quantity: number;
};

const CheckoutComponent = () => {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const router = useRouter();
  const dispatch = useAppDispatch();

  // redux states
  const { user } = useAppSelector((state) => state.user);
  const { email, fullname } = user || {};
  const { checkoutCartItem } = useAppSelector((state) => state.cart);
  // fixed the error
  const totalAmount = useMemo(() => {
    const items = Array.isArray(checkoutCartItem) ? checkoutCartItem : [];

    return items.reduce(
      (sum: number, item: CartItems) =>
        sum + (item?.price ?? 0) * (item?.quantity ?? 0),
      0
    );
  }, [checkoutCartItem]);

  // states
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    payment_method: "cash_on_delivery",
    delivery_method: "home_delivery",
    delivery_address: "Mirpur Dhaka",
    total_amount: totalAmount,
    firstName: fullname || "",
    postalCode: "",
    lastName: "",
    apartment: "",
    phone: "",
    city: "",
    state: "",
  });

  const handleInputChange = (value: string | number, context: string) => {
    setFormData((prev) => ({ ...prev, [context]: value }));
  };

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
    setFormData((prev) => ({ ...prev, payment_method: "cash_on_delivery" }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (size(user) > 0) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { firstName, lastName, city, phone, apartment, ...updatedData } =
          formData || {
            payment_method: "",
            delivery_method: "",
            delivery_address: "",
            total_amount: 0,
          };
        const response = await requestForCheckout(updatedData);
        if (response?.data?.message === "Order placed successfully") {
          router.push("/tracking");
          dispatch(setDefaultCart());
        }
      } catch (error) {
        const { response } = error as {
          response: { data: { message: string } };
        };
        toastAlert("error", response?.data?.message, "top-right");
      }
    } else {
      router.push("/login");
    }
  };

  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  });

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <CommonHeader
        title={t("title")}
        subtitle={t("pageSubTitle")}
        componentTitle={t("componentTitle")}
      />

      <div className="max-w-7xl mx-auto px-4 pb-16 py-10" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <form className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t("contactInformation")}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {t("contactDescription")}
              </p>

              <input
                type="email"
                name="email"
                value={email || ""}
                onChange={(e) => handleInputChange(e.target.value, "email")}
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Email address"
              />
              <p className="text-sm text-gray-600 mt-2">
                {t("guestCheckoutNote")}

                <a href="#" className="text-[#ecbf4c] hover:text-[#ecbf4c]">
                  {t("createAccount")}
                </a>
              </p>
            </div>

            {/* Billing Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t("billingAddress")}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {t("billingDescription")}
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "firstName")
                    }
                    placeholder="First name"
                    className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "lastName")
                    }
                    placeholder="Last name"
                    className="px-4 py-2 border rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.delivery_address || ""}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "delivery_address")
                  }
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment || ""}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "apartment")
                  }
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={(e) => handleInputChange(e.target.value, "city")}
                    placeholder="City"
                    className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      value={formData.state || ""}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "state")
                      }
                      placeholder="State/County"
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "postalCode")
                    }
                    placeholder="Postal code (optional)"
                    className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange(e.target.value, "phone")}
                    placeholder="Phone number"
                    className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t("paymentOptions")}
              </h2>

              {/* Payment Method Section */}
              <div className="space-y-4">
                <div
                  onClick={() => handlePaymentChange("COD")}
                  className={`p-4 cursor-pointer border rounded-lg flex items-center justify-between transition-colors ${
                    paymentMethod === "COD"
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  <span className="text-lg font-medium flex justify-center items-center gap-2">
                    {t("cashOnDelivery")} <DollarSign />{" "}
                  </span>
                  {paymentMethod === "COD" && (
                    <svg
                      className="w-5 h-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Example: */}
                <div
                  onClick={() => handlePaymentChange("creditCard")}
                  className={`p-4 cursor-pointer border rounded-lg flex items-center justify-between transition-colors ${
                    paymentMethod === "creditCard"
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  <span className="text-lg font-medium flex justify-center items-center gap-2">
                    {t("creditCard")} <CreditCard />{" "}
                  </span>
                  {paymentMethod === "creditCard" && (
                    <svg
                      className="w-5 h-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {t("termsNote")}
                <a href="#" className="text-[#ecbf4c] hover:text-[#ecbf4c]">
                  {t("terms")}
                </a>

                <a href="#" className="text-[#ecbf4c] hover:text-[#ecbf4c]">
                  {t("privacy")}
                </a>
              </p>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <Link
                  href="/cart"
                  className=" bg-gray-300 !text-border-dark py-3 px-6 rounded transition duration-200"
                >
                  {t("returnToCart")}
                </Link>
                <button
                  role="button"
                  tabIndex={0}
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-brand hover:bg-[#ecbf4c] cursor-pointer text-white py-3 px-6 rounded transition duration-200"
                >
                  {t("placeOrder")}
                </button>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
