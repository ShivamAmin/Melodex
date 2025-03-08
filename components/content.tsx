import React from 'react'

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className={"flex flex-1 flex-col gap-4 p-4 pt-0"}>{children}</div>
    )
}

export default Content
