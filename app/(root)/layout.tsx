import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-12 max-w-7xl mx-auto my-12 px-16 max-sm:px-4 max-sm:my-8">
      <nav>
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Image src="logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
