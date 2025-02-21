import React from 'react'
import style from '../Footers/Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Footer() {
    return (
        <footer>
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

            <section class="widget_section padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 sm-padding">
                            <div class="footer_widget">
                                <img class="mb-15" src="https://demo.harutheme.com/shang/wp-content/uploads/2019/04/logo-white.png" style={{ width: 250 + "px" }} alt="Brand" />
                                <p>Our barbershop is the created for men who appreciate premium quality, time and flawless look.</p>
                                {/* <ul class="widget_social">
                                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg></a></li>
                                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg></a></li>
                                    <li><a href="#"><i class="social_googleplus"></i></a></li>
                                    <li><a href="#"><i class="social_instagram"></i></a></li>
                                    <li><a href="#"><i class="social_linkedin"></i></a></li>
                                </ul> */}
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 sm-padding">
                            <div class="footer_widget">
                                <h3>Headquaters</h3>
                                <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
                                <p>Hello@dynamiclayers.net <br />(+123) 456 789 101</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 sm-padding">
                            <div class="footer_widget">
                                <h3>Opening Hours</h3>
                                <ul class="opening_time">
                                    <li>Monday - Friday 11:30am - 2:008pm</li>
                                    <li>Saturday – Monday: 9am – 8pm</li>
                                    <li>Monday - Friday 5:30am - 11:008pm</li>
                                    <li>Saturday - Sunday 4:30am - 1:00pm</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12 sm-padding">
                            <div class="footer_widget">
                                <h3>Subscribe to our contents</h3>
                                <div class="subscribe_form">
                                    <form action="#" class="subscribe_form">
                                        <input type="email" name="email" id="subs-email" class="form_input" placeholder="Email Address..." />
                                        <button type="submit" class="submit">SUBSCRIBE</button>
                                        <div class="clearfix"></div>
                                        <div id="subscribe-result">
                                            <p class="subscription-success"></p>
                                            <p class="subscription-error"></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}
