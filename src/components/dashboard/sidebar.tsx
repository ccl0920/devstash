"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  Link as LinkIcon,
  File,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "./sidebar-context";
import { itemTypes, collections, currentUser } from "@/lib/mock-data";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  Link: LinkIcon,
  File,
};

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggle, toggleMobile } = useSidebar();

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = [...collections]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with logo and collapse toggle */}
      <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-3">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">DevStash</h1>
              <p className="text-xs text-zinc-400">Your Second Brain</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 mx-auto">
            <Box className="h-5 w-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="hidden md:inline-flex h-8 w-8 text-zinc-400 hover:text-white"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-3">
          {/* Item Types */}
          {!isCollapsed && (
            <div>
              <h3 className="mb-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Item Types
              </h3>
              <nav className="space-y-1">
                {itemTypes.map((type) => {
                  const Icon = iconMap[type.icon] || File;
                  const href = `/items/${type.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={type.id}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: type.color }}
                      />
                      <span className="truncate">{type.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {isCollapsed && (
            <div>
              <h3 className="sr-only">Item Types</h3>
              <nav className="space-y-1">
                {itemTypes.map((type) => {
                  const Icon = iconMap[type.icon] || File;
                  const href = `/items/${type.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={type.id}
                      href={href}
                      className={cn(
                        "flex items-center justify-center rounded-md p-2 transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                      title={type.name}
                    >
                      <Icon className="h-4 w-4" style={{ color: type.color }} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          <Separator className="bg-zinc-800" />

          {/* Favorite Collections */}
          {!isCollapsed && favoriteCollections.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-3 w-3 text-zinc-400" />
                <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Favorites
                </h3>
              </div>
              <nav className="space-y-1">
                {favoriteCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <Star className="h-3 w-3 shrink-0 text-yellow-500" />
                      <span className="truncate">{collection.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {isCollapsed && favoriteCollections.length > 0 && (
            <div>
              <h3 className="sr-only">Favorites</h3>
              <nav className="space-y-1">
                {favoriteCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center justify-center rounded-md p-2 transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                      title={collection.name}
                    >
                      <Star className="h-3 w-3 text-yellow-500" />
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Recent Collections */}
          {!isCollapsed && recentCollections.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-3 w-3 text-zinc-400" />
                <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Recent
                </h3>
              </div>
              <nav className="space-y-1">
                {recentCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <Box className="h-3 w-3 shrink-0 text-zinc-500" />
                      <span className="truncate">{collection.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {isCollapsed && recentCollections.length > 0 && (
            <div>
              <h3 className="sr-only">Recent</h3>
              <nav className="space-y-1">
                {recentCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center justify-center rounded-md p-2 transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                      title={collection.name}
                    >
                      <Box className="h-3 w-3 text-zinc-500" />
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* User section at bottom */}
      <div className="border-t border-zinc-800 p-3">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <Avatar>
              {currentUser.image ? (
                <AvatarImage src={currentUser.image} alt={currentUser.name} />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
            </div>
            {currentUser.isPro && (
              <Badge
                variant="secondary"
                className="bg-violet-600/20 text-violet-400 border-violet-600/30 text-xs"
              >
                Pro
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar>
              {currentUser.image ? (
                <AvatarImage src={currentUser.image} alt={currentUser.name} />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button - always visible on mobile */}
      <div className="fixed left-3 top-3 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobile}
          className="h-9 w-9 border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile sidebar - slides in from left */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Render non-collapsed version for mobile */}
        <div className="h-full w-64">
          <SidebarNonCollapsedContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block">{sidebarContent}</aside>
    </>
  );
}

// Separate component for mobile sidebar content (always non-collapsed)
function SidebarNonCollapsedContent() {
  const pathname = usePathname();
  const { toggleMobile } = useSidebar();

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = [...collections]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-900">
      {/* Header with logo and close button */}
      <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Box className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">DevStash</h1>
            <p className="text-xs text-zinc-400">Your Second Brain</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="h-8 w-8 text-zinc-400 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-3">
          {/* Item Types */}
          <div>
            <h3 className="mb-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Item Types
            </h3>
            <nav className="space-y-1">
              {itemTypes.map((type) => {
                const Icon = iconMap[type.icon] || File;
                const href = `/items/${type.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={type.id}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    )}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: type.color }}
                    />
                    <span className="truncate">{type.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator className="bg-zinc-800" />

          {/* Favorite Collections */}
          {favoriteCollections.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-3 w-3 text-zinc-400" />
                <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Favorites
                </h3>
              </div>
              <nav className="space-y-1">
                {favoriteCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <Star className="h-3 w-3 shrink-0 text-yellow-500" />
                      <span className="truncate">{collection.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Recent Collections */}
          {recentCollections.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-3 w-3 text-zinc-400" />
                <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Recent
                </h3>
              </div>
              <nav className="space-y-1">
                {recentCollections.map((collection) => {
                  const href = `/collections/${collection.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={collection.id}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <Box className="h-3 w-3 shrink-0 text-zinc-500" />
                      <span className="truncate">{collection.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* User section at bottom */}
      <div className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-3">
          <Avatar>
            {currentUser.image ? (
              <AvatarImage src={currentUser.image} alt={currentUser.name} />
            ) : (
              <AvatarFallback className="bg-blue-600 text-white text-xs">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
          </div>
          {currentUser.isPro && (
            <Badge
              variant="secondary"
              className="bg-violet-600/20 text-violet-400 border-violet-600/30 text-xs"
            >
              Pro
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
