import { Outlet } from "react-router-dom";
import { Nav } from './Components/Nav'

export function Layout() {
    return (
        <>
            <Nav />
            <main>
                <div className="main">
                    <Outlet />
                </div>
            </main>
        </>
    )
}