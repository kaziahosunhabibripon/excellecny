"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaUserCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const foodBlogs = [
  {
    id: 1,
    en: {
      author: "John Baker",
      date: "12 June 2025",
      title: "Top 5 Healthy Burgers You Can Make at Home",
      description:
        "Discover delicious and nutritious burger recipes for a healthier lifestyle.",
      tag: "Healthy Eating",
      image: "/assets/burger.png",
    },
    ar: {
      author: "جون بيكر",
      date: "١٢ يونيو ٢٠٢٥",
      title: "أفضل 5 وصفات برجر صحية يمكنك إعدادها في المنزل",
      description: "اكتشف وصفات برجر لذيذة ومغذية لنمط حياة صحي.",
      tag: "الأكل الصحي",
      image: "/assets/burger.png",
    },
  },
  {
    id: 2,
    en: {
      author: "Emma Rose",
      date: "7 June 2025",
      title: "Quick Snacks with Fresh Ingredients",
      description:
        "Simple and fast snack ideas using fresh produce and pantry staples.",
      tag: "Quick Meals",
      image: "/assets/food-4.png",
    },
    ar: {
      author: "إيما روز",
      date: "٧ يونيو ٢٠٢٥",
      title: "وجبات خفيفة سريعة بمكونات طازجة",
      description:
        "أفكار بسيطة وسريعة للوجبات الخفيفة باستخدام مكونات طازجة وأساسية.",
      tag: "وجبات سريعة",
      image: "/assets/food-4.png",
    },
  },
  {
    id: 3,
    en: {
      author: "Liam Cook",
      date: "1 June 2025",
      title: "Secrets to Perfect Pasta Every Time",
      description:
        "Master the art of cooking perfect pasta with these expert tips.",
      tag: "Cooking Tips",
      image: "/assets/food-3.png",
    },
    ar: {
      author: "ليام كوك",
      date: "١ يونيو ٢٠٢٥",
      title: "أسرار تحضير الباستا المثالية في كل مرة",
      description: "أتقن فن طهي الباستا المثالية مع هذه النصائح من الخبراء.",
      tag: "نصائح الطبخ",
      image: "/assets/food-3.png",
    },
  },
  {
    id: 4,
    en: {
      author: "Sophia Green",
      date: "25 May 2025",
      title: "Homemade Pizza: Dough to Delicious",
      description:
        "A complete guide to making the perfect pizza from scratch at home.",
      tag: "Baking",
      image: "/assets/food-2.png",
    },
    ar: {
      author: "صوفيا جرين",
      date: "٢٥ مايو ٢٠٢٥",
      title: "البيتزا المنزلية: من العجين إلى اللذة",
      description: "دليل كامل لتحضير البيتزا المثالية من البداية في المنزل.",
      tag: "الخبز",
      image: "/assets/food-2.png",
    },
  },
  {
    id: 5,
    en: {
      author: "Michael Yum",
      date: "18 May 2025",
      title: "5 Smoothie Recipes for Energy and Focus",
      description:
        "Blend your way to better mornings with these energizing smoothie ideas.",
      tag: "Beverages",
      image: "/assets/food-1.png",
    },
    ar: {
      author: "مايكل يوم",
      date: "١٨ مايو ٢٠٢٥",
      title: "٥ وصفات سموذي للطاقة والتركيز",
      description: "ابدأ يومك بشكل أفضل مع هذه الوصفات المنعشة للسموذي.",
      tag: "المشروبات",
      image: "/assets/food-1.png",
    },
  },
];

export default function LatestPost() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center border-b border-gray-300 mb-8">
        <h2 className="text-xl font-bold text-gray-800 my-2">
          <span className="border-l-4 border-[#ecbf4c] pl-2">
            {lang === "ar" ? "المدونة" : "Blogs"}
          </span>
        </h2>
        <Link href="#" className="text-sm text-[#ecbf4c] font-medium">
          {lang === "ar" ? "استكشف المزيد" : "Explore more"}
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="w-full"
        >
          {foodBlogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="mx-auto">
                <div className="w-full max-w-md mx-auto p-4">
                  <Image
                    src={blog[lang].image}
                    alt={blog[lang].title}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover p-4"
                  />
                </div>
                <div className="p-4 flex flex-col items-start justify-center">
                  <div className="flex items-center text-sm text-gray-600 mb-2 gap-2">
                    <FaUserCircle className="text-lg" />
                    <span>{blog[lang].author}</span> ·{" "}
                    <span>{blog[lang].date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog[lang].title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {blog[lang].description}
                  </p>
                  <Link
                    href="#"
                    className="text-[#ecbf4c] text-sm font-medium flex items-center gap-1"
                  >
                    {lang === "ar" ? "اقرأ المزيد" : "Read more"}{" "}
                    <span className="text-xl">→</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Side - Blog List */}
        <div className="space-y-4">
          {foodBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between items-center border shadow-emerald-200 border-slate-300 rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col items-start justify-center">
                <p className="text-xs text-gray-400 mb-1">{blog[lang].tag}</p>
                <h4 className="text-md font-semibold text-gray-800 mb-1">
                  {blog[lang].title}
                </h4>
                <Link
                  href="#"
                  className="text-[#ecbf4c] text-sm flex items-center gap-1"
                >
                  {lang === "ar" ? "اقرأ المزيد" : "Read more"}{" "}
                  <span className="text-lg">→</span>
                </Link>
              </div>
              <div className="w-20 h-14 relative flex-shrink-0">
                <Image
                  src={blog[lang].image}
                  alt={blog[lang].title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
