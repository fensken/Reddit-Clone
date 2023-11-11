import { FC } from "react";
import { User } from "next-auth";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User as FallbackUser } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/Avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}
const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <FallbackUser className="w-6 h-6 text-zinc-300" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
