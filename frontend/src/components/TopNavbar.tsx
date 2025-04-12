import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineContactMail } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";

const TopNavbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();

    const navbar = [
        {
            id: 1,
            name: "Dashboard",
            icon: MdOutlineSpaceDashboard,
            path: "/",
        },
        {
            id: 2,
            name: "Organizations",
            icon: GoOrganization,
            path: "/organizations",
        },
        {
            id: 3,
            name: "Contacts",
            icon: MdOutlineContactMail,
            path: "/contacts",
        },
        {
            id: 4,
            name: "Reports",
            icon: HiOutlineDocumentReport,
            path: "/reports",
        },
    ];

    return (
        <div className="relative">
            {/* Gray overlay when navOpen */}
            {navOpen && (
                <div
                    className="fixBackaground"
                    onClick={() => setNavOpen(false)} // clicking outside closes menu
                ></div>
            )}

            {/* Navbar container */}
            <div className="min-md:flex gap-1 w-full shadow-md relative z-50">
                {/* Left Section */}
                <div className="flex items-center justify-between bg-[#191e38] relative px-6 py-4 md:w-56 md:shrink-0 md:justify-center">
                    <a href="/">
                        <svg viewBox="0 0 1185 266" xmlns="http://www.w3.org/2000/svg" className="fill-white" width="120" height="28"><path d="M77.463 265c-19.497 0-35.318-15.405-35.318-34.39v-22.054C17.987 202.676 0 181.326 0 155.948V55.206C0 25.291 24.946 1 55.668 1h154.664C241.054 1 266 25.29 266 55.206v100.806c0 29.916-24.946 54.206-55.668 54.206H145.67c-2.823 0-5.383 1.407-6.827 3.58-10.7 17.067-24.158 31.897-39.98 43.915-6.236 4.794-13.654 7.287-21.4 7.287zM55.701 27.336c-15.771 0-28.65 12.465-28.65 27.87v100.806c0 15.342 12.813 27.87 28.65 27.87 7.49 0 13.536 5.881 13.536 13.168v33.624c0 4.922 4.272 7.99 8.214 7.99 1.709 0 3.286-.575 4.732-1.662 13.273-10.1 24.576-22.565 33.578-36.947 6.309-10.036 17.743-16.237 29.965-16.237h64.727c15.77 0 28.65-12.464 28.65-27.87V55.206c0-15.341-12.814-27.87-28.65-27.87H55.7z"></path><path d="M395.752 2.4c37.152 0 65.088 27.936 65.088 64.8 0 36.576-27.936 64.8-65.088 64.8h-46.368v72H322.6V2.4h73.152zm0 104.544c22.176 0 38.592-16.992 38.592-39.744 0-23.04-16.416-39.744-38.592-39.744h-46.368v79.488h46.368zM502.6 33.792c-9.504 0-16.992-7.488-16.992-16.704 0-9.216 7.488-16.992 16.992-16.992 9.216 0 16.704 7.776 16.704 16.992 0 9.216-7.488 16.704-16.704 16.704zM489.928 204V60h25.056v144h-25.056zM625 56.256c33.696 0 55.872 22.464 55.872 59.328V204h-25.056v-86.976c0-23.616-13.536-36.864-35.712-36.864-23.04 0-41.76 13.536-41.76 47.52V204h-25.056V60h25.056v20.736C589 63.744 604.84 56.256 625 56.256zM835.24 60h24.768v137.952c0 44.928-36 67.392-73.44 67.392-32.256 0-56.448-12.384-68.256-35.136l21.888-12.384c6.624 13.536 18.72 24.192 46.944 24.192 29.952 0 48.096-16.992 48.096-44.064v-20.448c-11.52 17.568-29.952 28.8-54.144 28.8-40.896 0-73.44-33.12-73.44-75.168 0-41.76 32.544-74.88 73.44-74.88 24.192 0 42.624 10.944 54.144 28.512V60zm-51.264 122.4c29.088 0 51.264-22.176 51.264-51.264 0-28.8-22.176-50.976-51.264-50.976-29.088 0-51.264 22.176-51.264 50.976 0 29.088 22.176 51.264 51.264 51.264zM946.8 205.08c-28.21 0-45.63-20.8-41.08-48.88 4.42-27.17 26.91-46.28 53.56-46.28 19.37 0 31.59 9.36 38.35 22.36l-23.79 12.61c-3.25-5.85-9.1-9.49-16.9-9.49-12.35 0-23.14 9.23-25.35 22.1-2.08 11.83 4.29 22.1 17.16 22.1 8.06 0 13.91-4.03 18.59-10.14l21.58 13.65c-9.36 13.78-24.44 21.97-42.12 21.97zm126.36-59.93c-1.95 11.18-8.58 19.5-18.2 24.44l11.7 33.28h-26l-9.36-28.6h-8.32l-5.07 28.6h-26l16.12-91h36.4c18.33 0 32.24 13.65 28.73 33.28zm-43.42-9.36l-2.99 16.9h10.66c5.07.13 8.84-2.99 9.75-8.32.91-5.33-1.82-8.58-7.02-8.58h-10.4zM1184.05 112l-15.99 91h-26l7.67-43.81-25.48 33.54h-2.34l-14.82-35.23-7.93 45.5h-26l15.99-91h26l13.65 37.31 27.95-37.31h27.3z"></path></svg>
                    </a>
                    <button
                        type="button"
                        className="md:hidden cursor-pointer"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        {navOpen ? (
                            <IoCloseOutline className="text-white" size={30} />
                        ) : (
                            <IoMenu className="text-white" size={30} />
                        )}
                    </button>
                </div>

                {/* Top White Bar */}
                <div className="flex items-center justify-between bg-white text-sm text-black w-full px-3 h-16">
                    <h3>Corporation</h3>
                    <button type="button">John Dee</button>
                </div>
            </div>

            {/* Dropdown Menu */}
            {navOpen && (
                <nav className="navStyle">
                    {navbar.map((item) => (
                        <Link
                            to={item.path}
                            key={item.id}
                            onClick={() => setNavOpen(false)} // close on click
                            className={`flex items-center gap-3 px-4 py-2 hover:bg-[#1e2344] transition ${location.pathname === item.path ? "text-white" : "text-gray-300"
                                }`}
                        >
                            <item.icon className="text-lg" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
};

export default TopNavbar;
