"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UserAvatarProps {
  name: string | null | undefined;
  image: string | null | undefined;
}

const UserAvatar = ({ name, image }: UserAvatarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Button variant="ghost" className="py-0 w-full" onClick={() => signOut()}>
          SignOut
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
