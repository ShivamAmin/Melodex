"use client";

//TODO: Internationalize

import {useState} from 'react'
import {useForm} from "react-hook-form";
import Link from "next/link";
import {z} from "zod";
import {loginSchema} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authClient} from "@/auth-client";
import {useRouter} from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loadingButton";

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const handleLogin = async (values: z.infer<typeof loginSchema>) => {
        await authClient.signIn.email({email: values.email, password: values.password}, {
            onRequest: () => {
                setLoading(true);
            },
            onSuccess: async () => {
                router.push("/");
                router.refresh();
            },
            onError: (ctx) => {
                console.error(ctx);
            }
        });
        setLoading(false);
    }
    return (
        <div className="grow flex items-center justify-center p-4 h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Login to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                            {['email', 'password'].map((field) => (
                                <FormField
                                    control={form.control}
                                    key={field}
                                    name={field as keyof z.infer<typeof loginSchema>}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <div className='flex'>
                                                <FormLabel>
                                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                                </FormLabel>
                                                {field === 'password' && (
                                                    <Link href='/signup' className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</Link>
                                                )}
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type={field === "password" ? "password" : "email"}
                                                    placeholder={`Enter your ${field}`}
                                                    {...fieldProps}
                                                    autoComplete={field === 'password' ? "current-password" : 'email'}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <LoadingButton loading={loading} type='submit'>Login</LoadingButton>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account? &nbsp;
                        <Link href="/signup" className="text-primary hover:underline">
                            Sign up!
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Page
