export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 pt-4 md:pb-4">
      {children}
    </div>
  );
}
