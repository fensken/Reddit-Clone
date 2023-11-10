"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { toast } from "@/hooks/use-toast";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

interface UserNameFormProps {
  user: Pick<User, "id" | "username">;
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = {
        name,
      };

      const { data } = await axios.patch("/api/username", payload);

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already exists.",
            description: "Please choose a different username.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "There was an error.",
        description: "Could not change the username.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Your username has been updated.",
        className: "bg-green-200",
      });

      return router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => updateUsername(e))}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>Please enter your custom username.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 grid w-8 h-10 place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>

            <Label className="sr-only" htmlFor="name">
              Username
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register("name")}
            />

            {errors?.name && (
              <div className="px-1 text-xs text-red-600">
                {errors.name.message}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" isLoading={isLoading}>
            Change name
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
