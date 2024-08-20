import formatBigNumber from "@/utils/formatBigNumber";
import { Suspense } from "react";
import AwaitText from "./awaitText";
import getUserStats from "@/services/userStats/getUserStats";

export default function UserStats({ username }: { username: string }) {
  const testUserStats = getUserStats({ username });

  return (
    <div className="flex flex-row sm:hidden items-center">
      <Stat
        title="plays"
        valuePromise={testUserStats.then((item) => item.plays)}
      />
      <StatSeparator />
      <Stat
        title="likes"
        valuePromise={testUserStats.then((item) => item.likes)}
      />
      <StatSeparator />
      <Stat
        title="followers"
        valuePromise={testUserStats.then((item) => item.followers)}
      />
    </div>
  );
}

const Stat = ({
  title,
  valuePromise,
}: {
  title: string;
  valuePromise: Promise<number>;
}) => {
  return (
    <div className="flex-none w-24 flex flex-col gap-1 items-center">
      <Suspense
        fallback={
          <div className="w-10 h-6 rounded-md animate-pulse bg-muted-foreground/50" />
        }
      >
        <div>
          <AwaitText
            promise={valuePromise}
            extractText={(item) => String(formatBigNumber(item))}
          />
        </div>
      </Suspense>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
};

const StatSeparator = () => <div className="w-px h-8 bg-muted" />;
