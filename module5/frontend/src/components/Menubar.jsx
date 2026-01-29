import "../Style/Menubar.css"
import Dashboard from "../Icons/Dashboard"
import Arrow from "../Icons/Arrow"
import Calendar from "../Icons/Calendar"
import Eye from "../Icons/Eye"
import SettingIcon from "../Icons/Setting"
import Exchange from "../Icons/Exchange"

import { memo } from "react"
import { Link, useLocation } from "react-router-dom"

const menus = [
    {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/"
    },
    {
        name: "Create DES Form",
        icon: <Exchange />,
        link: "/form",
        title: "Create DES Form"
    },
    {
        name: "View DES form",
        icon: <Eye />,
        link: "/preview",
        title: "View DES form"
    },
    {
        name: "Settings",
        icon: <SettingIcon />,
        link: "/Settings"
    }
]

const Menubar = ({ onMenuToggleClick = () => { } }) => {
    const route = useLocation()

    function toggleMenubar() {
        let activeApp = document.querySelector(".app.active");
        let app = document.querySelector(".app");
        // Logic to toggle class on a parent container. 
        // Note: usage of 'app' class implies App component has this class.
        // We will need to ensure App.js has this structure.
        if (activeApp) {
            activeApp.classList.remove("active");
            // Also notify alias if needed
        } else if (app) {
            app.classList.add("active");
        }
    }

    return (
        <nav className="menubar-container">
            <Arrow arrowIconClickHandler={e => {
                toggleMenubar();
                onMenuToggleClick(e);
            }} className={"toggle-menubar-icon"} />
            <Link to="/" className="title" style={{ textDecoration: "none" }}>
                <p className="full-title">Duty Exchange<br />System</p>
                <p className="short-title">DES</p>
            </Link>
            <ul className="menus-container">
                {menus.map((menu) => (
                    <Link to={menu.link} title={typeof menu.name == "string" ? menu.name : menu.title} className="menu-container" id={route.pathname === menu.link ? "active" : ""} key={menu.link}>
                        {menu.icon}
                        <li>{menu.name}</li>
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default memo(Menubar)
