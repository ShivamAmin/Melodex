"use client"

import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/loadingButton';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/lib/zod";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("error") ?? searchParams.get("token");
    // const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const handleResetPassword = async (data: z.infer<typeof resetPasswordSchema>) => {
        await authClient.resetPassword({
            newPassword: data.password,
        }, {
            onRequest: () => {
                setLoading(true);
            },
            onError: (ctx) => {
                toast.error('Uh oh!', {
                    description: ctx.error.message,
                });
            },
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Password reset successfully'
                });
                router.push('/sign-in');
            },
            onResponse: () => {
                setLoading(false);
            },
        });
    }

    if (!token || token === 'INVALID_TOKEN') {
        return (
            <div className='w-full flex items-center justify-center p-4 h-screen'>
                <Card className='w-full max-w-mid'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-bold text-center text-gray-800'>
                            Invalid Reset Link
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <p className='text-center text-gray-600'>
                                This password reset link is invalid, or has expired.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="grow flex items-center justify-center p-4 h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Reset Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleResetPassword)} className='space-y-6'>
                            {['password', 'confirmPassword'].map((field) => (
                                <FormField
                                    control={form.control}
                                    key={field}
                                    name={field as keyof z.infer<typeof resetPasswordSchema>}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {field !== 'confirmPassword' ? field.charAt(0).toUpperCase() + field.slice(1) : 'Confirm Password'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                                                    placeholder={`Enter your new ${field !== 'confirmPassword' ? field : 'password again'}`}
                                                    {...fieldProps}
                                                    autoComplete='off'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <LoadingButton loading={loading} type='submit'>Reset Password</LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
export default Page
