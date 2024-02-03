import { Link, Outlet} from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";

export default function Dashboard(){
    return (
        <>
            <div className="flex flex-row">
                <div className="sidebar basis-1/4 flex-col bg-zinc-400 shadow-2xl rounded border-sky-400">
                    <div className="top profile p-2 bg-zinc-300 shadow-md">
                        <Link to={"profile"}>
                            <div className="rounded-full overflow-hidden drop-shadow-md size-20 border-zinc-600 shadow-inner hover:drop-shadow-xl hover:ease-in duration-300 ">
                                <img
                                    className="size-auto"
                                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.uH43wAPu2HCBW7RTvJzbWwHaHY%26pid%3DApi&f=1&ipt=1bee0795cd9b07645bbf5383f58094b6843d2621b89486c02d00e663a33d7bbc&ipo=images"
                                    alt="None"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className=" navigation shadow-inner">
                        <nav className="flex flex-col">
                            {[
                                ["Home", "home"],
                                ["Users", "users"],
                            ].map(([title, url]) => (
                                <Link
                                    to={url}
                                    className="text-center px-3 py-2 text-slate-700 font-medium hover:bg-zinc-500 hover:text-slate-900 hover:ease-in duration-300"
                                >
                                    {title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="container bottom action-center flex flex-row bg-zinc-300 p-2">
                        <ul className="basis-1/2 object-left">
                            <li>
                                <IoSettingsSharp />
                            </li>
                        </ul>
                        <ul className="basis-1/2 object-right">
                            <li>
                                <GrLogout />
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="main" className="bg-zinc-200 main container basis-3/4">
                    <Outlet />
                </div>
            </div>
        </>
    );
}