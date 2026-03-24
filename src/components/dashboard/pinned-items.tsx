import { Star } from "lucide-react";
import { items } from "@/lib/mock-data";
import { ItemCard } from "./item-card";

export function PinnedItems() {
  const pinnedItems = items.filter((i) => i.isPinned);

  if (pinnedItems.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-white">Pinned Items</h2>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pinnedItems.map((item) => (
          <ItemCard key={item.id} item={item} showPinnedTime />
        ))}
      </div>
    </section>
  );
}
