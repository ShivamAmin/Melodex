"use client";

//TODO: Internationalize

import {useState} from 'react'
import {useForm} from "react-hook-form";
import Link from "next/link";
import {z} from "zod";
import {signInSchema} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authClient} from "@/auth-client";
import {useRouter} from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loadingButton";
import { toast } from "sonner"

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
        await authClient.signIn.email({email: values.email, password: values.password}, {
            onRequest: () => {
                setLoading(true);
            },
            onSuccess: async () => {
                router.push("/");
                router.refresh();
            },
            onError: (ctx) => {
                toast.error('Uh oh!', {description: ctx.error.message});
            },
            onResponse: () => {
                setLoading(false);
            },
        });
    }
    return (
        <div className="grow flex items-center justify-center p-4 h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-6">
                            {['email', 'password'].map((field) => (
                                <FormField
                                    control={form.control}
                                    key={field}
                                    name={field as keyof z.infer<typeof signInSchema>}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <div className='flex'>
                                                <FormLabel>
                                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                                </FormLabel>
                                                {field === 'password' && (
                                                    <Link href='/forgot-password' className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</Link>
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
                            <LoadingButton loading={loading} type='submit'>Sign In</LoadingButton>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&lsquo;t have an account? &nbsp;
                        <Link href="/sign-up" className="text-primary hover:underline">
                            Sign up!
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Page
