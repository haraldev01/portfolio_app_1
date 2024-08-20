import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio app",
    short_name: "Portfolio app",
    description: "Portfolio App Description",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "rgb(249 250 251)",
    orientation: "portrait",
    icons: [
      {
        src: "/portfolio_app_logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
