import React, { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { RiGpsFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

import { HiBellAlert } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaRegIdCard } from 'react-icons/fa';
import { BsFillChatDotsFill, BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineAppRegistration } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { Link, useLocation } from 'react-router-dom'; 
import { IoMdArrowDropdownCircle } from "react-icons/io"; 

import { BsThreeDotsVertical } from "react-icons/bs";


import './navigation.css';
export default function Navigation({ path, title }) {
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const location = useLocation();

    const getColor = () => {
        return '#00cc44'
    }
    const getColor2 = () => {
        return 'white'
    }

    const [popup3, setPop3] = useState(false);
    const handleClickopen3 = () => {
        setPop3(!popup3);
        setState(false);
    }
    const [state, setState] = useState(false);
    const [action, setAction] = useState(true);
    const [toggles, setToggle] = useState("All_navigation");
    const showMenu = () => {
        setToggle("All_navigation active");
        setAction(!action)
    }
    const hideMenu = () => {
        setAction(!action)
    }
    return (
        <>
            <div>
                <div className={toggles}>
                    <ul>                       
                    <li>
                            <Link to="/home" style={path == "/home" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Dashboard"><FaHome size="1.7rem" ></FaHome></p>
                            </Link>                        
                        </li>
                    <li>
                            <Link to="/projects" style={path == "/projects" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Projects"><AiOutlineFundProjectionScreen size="1.7rem" ></AiOutlineFundProjectionScreen></p>
                            </Link>                        
                        </li>
                    <li>
                            <Link to="/project" style={path == "/Project" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Project Registration"><MdOutlineAppRegistration size="1.7rem" ></MdOutlineAppRegistration></p>
                            </Link>                        
                        </li>
                      <li>
                            <Link to="/registration" style={path == "/registration" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Registration"><FaRegIdCard size="1.7rem" ></FaRegIdCard></p>
                            </Link>                      
                        </li>
                     
                    </ul>
                </div>
            </div>
            <div>
            </div>
        </>

    )
}