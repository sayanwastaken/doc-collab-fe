"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

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

export default function WhiteboardRoom() {
  const { roomId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [acMenuOpen, setAcMenuOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [whiteboardText, setWhiteboardText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<SocketIOProvider | null>(null);
  const yTitleRef = useRef<Y.Text | null>(null);
  const yTextRef = useRef<Y.Text | null>(null);

  useEffect(() => {
    if (!roomId) return;
    // Setup Yjs doc and provider
    const ydoc = new Y.Doc();

    const room = Array.isArray(roomId) ? roomId[0] : roomId;

    const provider = new SocketIOProvider(
      process.env.NEXT_PUBLIC_WSS_URL || "http://localhost:4050",
      room,
      ydoc,
      {}
    );

    ydocRef.current = ydoc;
    providerRef.current = provider;
    // Shared Yjs text and title
    const yTitle = ydoc.getText("title");
    const yText = ydoc.getText("whiteboardText");
    yTitleRef.current = yTitle;
    yTextRef.current = yText;
    // Sync local state with Yjs
    setTitle(yTitle.toString());
    setWhiteboardText(yText.toString());
    const titleObserver = () => setTitle(yTitle.toString());
    const textObserver = () => setWhiteboardText(yText.toString());
    yTitle.observe(titleObserver);
    yText.observe(textObserver);
    // Cleanup
    return () => {
      yTitle.unobserve(titleObserver);
      yText.unobserve(textObserver);
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [whiteboardText]);

  // Update Yjs on local change
  const handleTitleChange = (e: { target: { value: string; }; }) => {
    yTitleRef.current?.delete(0, yTitleRef.current.length);
    yTitleRef.current?.insert(0, e.target.value);
  };
  const handleTextChange = (e: { target: { value: string; }; }) => {
    yTextRef.current?.delete(0, yTextRef.current.length);
    yTextRef.current?.insert(0, e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-200 bg-white border-r border-gray-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center px-4  justify-between">
          {sidebarOpen && <span className="text-xl font-bold">DocCollab</span>}
          <button
            className="p-2 rounded hover:bg-gray-100 mr-2"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-6 space-y-2 text-gray-700">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <span className="material-icons">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-300">
          <h2 className="text-3xl font-bold mb-2 bg-transparent placeholder-black border-none outline-none ">
            {title || "Untitled Document"}
          </h2>
          <button
            className="p-2 rounded-4xl hover:bg-gray-100 mr-2"
            onClick={() => setAcMenuOpen((open) => !open)}
            aria-label="Toggle sidebar"
          >
            <AccountCircleOutlinedIcon />
          </button>
        </header>

        {/* Whiteboard Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Center Whiteboard */}
          <section className="flex-3 flex flex-col items-center justify-start py-12 overflow-y-auto">
            {/* Whiteboard typing area */}
            <div className="bg-white rounded-xl shadow p-10 w-[1000px] min-h-[500px] flex flex-col">
              <input
                className="text-3xl font-bold mb-2 bg-transparent placeholder-black border-none outline-none w-full"
                value={title}
                onChange={handleTitleChange}
                placeholder="Untitled Document"
                spellCheck={true}
                aria-label="Document title"
              />
              <textarea
                ref={textareaRef}
                className="w-full border-none outline-none resize-none text-lg bg-transparent placeholder-gray-400 overflow-y-auto no-scrollbar"
                placeholder="Start typing to collaborate in real-time…"
                value={whiteboardText}
                onChange={handleTextChange}
                spellCheck={true}
                autoFocus
                rows={1}
                style={{ minHeight: "400px" }}
              />
            </div>
          </section>

          {/* Right Sidebar */}
          <aside
            className={`transition-all duration-200 ${
              acMenuOpen ? "w-50" : "w-24"
            } bg-white border-l border-gray-300 flex flex-col p-6`}
          >
            {acMenuOpen ? (
              <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
                Share
              </button>
            ) : (
              ""
            )}
            <div className="mb-6">
              {acMenuOpen ? (
                <div className="font-semibold mb-2">People with access</div>
              ) : (
                ""
              )}
              <ul className="space-y-2">
                {people.map((person) => (
                  <li key={person.name} className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                      {person.initials}
                    </div>

                    {acMenuOpen ? <span>{person.name}</span> : ""}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
