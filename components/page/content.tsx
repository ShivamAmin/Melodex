import { ReactNode } from 'react'

function Content({ children }: { children: ReactNode }) {
    return (
        <div className={"p-4 pt-0 overflow-scroll"}>{children}</div>
    )
}

export default Content
