import { GeistSans } from "geist/font";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";

export const metadata = {
  title: "Threddit",
  description:
    "A Reddit clone named Threddit built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        GeistSans.className
      )}
    >
      <body className="pt-12 antialiased m-h-screen bg-slate-50">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}

          <div className="container h-full pt-12 mx-auto max-w-7xl">
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
