import React, { useState } from 'react'
import style from "../../styles/menu.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarCheck, } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faRulerCombined, faPersonMilitaryPointing, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery"
import { useMain } from '../App'
import logo from "../../assets/img/logo.png"
import { NavLink } from 'react-router-dom'

export default function Menu() {
  const [role, setRole] = useState(localStorage.getItem("ROLE"))
  const { setIsLogged } = useMain();
  const navigate = useNavigate();
  React.useEffect(() => {
    $(".loggout").on("click", function () {
      setIsLogged(false);
      localStorage.clear()
      navigate("/");
    })
  }, []);

  return (
    <nav className={style.menuSide} >
      <div className={style.logoDashBoard}>
        <img className='logoDashBoard' src={logo}></img>
      </div>
      {
        <ul className={style.menuContainer}>
          {!role.includes("ADMIN") ? "" : <>
            <NavLink to={"customers"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faPersonMilitaryPointing} /></span>Customers</NavLink>
          </>}
          <NavLink to={"workers"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faUsers} /></span>Employees</NavLink>
          <NavLink to={"appointments"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faCalendarCheck} /></span>Appointments</NavLink>
          {!role.includes("ADMIN") ? "" : <>
            <NavLink to={"products"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faProductHunt} /></span>Products</NavLink>
            <NavLink to={"services"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faRulerCombined} /></span>Services</NavLink>
            <NavLink to={"combos"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faRulerCombined} /></span>Combos</NavLink>
            <NavLink to={"locations"} className={({ isActive }) => `${style.menuItem} ${(isActive) ? style.active : ""}`}><span className={style.iconMenu}><FontAwesomeIcon icon={faLocationDot} /></span>Locations</NavLink>
          </>}
          <li className={`${style.menuItem} loggout`} typenode="function"><span className={style.iconMenu}><FontAwesomeIcon icon={faRightFromBracket} /></span>Log out</li>
          <li id='backToHome' style={{
            textAlign: "center"
          }}><Link to='/' style={{
            textDecoration: "none",
            
          }}>Back to home</Link></li>
        </ul>
      }
    </nav>
  )
}
