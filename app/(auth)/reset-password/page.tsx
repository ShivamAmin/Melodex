import { Suspense } from 'react'
import ResetPassword from './resetPassword'

const Page = ({searchParams}: {searchParams: Promise<{ error?: string, token?: string }>}) => {
    return(
        <Suspense fallback={<>...</>}>
            <ResetPassword searchParams={searchParams} />
        </Suspense>
    )
}
export default Page
