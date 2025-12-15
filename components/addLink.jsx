'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createLink } from '@/actions/userAction'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    url: z.string().url('Please enter a valid URL').min(1, 'URL is required'),
})

const AddLink = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (data) => {
        try {
            await createLink(data)
            form.reset()
        } catch (error) {
            console.error('Failed to create link:', error)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-none shadow-lg bg-white/50 backdrop-blur-sm dark:bg-black/50">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Add New Link
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="My Portfolio"
                                            className="bg-background/50 border-gray-200 focus:border-purple-500 transition-colors"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://example.com"
                                            className="bg-background/50 border-gray-200 focus:border-purple-500 transition-colors"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                'Adding...'
                            ) : (
                                <>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Link
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddLink