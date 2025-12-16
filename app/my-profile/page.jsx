import React from "react";

export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/userAction";
import Link from "next/link";
import { ExternalLink, Link as LinkIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

async function MyProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-muted-foreground">
          Please sign in to view your profile
        </p>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-xl mx-auto border-none shadow-none bg-transparent mt-8">
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
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href={`/profile/${user.username}`}>
              View Public Profile <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>

        {/* Links */}
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="font-semibold text-lg">My Links</h3>
            <Button asChild variant="ghost" size="sm" className="h-8">
              <Link href="/CreateForm">Manage Links</Link>
            </Button>
          </div>
          {user.links.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-xl">
              <p className="text-sm text-muted-foreground mb-4">
                No links added yet
              </p>
              <Button asChild>
                <Link href="/CreateForm">Add your first link</Link>
              </Button>
            </div>
          ) : (
            user.links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <LinkIcon className="h-4 w-4" />
                    </div>

                    <span className="truncate font-medium">{link.title}</span>
                  </div>

                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
