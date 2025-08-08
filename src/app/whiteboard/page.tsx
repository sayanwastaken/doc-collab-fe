"use client";
import React, { useState, useRef, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { useRouter } from "next/navigation";

const people = [
  { name: "John Doe", initials: "J" },
  { name: "Sarah Smith", initials: "S" },
  { name: "Mike Johnson", initials: "M" },
];

const navItems = [
  { icon: <DescriptionOutlinedIcon />, label: "My Documents" },
  { icon: <StarBorderOutlinedIcon />, label: "Starred" },
  { icon: <FolderSharedOutlinedIcon />, label: "Shared with me" },
  { icon: <DeleteOutlinedIcon />, label: "Trash" },
];

export default function Whiteboard() {
  const [sidebarOpen, setSidebarOpen] = useState<Boolean>(true);
  const [acMenuOpen, setAcMenuOpen] = useState<Boolean>(true);
  const [whiteboardText, setWhiteboardText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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
