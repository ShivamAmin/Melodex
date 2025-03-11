import { ReactNode } from 'react'

function Content({ children }: { children: ReactNode }) {
    return (
        <div className={"flex flex-1 flex-col gap-4 p-4 pt-0 overflow-scroll"}>{children}</div>
    )
}

export default Content
