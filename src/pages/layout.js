"use client";
import { usePathname } from "next/navigation";
import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }) {
  const route = usePathname();
  const limits = ["/", "/how", "/about"];
  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <Sidebar />
      <div
        className={
          limits.includes(route)
            ? "w-full h-screen"
            : "w-full lg:w-2/3 xl:w-3/4 h-screen"
        }
      >
        {children}
      </div>
      <Profile />
    </main>
  );
}
