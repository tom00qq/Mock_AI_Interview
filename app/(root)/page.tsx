import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <section className="flex justify-between items-center px-16 py-6 max-sm:p-4 blue-gradient-dark rounded-3xl">
        <div className="flex flex-col max-w-lg gap-6">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p>Practice real interview questions & get instant feedback.</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          className="max-sm:hidden"
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
        />
      </section>
    </>
  );
};
export default Page;
