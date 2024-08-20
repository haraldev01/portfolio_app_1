export default function formatBigNumber(number: number, significantDigits = 3) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: significantDigits,
  }).format(number);
}
