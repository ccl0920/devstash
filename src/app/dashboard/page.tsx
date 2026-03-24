import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { MainContent } from "@/components/dashboard/main-content";

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <MainContent />
      </div>
    </>
  );
}
