import React from 'react'
import style from '../Footers/Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Email, Facebook, Twitter, Instagram, YouTube, ArrowUpward } from '@mui/icons-material'


export default function Footer() {
    return (
        <footer className="footer">
            {/* <div className={style.wrap}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <div className={style.holdContent}>
                                <div className="imgLogo">
                                    <img src="./Images/logo-dark.png" alt=""></img>
                                </div>
                                <p>Hotel Luxe is an all-in-one WordPress theme to make hotel websites of any kind. Make the
                                    hotel website you’ve always dreamt of with Hotel Luxe.</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className={style.holdContent}>
                                <p className={style.headingBlock}>
                                    CONTACT US
                                </p>
                                <ul>
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i>221 B, Baker Street, London</li>
                                    <li><a href=""><i className="fa fa-phone" aria-hidden="true"></i>+01-7458292</a></li>
                                    <li><a href=""><i className="fa fa-envelope-o" aria-hidden="true"></i>example@gmail.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className={style.holdContent}>
                                <p className={style.headingBlock}>
                                    QUICK LINKS
                                </p>
                                <ul>
                                    <li><a href="">Home</a></li>
                                    <li><a href="">Terms & Conditions</a></li>
                                    <li><a href="">FAQ</a></li>
                                    <li><a href="">Newsletter</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className={style.holdContent}>
                                <p className={style.headingBlock}>
                                    DON’T MISS ANY UPDATES
                                </p>
                                <form action="">
                                    <div className="input">
                                        <input className={style.inputMail} type="email" name="" id="" placeholder="Your Email"></input>
                                    </div>
                                    <button className={style.buttonSubmit}>SIGN UP NOW</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.lowFooter}>
                <p>© Built with pride and caffeine by ThemeBubble. All rights reserved.</p>
            </div> */}

            {/* <section className="widget_section padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 sm-padding">
                            <div className="footer_widget">
                                <img className="mb-15" src="https://demo.harutheme.com/shang/wp-content/uploads/2019/04/logo-white.png" style={{ width: 250 + "px" }} alt="Brand" />
                                <p>Our barbershop is the created for men who appreciate premium quality, time and flawless look.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-padding">
                            <div className="footer_widget">
                                <h3>Headquaters</h3>
                                <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
                                <p>Hello@dynamiclayers.net <br />(+123) 456 789 101</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-padding">
                            <div className="footer_widget">
                                <h3>Opening Hours</h3>
                                <ul className="opening_time">
                                    <li>Monday - Friday 11:30am - 2:008pm</li>
                                    <li>Saturday – Monday: 9am – 8pm</li>
                                    <li>Monday - Friday 5:30am - 11:008pm</li>
                                    <li>Saturday - Sunday 4:30am - 1:00pm</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 sm-padding">
                            <div className="footer_widget">
                                <h3>Subscribe to our contents</h3>
                                <div className="subscribe_form">
                                    <form action="#" className="subscribe_form">
                                        <input type="email" name="email" id="subs-email" className="form_input" placeholder="Email Address..." />
                                        <button type="submit" className="submit">SUBSCRIBE</button>
                                        <div className="clearfix"></div>
                                        <div id="subscribe-result">
                                            <p className="subscription-success"></p>
                                            <p className="subscription-error"></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className='lowSocial'>
                <div className="newsletter">
                    <h2>Subscribe To Our Newsletter</h2>
                    <p>- To Keep Track Of The Latest Designs -</p>
                    <div className="subscribe-box">
                        <input type="email" placeholder="Enter your email" />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className="social-icons">
                <div className='iconFooter'><Facebook /></div>
                <div className='iconFooter'><Twitter /></div>
                <div className='iconFooter'><Instagram /></div>
                <div className='iconFooter'><YouTube /></div>
            </div>

        </footer>
    )
}
