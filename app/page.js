import { syncUser } from "@/lib/syncUser";
import { ArrowRight, Star, Heart, Coffee } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"; // Import SignInButton and SignUpButton
import Link from "next/link"; // Import Link for internal navigation


export default async function Home() {
  await syncUser();
  const user = await currentUser();
  console.log(user)

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-full flex items-center justify-center">
            <span className="font-bold text-lg text-white">L</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Linktree</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            // If user is logged in, show a dashboard button
            <UserButton />
          ) : (
            // If user is not logged in, show Sign In and Sign Up buttons
            <>
              <SignInButton mode="modal">
                <SignInButton className="hidden sm:block font-medium hover:opacity-70 transition-opacity">
                  Log in
                </SignInButton>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-md">
                  Sign up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-6 py-20 sm:py-32 w-full max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground bg-accent/50 py-1.5 px-4 rounded-full w-fit mx-auto mb-4 border border-border/50">
            <Star className="size-4 text-primary fill-primary" />
            <span>Loved by 100,000+ creators</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Get paid by your{" "}
            <span className="underline decoration-primary decoration-wavy decoration-from-font underline-offset-4">
              fans.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Accept donations. Start a membership. Sell anything. It’s easier
            than you think.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/CreateForm">
              <button className="bg-primary text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all active:translate-y-0 w-full sm:w-auto flex items-center justify-center gap-2 group">
                <Coffee className="size-5 group-hover:rotate-12 transition-transform" />
                Start my page
              </button>
            </Link>
            <button className="bg-white border-2 border-border text-foreground text-lg font-bold px-10 py-3.5 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:w-auto">
              It's free
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          {[
            {
              icon: Heart,
              title: "Donations",
              description: "Give your audience an easy way to say thanks.",
              color: "bg-red-100 text-red-600",
            },
            {
              icon: Star,
              title: "Membership",
              description: "Turn your followers into monthly members.",
              color: "bg-primary/20 text-yellow-700",
            },
            {
              icon: Coffee,
              title: "Shop",
              description: "Sell digital or physical goods in seconds.",
              color: "bg-blue-100 text-blue-600",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-secondary/30 border border-border rounded-2xl p-8 flex flex-col items-start text-left hover:border-gray-300 transition-colors group cursor-default"
            >
              <div
                className={`p-4 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} haha. All rights reserved.</p>
      </footer>
    </div>
  );
}