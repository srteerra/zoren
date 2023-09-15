import Nav from "@/components/Nav";
import { Profile } from "@/components/Profile";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Profile />
      <div className="w-[80%] my-10 px-32">
        <Nav />
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-12">
          {/* Balance card */}
          <div className="bg-secondary p-14 rounded-3xl text-light">
            <p className="text-lg">Your balance</p>
            <p className="text-5xl font-extrabold py-2">34 SOL</p>
            <p className="text-lg">
              <span>=</span> $642.63 USD
            </p>
          </div>
          {/* Reminder card */}
          <div className="bg-secondary p-14 rounded-3xl text-light">
            <div>
              <p className="text-5xl">
                Hi, <span className="font-bold">Terra</span>
              </p>
              <p className="text-xl pt-2 font-light">
                Welcome to your dashboard
              </p>
            </div>
            <div className="pt-12">
              <Link href="/" className="text-xl font-light underline">
                Explore more
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Sidebar /> */}
    </main>
  );
}
