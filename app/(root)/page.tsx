import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InterViewCard from "@/components/InterViewCard";
import {
  getCurrentUser,
  getInterviewsById,
  getLatestInterviews,
} from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  const [latestInterviews, interviews] = await Promise.all([
    await getLatestInterviews({ userId: user?.id! }),
    await getInterviewsById(user?.id!),
  ]);

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
      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Latest Interviews</h2>

        <div className="flex flex-wrap gap-6 max-lg:flex-col">
          {latestInterviews.map((interview) => {
            return (
              <InterViewCard
                key={interview.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8 ">
        <h2>My Interviews</h2>

        <div className="flex flex-wrap gap-6 max-lg:flex-col">
          {interviews.map((interview) => {
            return (
              <InterViewCard
                key={interview.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Page;
