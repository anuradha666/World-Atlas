import { Outlet } from "react-router-dom"
import { Footers } from "../ui/Footers"
import { Headers } from "../ui/Headers"

export const AppLayout = () => {
    return (
        <>
            <Headers />
            <Outlet />
            <Footers />
        </>
    )
}