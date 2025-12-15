import React from 'react'
import { getLinks } from '@/actions/userAction'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

async function ShowLink() {
    const links = await getLinks()

    if (!links || links.length === 0) {
        return (
            <div className="text-center p-8 text-muted-foreground bg-muted/30 rounded-lg mt-8 border border-dashed">
                <p>No links added yet. Start by adding one above!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl mx-auto mt-8">
            {links.map((link) => (
                <Card key={link.id} className="group hover:shadow-lg transition-all duration-300 border-none bg-white/50 backdrop-blur-sm dark:bg-black/50 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full flex-shrink-0">
                                <LinkIcon className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                            </div>
                            <span className="truncate">{link.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground truncate mb-4 pl-[44px]">
                            {link.url}
                        </p>
                        <div className="pl-[44px]">
                            <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-200 transition-colors">
                                <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    Visit Link <ExternalLink className="h-3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ShowLink