import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col-reverse overflow-y-scroll lg:flex-row">
      <Sidebar />
      <div className="w-full h-screen">{children}</div>
      <Profile />
    </main>
  );
}
