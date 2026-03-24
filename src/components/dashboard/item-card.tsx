import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  Link as LinkIcon,
  File,
  Star,
  Clock,
  Folder,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { items, collections, itemTypes } from "@/lib/mock-data";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  Link: LinkIcon,
  File,
};

// Get type info by typeId
function getTypeInfo(typeId: string) {
  const type = itemTypes.find((t) => t.id === typeId);
  return type || itemTypes[0];
}

// Get collection name by id
function getCollectionName(collectionId?: string) {
  if (!collectionId) return null;
  const collection = collections.find((c) => c.id === collectionId);
  return collection?.name || null;
}

// Generate mock tags based on item content
function getItemTags(item: (typeof items)[0]): string[] {
  const tagMap: Record<string, string[]> = {
    item_1: ["typescript", "react", "hooks"],
    item_2: ["ai", "review"],
    item_3: ["docker", "cleanup"],
    item_4: ["auth", "jwt", "api"],
    item_5: ["nextjs", "docs"],
    item_6: ["pdf"],
  };
  return tagMap[item.id] || [];
}

// Format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

export interface ItemCardProps {
  item: (typeof items)[0];
  showPinnedTime?: boolean;
}

export function ItemCard({ item, showPinnedTime = false }: ItemCardProps) {
  const type = getTypeInfo(item.typeId);
  const Icon = iconMap[type.icon] || File;
  const tags = getItemTags(item);
  const collectionName = getCollectionName("collection_1"); // Mock collection

  const timeDisplay = showPinnedTime
    ? formatRelativeTime(item.createdAt)
    : formatRelativeTime(item.createdAt);

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
      <CardContent className="p-4">
        {/* Type indicator */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="p-1.5 rounded-md"
            style={{ backgroundColor: `${type.color}20` }}
          >
            <Icon className="h-4 w-4" style={{ color: type.color }} />
          </div>
          <span className="text-xs font-medium" style={{ color: type.color }}>
            {type.name}
          </span>
          {item.isPinned && (
            <Star className="h-3 w-3 text-yellow-500 ml-auto fill-yellow-500" />
          )}
        </div>

        {/* Title and description */}
        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-zinc-800 text-zinc-400 text-xs px-1.5 py-0.5 h-auto"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer with time and collection */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-3 w-3" />
          <span>{timeDisplay}</span>
          {collectionName && (
            <>
              <span>•</span>
              <Folder className="h-3 w-3" />
              <span>{collectionName}</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
