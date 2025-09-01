"use client";
import { useContext, useEffect } from "react";
import SubminToekn from "./SubmitToken"
import TokenSubmission from "../modals/TokenSubmission";
import UserContext from "@/context/UserContext";

export default function CreateToken() {
  const { setIsLoading, submitModalState } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [])

  return (
    <div className="w-full h-full">
      <SubminToekn />
      {submitModalState && <TokenSubmission />}
    </div >
  );
}
