"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/loadingButton';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { toast } from "sonner"
import { forgotPasswordSchema } from "@/lib/zod";
import Link from "next/link";


const Page = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleForgotPassword = async (data: z.infer<typeof forgotPasswordSchema>) => {
        await authClient.requestPasswordReset({
            email: data.email,
            redirectTo: '/reset-password',
        }, {
            onResponse: () => {
                setLoading(false);
            },
            onRequest: () => {
                setLoading(true);
            },
            onError: (ctx) => {
                toast.error('Uh oh!', {
                    description: ctx.error.message,
                })
            },
            onSuccess: () => {
                toast.success('Success', {
                    description: 'If an account exists with this email, you will receive a password reset link.'
                })
            },
        });
    }

    return (
        <div className="grow flex items-center justify-center p-4 h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Forgot Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='Enter your email'
                                                {...field}
                                                autoComplete='email'
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <LoadingButton loading={loading} type='submit'>Send Reset Link</LoadingButton>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Remember your password? &nbsp;
                        <Link href="/sign-in" className="text-primary hover:underline">
                            Sign in!
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Page
