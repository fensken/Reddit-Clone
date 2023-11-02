import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToast = () => {
	const loginToast = () => {
		const { dismiss } = toast({
			title: "Login required.",
			description: "Please log in to proceed.",
			variant: "destructive",
			action: (
				<Link
					href="/sign-in"
					onClick={() => dismiss()}
					className={buttonVariants({ variant: "outline" })}
				>
					Log In
				</Link>
			),
		});
	};

	return { loginToast };
};
