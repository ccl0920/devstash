export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-screen bg-zinc-950 text-white">{children}</div>;
}
