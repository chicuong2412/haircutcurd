import { useEffect, useState } from 'react';
import style from './css/MenuStyle.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';


function NavMenu({ backgroundWhite, positionFixed }) {
    var navClassName = backgroundWhite ? "" : "invisibleBackground";
    navClassName += (positionFixed ? " posFixed" : "");
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("openBar").addEventListener("click", function () {
            document.getElementById("mainMenu").classList.toggle(style.mobileMenu)
        })
    }, [])


    return (
        <nav className={navClassName} >
            <div className={style.logo}>
                <img onClick={() => navigate("/")} src='https://demo.harutheme.com/shang/wp-content/themes/shang/framework/admin-assets/images/theme-options/logo.png' />
            </div>
            <div className={style.buttonOpen} id="openBar">
                <MenuIcon></MenuIcon>
            </div>
            <ul className={style.mainMenu} id="mainMenu" 
            >
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li><Link to='/booking'>Services</Link>

                </li>
                <li className={style.loginAndRe}><Link to={"/login"}>Login</Link>/<Link to='/register'>Register</Link></li>
            </ul>
        </nav>
    );
}

export default NavMenu;