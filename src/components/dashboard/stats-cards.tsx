import { Folder, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { stats } from "@/lib/mock-data";
import { collections, items } from "@/lib/mock-data";

// Calculate favorite counts
const favoriteItemsCount = items.filter((i) => i.isFavorite).length;
const favoriteCollectionsCount = collections.filter((c) => c.isFavorite).length;

export function StatsCards() {
  const statCards = [
    {
      label: "Items",
      value: stats.items,
      icon: Folder,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Collections",
      value: stats.collections,
      icon: Folder,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Favorite Items",
      value: favoriteItemsCount,
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Favorite Collections",
      value: favoriteCollectionsCount,
      icon: Star,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
