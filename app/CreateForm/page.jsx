import React from 'react'
import AddLink from '@/components/addLink'
import ShowLink from '@/components/showLink'
import { Separator } from "@/components/ui/separator"

export const dynamic = 'force-dynamic'

async function CreateForm() {
    return (
        <div className="min-h-screen w-full px-4 py-12 md:py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
                        Link Dashboard
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                        Manage your links and customize your public profile content from one place.
                    </p>
                </div>

                {/* Add Link Section */}
                <div className="relative z-10 w-full max-w-md mx-auto">
                    <AddLink />
                </div>

                <Separator className="my-8 opacity-50" />

                {/* Show Links Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Your Active Links
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            Manage your visibility
                        </span>
                    </div>
                    <ShowLink />
                </div>

            </div>
        </div>
    )
}

export default CreateForm