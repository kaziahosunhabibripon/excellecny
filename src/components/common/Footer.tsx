// "use client";
// import React, { useEffect, useState } from "react";
// import { navData } from "@/data/navData";
// import { footerSocialLinks } from "@/data";
// import Image from "next/image";
// import Link from "next/link";
// import { useLocale, useTranslations } from "next-intl";
// import { scrollToCountry } from "@/utils/scroll";
// import { countries } from "../../data/ProductData";

// interface CountryData {
//   group: {
//     id: number;
//     en: string;
//     ar: string;
//   }[];
// }

// const Footer = () => {
//   const locale = useLocale();
//   const lang = locale === "ar" ? "ar" : "en";
//   const t = useTranslations();

//   const [countryData, setCountryData] = useState<CountryData | null>(null);
//   const [value, setValue] = useState("");

//   useEffect(() => {
//     // Use static countries data instead of API
//     setCountryData({ group: countries });
//   }, []);

//   const handleChange = (value: string) => {
//     setValue(value);
//   };

//   const handleCountryClick = (countryName: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     scrollToCountry(countryName);
//   };

//   return (
//     <footer
//       className={`bg-brand-secondary text-white relative ${
//         lang === "ar" ? "text-right" : "text-left"
//       }`}
//     >
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div
//           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
//             lang === "ar" ? "rtl" : ""
//           }`}
//         >
//           {/* Logo & Description */}
//           <div>
//             <Image
//               src={"/assets/logo-1.png"}
//               alt="Fodis Logo"
//               width={800}
//               height={800}
//               className="w-28 h-24 mb-6 object-contain"
//             />
//             <p className="text-gray-400 mb-6">{t("footer.description")}</p>
//             <div className="flex gap-4">
//               {footerSocialLinks?.map(({ link, icon: Icon, id }) => (
//                 <Link
//                   key={id}
//                   href={link}
//                   className="w-8 h-8 flex items-center justify-center rounded border border-gray-700 hover:border-[#ff6b2c] hover:text-[#ff6b2c] transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Icon className="w-4 h-4" />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6">
//               {t("footer.quickLinks")}
//             </h3>
//             <ul className="space-y-3">
//               <nav>
//                 <ul>
//                   {navData.slice(1, 7).map((item) => {
//                     // Pick the right label based on lang
//                     const label = lang === "ar" ? item.labelAr : item.labelEn;

//                     // Split label by \n to add <br />
//                     const parts = label.split("\n");

//                     return (
//                       <li key={item.id}>
//                         <Link
//                           href={item.link}
//                           className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
//                         >
//                           {parts.map((part, i) => (
//                             <React.Fragment key={i}>
//                               {part}
//                               {i !== parts.length - 1 && <br />}
//                             </React.Fragment>
//                           ))}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </nav>
//             </ul>
//           </div>

//           {/* Groups */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6">{t("footer.groups")}</h3>
//             {countryData?.group?.length ? (
//               (() => {
//                 const half = Math.ceil(countryData.group.length / 2);
//                 const firstHalf = countryData.group.slice(0, half);
//                 const secondHalf = countryData.group.slice(half);

//                 return (
//                   <div className="flex gap-8">
//                     <ul className="space-y-3 flex-1">
//                       {firstHalf.map((item) => (
//                         <li key={item.id}>
//                           <a
//                             href="#countryFlags"
//                             className="text-gray-400 hover:text-[#ff6b2c] transition-colors cursor-pointer"
//                             onClick={(e) =>
//                               handleCountryClick(
//                                 lang === "ar" ? item.ar : item.en,
//                                 e
//                               )
//                             }
//                           >
//                             {lang === "ar" ? item.ar : item.en}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                     <ul className="space-y-3 flex-1">
//                       {secondHalf.map((item) => (
//                         <li key={item.id}>
//                           <a
//                             href="#countryFlags"
//                             className="text-gray-400 hover:text-[#ff6b2c] transition-colors cursor-pointer"
//                             onClick={(e) =>
//                               handleCountryClick(
//                                 lang === "ar" ? item.ar : item.en,
//                                 e
//                               )
//                             }
//                           >
//                             {lang === "ar" ? item.ar : item.en}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               })()
//             ) : (
//               <p className="text-gray-500">{t("footer.noGroups")}</p>
//             )}
//           </div>

//           {/* Contact Us */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6">
//               {t("footer.contactUs")}
//             </h3>
//             <div className="space-y-4">
//               <div className="text-gray-400">
//                 <div>{t("footer.mondayFriday")}</div>
//                 <div>{t("footer.saturday")}</div>
//               </div>
//               <div className="space-y-4">
//                 <input
//                   type="email"
//                   placeholder={t("footer.emailPlaceholder")}
//                   value={value}
//                   onChange={(e) => handleChange(e.target.value)}
//                   className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#ff6b2c]"
//                 />
//               </div>
//               <div className="flex items-start gap-2">
//                 <input type="checkbox" id="privacy" className="mt-1.5" />
//                 <label htmlFor="privacy" className="text-sm text-gray-400">
//                   {t("footer.agreePrivacy")}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div
//             className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
//               lang === "ar" ? "rtl" : ""
//             }`}
//           >
//             <div>
//               <p className="text-gray-400 text-sm">
//                 {t("footer.developedBy")}{" "}
//                 <Link
//                   href="https://rapidsmarterp.com/"
//                   className="hover:text-blue-500"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {t("footer.rapid")}
//                 </Link>
//               </p>
//             </div>
//             <div className="text-gray-400 text-sm text-center">
//               {t("footer.copyright")}
//             </div>
//             <div className="flex gap-4 text-sm">
//               <Link
//                 href="#"
//                 className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
//               >
//                 {t("footer.terms")}
//               </Link>
//               <Link
//                 href="#"
//                 className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
//               >
//                 {t("footer.privacy")}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
"use client";
import React, { useEffect, useState } from "react";
import { navData } from "@/data/navData";
import { footerSocialLinks } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { scrollToCountry } from "@/utils/scroll";
import { countries } from "../../data/ProductData";

interface CountryData {
  group: {
    id: number;
    en: string;
    ar: string;
  }[];
}

const Footer = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();

  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    // Use static countries data instead of API
    setCountryData({ group: countries });
  }, []);

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleCountryClick = (countryName: string, e: React.MouseEvent) => {
    e.preventDefault();
    scrollToCountry(countryName);
  };

  return (
    <footer
      className={`bg-brand-secondary text-white relative ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
            lang === "ar" ? "rtl" : ""
          }`}
        >
          {/* Logo & Description */}
          <div>
            <Image
              src={"/assets/logo-1.png"}
              alt="Fodis Logo"
              width={800}
              height={800}
              className="w-28 h-24 mb-6 object-contain"
            />
            <p className="text-gray-400 mb-6">{t("footer.description")}</p>
            <div className="flex gap-4">
              {footerSocialLinks?.map(({ link, icon: Icon, id }) => (
                <Link
                  key={id}
                  href={link}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-700 hover:border-[#ff6b2c] hover:text-[#ff6b2c] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <nav>
                <ul>
                  {navData.slice(1, 7).map((item) => {
                    // Pick the right label based on lang
                    const label = lang === "ar" ? item.labelAr : item.labelEn;

                    // Split label by \n to add <br />
                    const parts = label.split("\n");

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.link}
                          className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
                        >
                          {parts.map((part, i) => (
                            <React.Fragment key={i}>
                              {part}
                              {i !== parts.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </ul>
          </div>

          {/* Groups */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.groups")}</h3>
            {countryData?.group?.length ? (
              (() => {
                const half = Math.ceil(countryData.group.length / 2);
                const firstHalf = countryData.group.slice(0, half);
                const secondHalf = countryData.group.slice(half);

                return (
                  <div className="flex gap-8">
                    <ul className="space-y-3 flex-1">
                      {firstHalf.map((item) => (
                        <li key={item.id}>
                          <a
                            href="#countryFlags"
                            className="text-gray-400 hover:text-[#ff6b2c] transition-colors cursor-pointer"
                            onClick={(e) =>
                              handleCountryClick(
                                lang === "ar" ? item.ar : item.en,
                                e
                              )
                            }
                          >
                            {lang === "ar" ? item.ar : item.en}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3 flex-1">
                      {secondHalf.map((item) => (
                        <li key={item.id}>
                          <a
                            href="#countryFlags"
                            className="text-gray-400 hover:text-[#ff6b2c] transition-colors cursor-pointer"
                            onClick={(e) =>
                              handleCountryClick(
                                lang === "ar" ? item.ar : item.en,
                                e
                              )
                            }
                          >
                            {lang === "ar" ? item.ar : item.en}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()
            ) : (
              <p className="text-gray-500">{t("footer.noGroups")}</p>
            )}
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("footer.contactUs")}
            </h3>
            <div className="space-y-4">
              <div className="text-gray-400">
                <div>{t("footer.mondayFriday")}</div>
                <div>{t("footer.saturday")}</div>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#ff6b2c]"
                />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-1.5" />
                <label htmlFor="privacy" className="text-sm text-gray-400">
                  {t("footer.agreePrivacy")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
              lang === "ar" ? "rtl" : ""
            }`}
          >
            <div>
              <p className="text-gray-400 text-sm">
                {t("footer.developedBy")}{" "}
                <Link
                  href="https://rapidsmarterp.com/"
                  className="hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.rapid")}
                </Link>
              </p>
            </div>
            <div className="text-gray-400 text-sm text-center">
              {t("footer.copyright")}
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
