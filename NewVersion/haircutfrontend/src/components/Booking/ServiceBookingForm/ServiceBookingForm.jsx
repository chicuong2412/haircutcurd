import React, { useEffect } from 'react'
import $ from 'jquery'
import { useState } from 'react';
import { useInfo } from '../Booking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import ServicePane from "../ServicePane/ServicePane.jsx"
import ComboPane from '../ComboPane/ComboPane.jsx';

export default function ServiceBookingForm() {

    const { dataServices, services, changeServicesList, dataCombos, combos, changeComboList, setPickAtSalonToggle } = useInfo();
    const navigate = useNavigate();

    function totalMoney() {
        var total = 0;
        servicesList.forEach(t => total += t.price);
        combosList.forEach(t => total += t.price);
        return total;
    }

    var servicesList = [];
    var combosList = [];

    services.forEach(element => {
        servicesList.push(element);
    });

    combos.forEach(e => {
        combosList.push(e);
    })

    useEffect(() => {
        if (localStorage.getItem("ReloadService") === "true") {
            navigate(-1);
        }

        $(".serviceTable").on('click', ".servicePane", function () {
            changeServices(($(this).attr("id")));
            $(this).toggleClass("borderCustom");
        });

        $(".serviceTable").on('click', ".comboPane", function () {
            changeCombos(($(this).attr("id")));
            $(this).toggleClass("borderCustom");
        });

        $(".backIcon").on("click", function () {
            navigate(-1);
        });

        $(".buttonService").on('click', function () {
            changeServicesList(servicesList);
            changeComboList(combosList);
            if (servicesList.length !== 0 || combosList !== 0) setPickAtSalonToggle(false)
            navigate(-1);
        });

        if (servicesList.length == 0) {
            if (!$(".buttonService").hasClass("btn-inactive"))
                $(".buttonService").addClass("btn-inactive");
        } else {
            $(".buttonService").removeClass("btn-inactive");
        }
        $(".totalServices").html(`You have already booked ${servicesList.length} services/combos`)

        window.addEventListener("beforeunload", function () {
            localStorage.setItem("ReloadService", "true");
        })
    }, []);



    function changeServices(id) {
        var index = servicesList.findIndex((value) => {
            return id === value.id;
        })
        if (index !== -1) {
            servicesList.splice(index, 1);
        } else {
            servicesList.push(dataServices.find((value) => {
                return id === value.id;
            }));
        }
        if (servicesList.length == 0) {
            if (!$(".buttonService").hasClass("btn-inactive"))
                $(".buttonService").addClass("btn-inactive");
        } else {
            $(".buttonService").removeClass("btn-inactive");
        }
        $(".totalServices").html(`You have already booked ${servicesList.length + combosList.length} services/combos`);
        $(".totalMoney").html(`Payment cost: ${totalMoney()}k VND`);
    }

    function changeCombos(id) {
        var index = combosList.findIndex((value) => {
            return id === value.id;
        })
        if (index !== -1) {
            combosList.splice(index, 1);
        } else {
            combosList.push(dataCombos.find((value) => {
                return id === value.id;
            }));
        }
        if (combosList.length == 0) {
            if (!$(".buttonService").hasClass("btn-inactive"))
                $(".buttonService").addClass("btn-inactive");
        } else {
            $(".buttonService").removeClass("btn-inactive");
        }
        $(".totalServices").html(`You have already booked ${servicesList.length + combosList.length} services/combos`);
        $(".totalMoney").html(`Payment cost: ${totalMoney()}k VND`);
    }

    return (
        <React.Fragment>
            <div className='holdMainInfo'>
                <div className='LocationChoosingHead'>
                    <FontAwesomeIcon className='backIcon' icon={faArrowLeft} />
                    <h1 className='heading'>Choosing services</h1>
                    {/* <div className='searchField'>
                        <div className="input-group mb-0">
                            <input type="text" className="form-control" placeholder="Search by Name"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary noBorderSearch" type="button"
                                    id="button-addon2">Search</button>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='gap'></div>
                <div className='resultSearch'>
                    <div className='serviceTable'>
                        {dataServices.map((service) =>
                            <ServicePane key={service.id}
                                detail={service.description}
                                imgSrc={service.imgSrc}
                                heading={service.name}
                                id={service.id}
                                price={service.price}
                                isChosen={servicesList.includes(service)}
                            ></ServicePane>
                        )
                        }
                        {
                            dataCombos.map((combo) =>
                                <ComboPane
                                    key={combo.id}
                                    detail={combo.description}
                                    imgSrc={combo.imgSrc}
                                    heading={combo.name}
                                    id={combo.id}
                                    price={combo.price}
                                    isChosen={combosList.includes(combo)}
                                >
                                </ComboPane>
                            )
                        }


                    </div>
                </div>
            </div>
            <div class="button-affix">
                <div className='serviceFinalContainer'>
                    <div className='totalServices'></div>
                    <div className='totalMoney'>Payment cost: {totalMoney()}k VND</div>
                    <div class="buttonService">
                        <span>Confirm</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
