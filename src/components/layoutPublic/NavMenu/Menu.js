import style from './css/MenuStyle.module.scss'
import {Link, useNavigate} from 'react-router-dom'

function NavMenu({backgroundWhite, positionFixed}) {
    var navClassName = backgroundWhite ? "":"invisibleBackground";
    navClassName += (positionFixed ? " posFixed":"");
    const navigate = useNavigate();
    return (
        <nav className={navClassName} >
            <div className={style.logo}>
                <img onClick={() => navigate("/")} src='https://demo.harutheme.com/shang/wp-content/themes/shang/framework/admin-assets/images/theme-options/logo.png'></img>
            </div>
            <ul className={style.mainMenu} id="mainMenu">
                <li>
                    <Link to = '/'>Home</Link>
                </li>
                <li><Link to='/booking'>Services</Link>
                    <div className={style.buttonDown} open="false">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <ul className={style.subMenu}>
                        <li><a href="#">Service list</a></li>
                        <li><a href="#">Service Carousel</a></li>
                    </ul>

                </li>
                <li><a href="">Elements</a>
                    <div className={style.buttonDown} open="false">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <div className={style.megaSubMenu}>
                        <ul className={style.subMenuMega}>
                            <li className={style.preSubAfterMega}>
                                <div className={style.headRowMega}>
                                    <p>Sale Products</p>
                                </div>
                                <ul className={style.subMenu}>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                </ul>
                            </li>
                            <li className={style.preSubAfterMega}>
                                <div className={style.headRowMega}>
                                    <p>Random Products</p>
                                </div>
                                <ul className={style.subMenu}>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                </ul>
                            </li>
                            <li className={style.preSubAfterMega}>
                                <div className={style.headRowMega}>
                                    <p>Latest Products</p>
                                </div>
                                <ul className={style.subMenu}>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                    <li><a href="#">Future Update</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><a href="">Pages</a>
                    <div className={style.buttonDown} open="false">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <ul className={style.subMenu}>
                        <li><a href="#">About v1</a></li>
                        <li><a href="#">About v2</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </li>
                <li className={style.hasTwoUl}><a href="">Blog</a>
                    <div className={style.buttonDown} open="false">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <div className={style.megaSubMenu}>
                        <ul className={style.subMenuMega}>
                            <li className={style.preSubAfterMega}>
                                <div className={style.headRowMega}>
                                    <p>List Layouts</p>
                                </div>
                                <ul className={style.subMenu}>
                                    <li><a href="#">Right Sidebar</a></li>
                                    <li><a href="#">Left Sidebar</a></li>
                                    <li><a href="#">No Sidebar</a></li>
                                </ul>
                            </li>
                            <li className={style.preSubAfterMega}>
                                <div className={style.headRowMega}>
                                    <p>Single Post Layouts</p>
                                </div>
                                <ul className={style.subMenu}>
                                    <li><a href="#">Right Sidebar</a></li>
                                    <li><a href="#">Left Sidebar</a></li>
                                    <li><a href="#">No Sidebar</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><a href="">Contact</a></li>
                <li className={style.loginAndRe}><a href='/login'>Login</a>/<a href='/register'>Register</a></li>
            </ul>
        </nav>
    );
}

export default NavMenu;