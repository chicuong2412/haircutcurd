import React, { useState } from 'react'
import style from "../../styles/menu.module.scss"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarCheck, } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faRulerCombined, faPersonMilitaryPointing, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket, faX } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery"
import { useInfo } from '../../layouts/layout'
import { useMain } from '../App'
import logo from "../../assets/img/logo.png"

export default function Menu() {
  var { menuItem, setMenuItem } = useInfo();
  const [role, setRole] = useState(localStorage.getItem("ROLE"))
  const { setIsLogged } = useMain();
  const navigate = useNavigate();
  React.useEffect(() => {
    $(`ul`).on("click", "li", function () {
      var type = $(this).attr("typenode");
      if (type === "page") {
        var url = $(this).attr("datanavigate");
        navigate(`/${url}`);
      } else {

      }
    })
    $(".loggout").on("click", function () {
      setIsLogged(false);
      localStorage.clear()
      navigate("/");
    })
  }, []);

  var url = new URL(window.location.href);

  var pathName = url.pathname;

  console.log(
    role.includes("ADMIN")
  );


  return (
    < nav className={style.menuSide} >
      <div className={style.logoDashBoard}>
        <img className='logoDashBoard' src={logo}></img>
      </div>
      {

        <ul className={style.menuContainer}>
          {/* <li tabIndex={0} className={`${style.menuItem} ${(pathName.indexOf("/myinfo") != -1) ? style.active : ""}`} typeNode="page" dataNavigate="myinfo"><span className={style.iconMenu}><FontAwesomeIcon icon={faUser} /></span>My information</li> */}
          {!role.includes("ADMIN") ? "" : <>
            <li tabIndex={1} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/customers") != -1) ? style.active : ""}`} typenode="page" datanavigate="customers"><span className={style.iconMenu}><FontAwesomeIcon icon={faPersonMilitaryPointing} /></span>Customers</li>
          </>}
          <li tabIndex={2} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/workers") != -1) ? style.active : ""}`} typenode="page" datanavigate="workers"><span className={style.iconMenu}><FontAwesomeIcon icon={faUsers} /></span>Employees</li>
          <li tabIndex={3} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/appointments") != -1) ? style.active : ""}`} typenode="page" datanavigate="appointments"><span className={style.iconMenu}><FontAwesomeIcon icon={faCalendarCheck} /></span>Appointment</li>
          {!role.includes("ADMIN") ? "" : <>
            <li tabIndex={4} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/products") != -1) ? style.active : ""}`} typenode="page" datanavigate="products"><span className={style.iconMenu} ><FontAwesomeIcon icon={faProductHunt} /></span>Products</li>
            <li tabIndex={5} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/services") != -1) ? style.active : ""}`} typenode="page" datanavigate="services"><span className={style.iconMenu} ><FontAwesomeIcon icon={faRulerCombined} /></span>Services</li>
            <li tabIndex={5} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/combos") != -1) ? style.active : ""}`} typenode="page" datanavigate="combos"><span className={style.iconMenu} ><FontAwesomeIcon icon={faRulerCombined} /></span>Combos</li>
            <li tabIndex={5} className={`${style.menuItem} ${(pathName.toLowerCase().indexOf("/locations") != -1) ? style.active : ""}`} typenode="page" datanavigate="locations"><span className={style.iconMenu} ><FontAwesomeIcon icon={faLocationDot} /></span>Location</li></>}
          <li className={`${style.menuItem} loggout`} typenode="function"><span className={style.iconMenu}><FontAwesomeIcon icon={faRightFromBracket} /></span>Log out</li>
        </ul>



      }
    </nav >
  )
}
