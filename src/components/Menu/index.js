import React from 'react'
import style from "../../styles/menu.module.scss"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarCheck,  } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faRulerCombined } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery"
import { useInfo } from '../../layouts/layout'
import logo from "../../assets/img/logo.png"

export default function Menu() {
  var { menuItem, setMenuItem } = useInfo();

  const navigate = useNavigate();
  React.useEffect(() => {

    $(`ul`).on("click", "li", function () {
      var type = $(this).attr("typeNode");
      if (type === "page") {
        var url = $(this).attr("dataNavigate");
        navigate(`/${url}`);
      } else {

      }

    })
  }, []);

    var url = new URL(window.location.href);
    
    var pathName = url.pathname;
    
    
  
  return (
    
    < nav className = { style.menuSide } >
      <div className={style.logo}>
        <img className='logo' src={logo}></img>
      </div>
      <ul className={style.menuContainer}>
        <li tabIndex={0} className={`${style.menuItem} ${(pathName.indexOf("/myinfo") != -1) ? style.active: ""}`} typeNode="page" dataNavigate="myinfo"><span className={style.iconMenu}><FontAwesomeIcon icon={faUser} /></span>My information</li>
        <li tabIndex={1} className={`${style.menuItem} ${(pathName.indexOf("/appointment") != -1) ? style.active: ""}`} typeNode="page" dataNavigate="appointment"><span className={style.iconMenu}><FontAwesomeIcon icon={faCalendarCheck} /></span>Appointment</li>
        <li tabIndex={2} className={`${style.menuItem} ${(pathName.indexOf("/employees") != -1) ? style.active: ""}`} typeNode="page" dataNavigate="employees"><span className={style.iconMenu}><FontAwesomeIcon icon={faUsers} /></span>Employees</li>
        <li tabIndex={3} className={`${style.menuItem} ${(pathName.indexOf("/products") != -1) ? style.active: ""}`} typeNode="page" dataNavigate="products"><span className={style.iconMenu} ><FontAwesomeIcon icon={faProductHunt} /></span>Products</li>
        <li tabIndex={3} className={`${style.menuItem} ${(pathName.indexOf("/services") != -1) ? style.active: ""}`} typeNode="page" dataNavigate="services"><span className={style.iconMenu} ><FontAwesomeIcon icon={faRulerCombined} /></span>Services</li>
        <li className={`${style.menuItem}`} typeNode="function"><span className={style.iconMenu}><FontAwesomeIcon icon={faRightFromBracket} /></span>Log out</li>
      </ul>
    </nav >
  )
}
