"use client";
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation";


export default function Whiteboard() {
  const [whiteboardText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [whiteboardText]);

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null;
}
