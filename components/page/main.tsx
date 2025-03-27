import { ReactNode } from 'react'

function Main({ children }: { children: ReactNode[] }) {
    return (
        <div className={'flex flex-col h-screen'}>
            {children}
        </div>
    )
}

export default Main
