"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log(result);

    useEffect(() => {
      user && isNewUser();
    }, [user]);

    if (!result[0]) {
      await db.insertInto(Users).value({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
      return true;
    }
  };
  return <div>{children}</div>;
};

export default Provider;

// app/sign-in/[[...sign-in]]/page.jsx
