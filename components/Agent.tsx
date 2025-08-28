import React from "react";
import Image from "next/image";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName = "test" }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE;
  const messages = ["What yout name", "What yout name", "What yout name"];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      {/* Voice  */}
      <div className="flex flex-wrap gap-3 max-md:flex-col">
        {/* AI */}
        <div className="flex-1 border-1 rounded-2xl border-fuchsia-200 h-96 flex flex-col justify-center items-center gap-3 max-md:py-15">
          <Image
            className="rounded-full object-fit size-[150px]"
            src="/covers/adobe.png"
            alt="ai"
            width={540}
            height={540}
          />
          <p className="font-bold text-2xl">AI Interviewer</p>
        </div>

        {/* Interviewer */}
        <div className="flex-1 border-1 rounded-2xl border-fuchsia-200 h-96 flex flex-col justify-center items-center gap-3 max-md:hidden">
          <Image
            className="rounded-full object-fit size-[150px]"
            src="/user-avatar.png"
            alt="ai"
            width={540}
            height={540}
          />
          <p className="font-bold text-2xl">{userName}</p>
        </div>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div className="m-auto mt-3">
          <p>{lastMessage}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="title m-auto  space-x-4">
        {callStatus !== "ACTIVE" ? (
          <button className="btn-call">
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">
            <span>End</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
