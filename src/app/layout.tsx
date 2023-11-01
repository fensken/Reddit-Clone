import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
	title: "Breadit",
	description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cn(
				"bg-white text-slate-900 antialiased light",
				inter.className
			)}
		>
			<body className="pt-12 antialiased m-h-screen bg-slate-50">
				 {/* @ts-expect-error Server Component */}
				<Navbar />

				<div className="container h-full pt-12 mx-auto max-w-7xl">
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	);
}
