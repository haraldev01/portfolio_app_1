"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function BioComponent({
  bio,
  className,
}: {
  bio: string;
  className?: string;
}) {
  const isLong = bio.length > 100;
  const [isReadMore, setIsReadMore] = useState(isLong);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div
      className={cn(
        "p-4 m-2 rounded-md bg-card border border-border mb-4",
        className,
      )}
    >
      <p>
        {isReadMore ? bio.slice(0, 100).trimEnd() : bio}
        {isReadMore && isLong && "..."}
        {isLong && (
          <button onClick={toggleReadMore} className="ml-1 text-primary inline">
            {isReadMore ? "read more" : "show less"}
          </button>
        )}
      </p>
    </div>
  );
}
