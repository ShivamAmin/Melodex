import { buttonVariants } from '@/components/ui/button';
import Link from "next/link";

const Page = async () => {
    return (
        <div className="flex flex-col items-center justify-center grow p-4 h-screen">
            <h1 className="mb-4 text-3xl font-bold">
                Email Verified!
            </h1>
            <p className="mb-4 text-gray-600">
                Your email has been successfully verified.
            </p>
            <Link href='/' className={buttonVariants()}>Proceed</Link>
        </div>
    )
}
export default Page;
