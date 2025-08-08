import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "DocCollab",
  description: "Open source realtime doc collaboration application",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#FFFFFF",
  applicationName: "DocCollab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
