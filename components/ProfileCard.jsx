import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserByUsername } from "@/actions/userAction";
import Link from "next/link";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

async function ProfileCard({ username }) {
  const user = await getUserByUsername(username);

  if (!user) {
    return (
      <div className="text-center py-16 text-sm text-muted-foreground">
        User not found
      </div>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto bg-transparent border-none shadow-none">
      {/* Avatar + Name */}
      <CardHeader className="flex flex-col items-center gap-4 pb-10">
        <Avatar className="h-24 w-24 border border-black/20 dark:border-white/20">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
          />
          <AvatarFallback className="text-xl font-semibold">
            {(user.name || user.username)[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {user.name || user.username}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            @{user.username}
          </p>
        </div>
      </CardHeader>

      {/* Links */}
      <CardContent className="flex flex-col gap-4">
        {user.links.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No links added yet
          </p>
        ) : (
          user.links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex items-center justify-between rounded-xl border border-black/15 dark:border-white/15 px-5 py-4 transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
                    <LinkIcon className="h-4 w-4" />
                  </div>

                  <span className="truncate font-medium">
                    {link.title}
                  </span>
                </div>

                <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
