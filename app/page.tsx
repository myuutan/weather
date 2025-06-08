import Image from "next/image";

import Weather from "@/components/weather"; 

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className = "absolute top-4 left-4">
        <Image
          className=""
          src="/weather-app-icon.svg"
          alt="logo"
          width={128}
          height={128}
          priority
        />
        </div>
        <Weather />
      </main>
    </div>
  );
}
