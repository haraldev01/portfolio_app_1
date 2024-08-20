import type { MDXComponents } from "mdx/types";
import { fontHero } from "./styles/fonts";
import { cn } from "./lib/utils";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className={cn("text-5xl ml-8", fontHero.className)}>{children}</h1>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6">{children}</ul>
    ),
    li: ({ children }) => <li>{children}</li>,
    a: ({ children, ...props }) => {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:cursor-pointer text-pink-500"
          // {...props}
        >
          {children}
        </a>
      );
    },

    // img: (props) => (
    //   <Image
    //     sizes="100vw"
    //     style={{ width: "100%", height: "auto" }}
    //     {...(props as ImageProps)}
    //   />
    // ),
    ...components,
  };
}
