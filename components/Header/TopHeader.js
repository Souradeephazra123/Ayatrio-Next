import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopHeader = () => {
  const pathname = usePathname();
  const homeRoute = "/home";
  return (
    <div>
      <div
        className={`bg-zinc-100 h-[30px] ${
          homeRoute === pathname ? "fixed" : ""
        } z-[99999] w-full flex justify-between`}
      >
        <div className="pt-1 pb-1 pl-[37.5px]">
          <Image
            src="/logo/favicon-32x32.png"
            height={20}
            width={20}
            alt="logo"
          />
        </div>
        <div>
          <div className="flex flex-row gap-2 p-[5px] text-black  text-[12px] pr-5 ">
            <div className="pr-3 border-r border-black underline-offset-1   tracki">
              <Link href="category/designservice">Free Design Request</Link>
            </div>
            <div className="pr-3 border-r border-black underline-offset-1">
              <Link href="category/freesample">Free Sample Request</Link>
            </div>
            <div>
              <Link href="/login">Join Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
