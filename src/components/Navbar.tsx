import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "./ui/Button";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";
import { Icons } from "./Icons";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container flex items-center justify-between h-full gap-2 mx-auto max-w-7xl">
        {/* {logo} */}
        <Link href={"/"} className="flex items-center">
          <Icons.logo className="w-15 h-15" />

          <p className="hidden font-medium text-md text-zinc-700 md:block">
            Threddit
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={"/sign-in"} className={cn(buttonVariants(), "min-w-fit")}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
