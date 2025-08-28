import React from "react";
import Image from "next/image";
import Agent from "@/components/Agent";

const Interview = () => {
  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* title */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full object-fit size-[30px]"
            src="/covers/adobe.png"
            alt="ai"
            width={30}
            height={30}
          />
          <h2>Frontend Developer Interview</h2>
        </div>
      </div>
      <Agent userName="test" type="generate" />
    </div>
  );
};

export default Interview;
