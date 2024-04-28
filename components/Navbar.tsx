import { auth } from "@clerk/nextjs/server";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="py-2 border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <StoreSwitcher items={stores} />
        <MainNav className="" />
      </div>
    </div>
  );
};

export default Navbar;
