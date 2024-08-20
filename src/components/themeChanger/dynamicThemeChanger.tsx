import dynamic from "next/dynamic";

const DynamicThemeChanger = dynamic(() => import("./themeChanger"), {
  ssr: false,
  loading: () => {
    return (
      <div className="w-10 h-10 rounded-full bg-muted border border-border animate-pulse" />
    );
  },
});

export default DynamicThemeChanger;