import React from 'react'
import style from "../../styles/AboveBar.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import MenuIcon from '@mui/icons-material/Menu';


export default function AboveBar() {
  return (
    <div className={style.aboveBar}>

      <div className={style.MenuIcon}>
        <MenuIcon fontSize='large' className='menuButton'></MenuIcon>
        <span className={style.headMenu}>Dashboard</span>
      </div>

      {/* <div className={style.iconsFuntions}>
        <span className={style.notifiction}><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></span>
        <span className={style.avatar}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></span>
      </div> */}
    </div>
  )
}
