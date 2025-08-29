"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { vapi } from "@/lib/vapi.sdk";
import { useRouter } from "next/navigation";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState("");

  // 初始化 vapi
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          {
            role: message.role,
            content: message.transcript,
          },
        ]);
      }
    };

    const onError = (error: Error) => {
      console.log("Error", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    if (callStatus === "FINISHED") {
      router.push("/");
    }
  }, [callStatus, messages]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
      variableValues: {
        username: userName,
        userid: userId,
      },
    });
  };

  const handleDisconnect = () => {
    vapi.stop();
  };

  const isInactiveOrFinished =
    callStatus === "INACTIVE" || callStatus === "FINISHED" ? true : false;

  return (
    <>
      {/* Voice  */}
      <div className="flex flex-wrap gap-3 max-md:flex-col">
        {/* AI */}
        <div
          className={`avatar flex-1 border-2 rounded-2xl h-96 flex flex-col justify-center items-center gap-3 max-md:py-15 blue-gradient-dark
    ${isSpeaking ? "border-fuchsia-200 animate-pulse" : "border-transparent"}`}
        >
          <Image
            className="rounded-full object-cover w-[150px] h-[150px]"
            src="/covers/adobe.png"
            alt="ai"
            width={540}
            height={540}
          />
          <p className="font-bold text-2xl">AI Interviewer</p>
        </div>

        {/* Interviewer */}
        <div className="avatar flex-1 border-1 rounded-2xl h-96 flex flex-col justify-center items-center gap-3 max-md:py-15 blue-gradient-dark">
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
          <button className="btn-call" onClick={handleCall}>
            <span>{isInactiveOrFinished ? "Call" : "..."}</span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            <span>End</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
