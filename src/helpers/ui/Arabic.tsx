// utils/localeHelpers.ts

/**
 * Converts Western digits (0–9) to Arabic numerals (٠–٩)
 * @param num A number or numeric string
 * @returns The Arabic numeral string
 */
export const toArabicNumerals = (num: number | string): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .replace(/\d/g, (digit) => arabicDigits[+digit])
    .replace(".", "٫")
    .replace(",", "،");
};
