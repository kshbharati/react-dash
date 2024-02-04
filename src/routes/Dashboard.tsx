import {Outlet} from "react-router-dom";
import Sidebar from '../components/sidebar'
import { UserProvider, UserContextType } from "../context/UserContext";
import { useCookies } from "react-cookie";
import Login from "./Login";

export default function Dashboard(){

    const [cookies,setCookie] = useCookies(['accessToken']);
    const userContext = {loggedIn:false} as UserContextType;

    if(!cookies) userContext.loggedIn=false;


    return (
        <UserProvider value={userContext}>
            <div className="flex flex-row w-full rounded-tl overflow-hidden">
                <div className="sidebar basis-1/6 flex-col">
                    {userContext.loggedIn ? <Sidebar /> : <Login />}
                </div>

                {userContext.loggedIn && (
                    <div
                        id="main"
                        className="bg-zinc-200 main container basis-full max-w-full"
                    >
                        <Outlet />
                    </div>
                )}
            </div>
        </UserProvider>
    );
}

