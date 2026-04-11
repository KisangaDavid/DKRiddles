"use client";

import useSWR from "swr";
import ProfileCard from "./ProfileCard";
import TopBar from "../_common/TopBar";
import { fetcher } from "@/src/app/_common/utils";

function ProfilePage() {

  const { data: user } = useSWR("/auth/users/me", fetcher);


   return (
    <>
        <TopBar
          text="Profile"
          isPuzzlePage={false}
        />
      <ProfileCard user={user}/>
    
    </>
  );
}

export default ProfilePage;
