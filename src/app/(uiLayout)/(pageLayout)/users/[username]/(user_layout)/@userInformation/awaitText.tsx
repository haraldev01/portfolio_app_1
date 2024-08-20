export default async function AwaitText<T>({
  promise,
  extractText,
}: {
  promise: Promise<T>;
  extractText: (item: T) => string;
}) {
  const item: T = await promise;
  if (item) {
    const text = extractText(item);
    if (text) return text;
  }
  return null;
}
