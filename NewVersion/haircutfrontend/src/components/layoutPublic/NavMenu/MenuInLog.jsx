import style from './css/MenuStyle.module.scss'
import { Link } from 'react-router-dom'
import UserTab from './UserTab';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import $ from "jquery"
// import NotificationPanel from '../notificationPane/NotificationPanel'
import NotificationPanel from '../../notificationPane/NotificationPanel';

function NavMenu({ backgroundWhite, positionFixed }) {
    var navClassName = backgroundWhite ? "" : "invisibleBackground";
    navClassName += (positionFixed ? " posFixed" : "");

    const [openNotiPanel, setOpenNotiPanel] = useState(false)

    const [dataNoti, setDataNoti] = useState([])

    useEffect(() => {
        document.querySelector(".noti").addEventListener("click", function () {
            togglePanel()
            document.querySelector(".notiPanel").classList.toggle("widthPanel")
        })

        document.querySelector(".notiPanel .close").addEventListener("click", function () {
            togglePanel()
            document.querySelector(".notiPanel").classList.toggle("widthPanel")
        })
    }, [])

    const togglePanel = () => {
        setOpenNotiPanel((prev) => !prev); // Toggle panel open/close
    };

    useEffect(() => {
        if (openNotiPanel) {
            $.ajax({
                url: `http://localhost:3120/identity/notification`,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
                },
                CORS: false,
                contentType: 'application/json',
                secure: true,
                async: false,
                success: function (data) {
                    updateData(data.result)
                },
                error: function (data) {
 
                }
            })
            
        }
    }, [openNotiPanel])

    function deleteAll() {
        document.querySelectorAll(".notiItem").forEach(t => {
            t.classList.toggle("scale0")
        }
        )
        setTimeout(() => {
            updateData([])
        }, 200)
    }

    function deleteData(id) {
        let newArr = []
        for (let index = 0; index < dataNoti.length; index++) {
            const element = dataNoti[index];
            if (element.id === id) {
                continue
            }
            newArr.push(element)
        }
        updateData(newArr)
    }

    function updateData(newData) {
        setDataNoti((preData) => [...newData])
    }


    useEffect(() => {
        document.getElementById("openBar").addEventListener("click", function () {

            document.getElementById("mainMenu").classList.toggle(style.mobileMenu)
        })

        document.querySelector(".buttonNext").addEventListener("click", function () {
            document.getElementById("userTab").classList.toggle(style.userTabNone)
        })


    }, [])

    return (
        <nav className={`${navClassName} ${style.navPublic}`} >
            <div className={style.logo}>
                <img src='https://demo.harutheme.com/shang/wp-content/themes/shang/framework/admin-assets/images/theme-options/logo.png' />
            </div>
            <div className={style.buttonOpen} id="openBar">
                <MenuIcon></MenuIcon>
            </div>
            <ul className={style.mainMenu} id="mainMenu">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li><Link to='/services'>Services</Link>
                </li>
                <li className={style.loginAndRe}><Link to={"/profile"}>{localStorage.getItem("username")} <KeyboardArrowDownIcon className={`buttonNext ${style.buttonN}`}></KeyboardArrowDownIcon></Link>
                    <UserTab></UserTab>
                </li>
                {(localStorage.getItem("ROLE").includes("ADMIN") || localStorage.getItem("ROLE").includes("MANAGER")) ?
                    <li><Link to="/dashboard">DASHBOARD</Link></li> : <></>
                }
            </ul>
            <div className='buttonMenu'>
                <Link to="/booking" className="default_btn">Make Appointment</Link>
            </div>
            <div className={`${style.notiIcon} noti`}>
                <NotificationsIcon fontSize='large'></NotificationsIcon>
            </div>
            <NotificationPanel
                open={openNotiPanel}
                deleteData={deleteData}
                deleteAll={deleteAll}
                data={dataNoti}
            ></NotificationPanel>
        </nav>
    );
}

export default NavMenu;