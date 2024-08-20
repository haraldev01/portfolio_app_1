export default function LoadingBio() {
  return (
    <div className="p-4 m-2 rounded-md bg-secondary border border-accent animate-pulse mb-4 flex flex-col">
      <div className="w-full h-4 my-1 rounded-md bg-muted-foreground/50" />
      <div className="w-5/6 sm:w-1/3 h-4 my-1 rounded-md bg-muted-foreground/50 md:hidden" />
      <div className="w-1/2 h-4 my-1 rounded-md bg-muted-foreground/50 sm:hidden" />
    </div>
  );
}
