import React from "react";
import ProfileCard from "@/components/ProfileCard";

async function ProfilePage({ params }) {
  const { username } = await params;
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-black p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl mt-8">
        <ProfileCard username={username} />
      </div>
    </div>
  );
}

export default ProfilePage;
