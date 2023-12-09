"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar flex h-full flex-col gap-6 pt-6">
      {sidebarLinks.map((item, index) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose key={index} asChild>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
function MobileNav() {
  return (
    <div className=" ">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/assets/icons/hamburger.svg"}
            alt="menu"
            height={36}
            width={36}
            className="invert-colors sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200  border-none"
        >
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/assets/images/site-logo.png"}
              width={23}
              height={23}
              alt="dev flow"
            />
            <p className="h2-bold text-dark100_light900 font-spaceGrotesk ">
              Dev <span className="text-primary-500">Flow</span>
            </p>
          </Link>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
            <SignedOut>
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Link href={"/sign-in"}>
                    <Button className="small-medium btn-secondary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient">Login</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={"/sign-up"}>
                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                      Signup
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
