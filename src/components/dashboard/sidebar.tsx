import { Box } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Box className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold">DevStash</h1>
          <p className="text-xs text-zinc-400">Your Second Brain</p>
        </div>
      </div>

      <nav className="space-y-1">
        <h2 className="text-sm font-medium text-zinc-400 mb-2">Sidebar</h2>
      </nav>
    </aside>
  );
}
