"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default async function BackButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="flex gap-2 items-center group w-fit"
      variant={"secondary"}
    >
      <ChevronLeftIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-400 ease-out" />
      <span className="relative before:absolute before:h-0.5 before:bg-muted-foreground before:bottom-0 before:left-0 before:rounded-full before:w-0 before:transition-all before:duration-200 before:ease-in-out group-hover:before:w-full before:ease-out">
        {text}
      </span>
    </Button>
  );
}
