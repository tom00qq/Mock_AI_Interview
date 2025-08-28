import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dayjs from "dayjs";

const InterViewCard = ({
  interviewId,
  role,
  createdAt,
}: InterviewCardProps) => {
  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <div className="border-gradient rounded-2xl w-[360px] p-0.5 max-sm:w-full">
      <div className="dark-gradient rounded-2xl relative p-4 flex flex-col gap-4">
        {/* Cover Img */}
        <Image
          className="rounded-full object-fit size-[90px]"
          src="/covers/adobe.png"
          alt="brands"
          width={65}
          height={65}
        />
        {/* Interview */}
        <h3 className="mt-1 capitalize">{role}</h3>

        {/* Date */}
        <div className="flex gap-1">
          <Image src="/calendar.svg" alt="icon" width={18} height={18} />
          <span>{formattedDate}</span>
          {/* <Image
            className="ml-3"
            src="/star.svg"
            alt="icon"
            width={18}
            height={18}
          />
          <span>12/ 10</span> */}
        </div>

        {/* Feedback */}
        {/* <p>
          This interview does not reflect serious interest or engagement from
          the candidate. Their responses are dismissive, vague, or outright
          negative, making it more
        </p> */}

        <div className="flex justify-between mt-3">
          {/* <div className="flex gap-3">
            <div className="rounded-full bg-gray-500 w-10 flex justify-center items-center">
              <Image src="/react.svg" alt="icon" width={25} height={25} />
            </div>

            <div className="rounded-full bg-gray-500 w-10 flex justify-center items-center">
              <Image src="/tailwind.svg" alt="icon" width={25} height={25} />
            </div>
          </div> */}

          <Button className="btn-primary px-10 w-full" asChild>
            <Link href={`/interview/${interviewId}`}>View Interview</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterViewCard;
