import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <Sidebar />
      <div className="w-full h-screen overfloy-y-scroll">{children}</div>
      <Profile />
    </main>
  );
}
