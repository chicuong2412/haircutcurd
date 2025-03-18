import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './css/main.css'
import './css/elegant-font-icons.css'
import './css/elegant-line-icons.css'
import './css/owl.carousel.css'
import './css/responsive.css'
import './css/venobox/venobox.css'
import './css/animate.min.css'
import './css/barber-icons.css'
import 'bootstrap/js/dist/carousel'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <React.Fragment>
            <section>
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner holder">
                        <div className="carousel-item b1 active">
                            <div className="container">
                                <div className="slider_content">
                                    <h3>Its Not Just a Haircut, Its an Experience.</h3>
                                    <h1>Being a barber is about <br />taking care of the people.</h1>
                                    <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality, time and flawless look.</p>
                                    <Link to="/booking" className="default_btn">Make Appointment</Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item b2">
                            <div className="container">
                                <div className="slider_content">
                                    <h3>Classic Hair Style & Shaves.</h3>
                                    <h1>Our hair styles<br />enhances your smile.</h1>
                                    <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality, time and flawless look.</p>
                                    <Link to="/booking" className="default_btn">Make Appointment</Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item b3">
                            <div className="container">
                                <div className="slider_content">
                                    <h3>Its Not Just a Haircut, Its an Experience.</h3>
                                    <h1>Where mens want  <br />to look there very best.</h1>
                                    <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality, time and flawless look.</p>
                                    <Link to="/booking" className="default_btn">Make Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <section id="about" className="about_section bd-bottom padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="about_content align-center">
                                <h3 className="wow">Introducing</h3>
                                <h2 className="wow">The Barber Shop <br />Science 1991</h2>
                                <img className="wow logo" src="https://html.dynamiclayers.net/dl/barbershop/img/about-logo.png" alt="logo" />
                                <p className="wow">Barber is a person whose occupation is mainly to cut dress groom style and shave men's and boys' hair. A barber's place of work is known as a "barbershop" or a "barber's". Barbershops are also places of social interaction and public discourse. In some instances, barbershops are also public forums.</p>
                                {/* <a href="#" className="default_btn wow">More About Us</a> */}
                            </div>
                        </div>
                        <div className="col-md-6 d-none d-md-block">
                            <div className="about_img">
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/about-1.jpg" alt="idea-images" className="about_img_1 wow" data-wow-delay="200ms" />
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/about-3.jpg" className="about_img_2 wow" data-wow-delay="400ms" />
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/about-2.jpg" alt="idea-images" className="about_img_3 wow" data-wow-delay="600ms" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="service_section bg-grey padding">
                <div className="container">
                    <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
                        <h3>Trendy Salon &amp; Spa</h3>
                        <h2>Our Services</h2>
                        <div className="heading-line"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
                            <div className="service_box">
                                <i className="bs bs-scissors-1"></i>
                                <h3>Haircut Styles</h3>
                                <p>Barber is a person whose occupation is mainly to cut dress style.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
                            <div className="service_box">
                                <i className="bs bs-razor-2"></i>
                                <h3>Beard Triming</h3>
                                <p>Barber is a person whose occupation is mainly to cut dress style.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
                            <div className="service_box">
                                <i className="bs bs-brush"></i>
                                <h3>Smooth Shave</h3>
                                <p>Barber is a person whose occupation is mainly to cut dress style.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="500ms">
                            <div className="service_box">
                                <i className="bs bs-hairbrush-1"></i>
                                <h3>Face Masking</h3>
                                <p>Barber is a person whose occupation is mainly to cut dress style.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section id="team" className="team_section bd-bottom padding">
                <div className="container">
                    <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
                        <h3>Trendy Salon &amp; Spa</h3>
                        <h2>Our Barbers</h2>
                        <div className="heading-line"></div>
                    </div>
                    <ul className="team_members row">
                        <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
                            <div className="team_member">
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/team-1.jpg" alt="Team Member" />
                                <div className="overlay">
                                    <h3>Kyle Frederick</h3>
                                    <p>WEB DESIGNER</p>
                                </div>
                            </div>
                        </li>
                        <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
                            <div className="team_member">
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/team-2.jpg" alt="Team Member" />
                                <div className="overlay">
                                    <h3>José Carpio</h3>
                                    <p>WORDPRESS DEVELOPER</p>
                                </div>
                            </div>
                        </li>
                        <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
                            <div className="team_member">
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/team-3.jpg" alt="Team Member" />
                                <div className="overlay">
                                    <h3>Michel Ibáñez</h3>
                                    <p>ONLINE MARKETER</p>
                                </div>
                            </div>
                        </li>
                        <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="500ms">
                            <div className="team_member">
                                <img src="https://html.dynamiclayers.net/dl/barbershop/img/team-4.jpg" alt="Team Member" />
                                <div className="overlay">
                                    <h3>Adam Castellon</h3>
                                    <p>JAVA SPECIALIST</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section> */}


            {/* <section className="pricing_section bg-grey bd-bottom padding">
                <div className="container">
                    <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
                        <h3>Save 20% On Beauty Spa</h3>
                        <h2>Our Barber Pricing</h2>
                        <div className="heading-line"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 sm-padding">
                            <div className="price_wrap">
                                <h3>Hair Styling</h3>
                                <ul className="price_list">
                                    <li>
                                        <h4>Hair Cut</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$8</span>
                                    </li>
                                    <li>
                                        <h4>Hair Styling</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$9</span>
                                    </li>
                                    <li>
                                        <h4>Hair Triming</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$10</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 sm-padding">
                            <div className="price_wrap">
                                <h3>Shaving</h3>
                                <ul className="price_list">
                                    <li>
                                        <h4>Clean Shaving</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$8</span>
                                    </li>
                                    <li>
                                        <h4>Beard Triming</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$9</span>
                                    </li>
                                    <li>
                                        <h4>Smooth Shave</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$10</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 sm-padding">
                            <div className="price_wrap">
                                <h3>Face Masking</h3>
                                <ul className="price_list">
                                    <li>
                                        <h4>White Facial</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$8</span>
                                    </li>
                                    <li>
                                        <h4>Face Cleaning</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$9</span>
                                    </li>
                                    <li>
                                        <h4>Bright Tuning</h4>
                                        <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                                        <span className="price">$10</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="cta_section padding">
                <div className="container">
                    <div className="display-table">
                        <div className="table-cel">
                            <div className="cta_content align-center wow fadeInUp" data-wow-delay="300ms">
                                <h2>Making You Look Good <br /> Is In Our Haritage.</h2>
                                <p>Barber is a person whose occupation is mainly to cut dress groom <br />style and shave men's and boys hair.</p>
                                <Link to="/booking" className="default_btn">Make Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
