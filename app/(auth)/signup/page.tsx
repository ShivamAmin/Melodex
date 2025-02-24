"use client"

//TODO: Internationalize

import {useState} from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from '@/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loadingButton";



const Page = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.name,
        }, {
            onRequest: () => {
                setLoading(true);
            },
            onSuccess: () => {
                console.log('Successfully registered');
            },
            onError: (ctx) => {
                console.error(ctx);
            }
        })
        setLoading(false);
    }
    return (
        <div className="grow flex items-center justify-center p-4 h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Create your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                                <FormField
                                    control={form.control}
                                    key={field}
                                    name={field as keyof z.infer<typeof signUpSchema>}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {field !== 'confirmPassword' ? field.charAt(0).toUpperCase() + field.slice(1) : 'Confirm your password'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        field.toLowerCase().includes('password')
                                                            ? 'password'
                                                            : field === 'email'
                                                                ? 'email' : 'text'
                                                    }
                                                    placeholder={`Enter your ${field !== 'confirmPassword' ? field : 'password again'}`}
                                                    {...fieldProps}
                                                    autoComplete='off'
                                                    />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <LoadingButton loading={loading} type='submit'>Sign up</LoadingButton>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        <Link href="/login" className="text-primary hover:underline">
                            Already have an account?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Page;