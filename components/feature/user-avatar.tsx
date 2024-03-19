"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

interface UserAvatarProps {
  name: string | null | undefined;
  image: string | null | undefined;
}

const UserAvatar = ({ name, image }: UserAvatarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col relative">
    <Avatar onClick={() => setOpen(!open)}>
      {image && <AvatarImage src={image} />}
      <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
    </Avatar>
    {open && (
        <div>
            {/* TODO Profile card */}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
