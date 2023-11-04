"use client";

import { startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface SubscribeLeaveToggleProps {
	isSubscribed: boolean;
	subredditId: string;
	subredditName: string;
}

const SubscribeLeaveToggle = ({
	isSubscribed,
	subredditId,
	subredditName,
}: SubscribeLeaveToggleProps) => {
	const router = useRouter();
	const { toast } = useToast();
	const { loginToast } = useCustomToast();

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId,
			};

			const { data } = await axios.post("/api/subreddit/subscribe", payload);
			console.log(data);

			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: "There was a problem.",
				description: "Something went wrong, please try again.",
				variant: "destructive",
			});
		},
		onSuccess: (data) => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: `Subscribed.`,
				description: `You are now subscribed to r/${subredditName}.`,
				variant: "default",
				className: "bg-green-200",
			});
		},
	});

	const { mutate: unsubscribe, isLoading: isUnSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId,
			};

			const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
			console.log(data);

			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: "There was a problem.",
				description: "Something went wrong, please try again.",
				variant: "destructive",
			});
		},
		onSuccess: (data) => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: `Unsubscribed.`,
				description: `You are now unsubscribed to r/${subredditName}.`,
				variant: "default",
			});
		},
	});

	return isSubscribed ? (
		<Button
			isLoading={isUnSubLoading}
			onClick={() => unsubscribe()}
			className="w-full mt-1 mb-4"
		>
			Leave community
		</Button>
	) : (
		<Button
			isLoading={isSubLoading}
			onClick={() => subscribe()}
			className="w-full mt-1 mb-4"
		>
			Join to post
		</Button>
	);
};

export default SubscribeLeaveToggle;
