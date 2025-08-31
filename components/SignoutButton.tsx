"use client";
import { signOut } from "@/lib/actions/auth.action";

export default function SignOutButton() {
  return (
    <button
      className="text-white hover:cursor-pointer"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </button>
  );
}
