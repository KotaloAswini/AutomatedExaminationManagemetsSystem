import "../Style/Menubar.css"
import Home from "../Icons/Home"
import Arrow from "../Icons/Arrow"
import Calendar from "../Icons/Calendar"
import Eye from "../Icons/Eye"
import SettingIcon from "../Icons/Setting"

import { memo } from "react"
import { Link, useLocation } from "react-router-dom"

const menus = [
    {
        name: "Home",
        icon: <Home />,
        link: "/"
    },

    {
        name: "Exam Timetable",
        icon: <Calendar />,
        link: "/ExamTimetable",
        title: "Exam Timetable (Admin)"
    },
    {
        name: "View Timetable",
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

const Menubar = ({ onMenuToggleClick = () => { } }) => {
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
                <img src="/images/logo.png" alt="AEMS" className="full-title logo-img" />
                <p className="short-title">AEMS</p>
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
