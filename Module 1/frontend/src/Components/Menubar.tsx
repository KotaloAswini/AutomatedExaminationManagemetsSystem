import "../Style/Menubar.css"
import Dashboard from "../Icons/Dashboard"
import Arrow from "../Icons/Arrow"
import Calendar from "../Icons/Calendar"
import Eye from "../Icons/Eye"
import SettingIcon from "../Icons/Setting"

import React, { memo, ReactNode, JSX } from "react"
import { Link, useLocation } from "react-router-dom"

interface MenubarProps {
    onMenuToggleClick?: (e: React.MouseEvent<HTMLOrSVGElement>) => void
}

const menus: { name: string | JSX.Element, icon: ReactNode, link: string, title?: string }[] = [
    {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/"
    },

    {
        name: <span>Exam<br />Timetable</span>,
        icon: <Calendar />,
        link: "/ExamTimetable",
        title: "Exam Timetable (Admin)"
    },
    {
        name: <span>View<br />Timetable</span>,
        icon: <Eye />,
        link: "/ViewTimetable",
        title: "View Published Timetable"
    },
    {
        name: "Settings",
        icon: <SettingIcon />,
        link: "/Settings"
    }
]

const Menubar: React.FC<MenubarProps> = ({ onMenuToggleClick = () => { } }) => {
    const route = useLocation()

    function toggleMenubar() {
        let activeApp = document.querySelector(".app.active");
        let app = document.querySelector(".app")
        if (activeApp)
            activeApp.classList.remove("active");
        else if (app)
            app.classList.add("active");
    }

    return (
        <nav className="menubar-container">
            <Arrow arrowIconClickHandler={e => {
                toggleMenubar();
                onMenuToggleClick(e);
            }} className={"toggle-menubar-icon"} />
            <Link to="/" className="title" style={{ textDecoration: "none" }}>
                <p className="full-title">Timetable<br />Generation</p>
                <p className="short-title">AEMS</p>
            </Link>
            <ul className="menus-container">
                {menus.map((menu) => (
                    <Link to={menu.link} title={typeof menu.name == "string" ? menu.name : menu.title} className="menu-container" id={route.pathname === menu.link ? "active" : ""} key={menu.name as string}>
                        {menu.icon}
                        <li>{menu.name}</li>
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default memo(Menubar)