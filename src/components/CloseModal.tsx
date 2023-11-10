"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "./ui/Button";

const CloseModal: FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="subtle"
      aria-label="close modal"
      onClick={() => router.back()}
      className="w-8 h-8 p-0 rounded-md"
    >
      <X className="w-4 h-4" />
    </Button>
  );
};

export default CloseModal;
