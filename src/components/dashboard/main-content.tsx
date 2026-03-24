import { StatsCards } from "./stats-cards";
import { PinnedItems } from "./pinned-items";
import { RecentItems } from "./recent-items";

export function MainContent() {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <StatsCards />
      <PinnedItems />
      <RecentItems />
    </main>
  );
}
