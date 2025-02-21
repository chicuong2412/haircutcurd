import React, { useEffect } from 'react'
import SmallServicePane from '../SmallServicePane';
import $ from 'jquery'
import { useState } from 'react';
import { useInfo } from '../Booking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import ServicePane from "../ServicePane/ServicePane.jsx"

export default function ServiceBookingForm() {

    const { data, dataServices, services, changeServicesList } = useInfo();
    const navigate = useNavigate();
    const [unload, setUnload] = useState(false);

    function totalMoney() {
        var total = 0;
        servicesList.forEach(t => total += t.price);
        return total;
    }

    var servicesList = [];

    services.forEach(element => {
        servicesList.push(element);
    });


    useEffect(() => {

        if (localStorage.getItem("ReloadService") === "true") {
            console.log("Redirect");
            
            navigate("/booking");
        }

        $(".serviceTable").on('click', ".servicePane", function () {
            changeServices(($(this).attr("id")));
            $(this).toggleClass("borderCustom");
        });

        $(".backIcon").on("click", function () {
            navigate('/booking');
        });

        $(".buttonService").on('click', function () {
            changeServicesList(servicesList);
            navigate('/booking');
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




        $(".totalServices").html(`You have already booked ${servicesList.length} services/combos`);
        $(".totalMoney").html(`Payment cost: ${totalMoney()}k VND`);

    }

    return (
        <React.Fragment>
            <div className='holdMainInfo'>
                <div className='LocationChoosingHead'>
                    <FontAwesomeIcon className='backIcon' icon={faArrowLeft} />
                    <h1 className='heading'>Choosing services</h1>
                    <div className='searchField'>
                        <div className="input-group mb-0">
                            <input type="text" className="form-control" placeholder="Search by Name"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary noBorderSearch" type="button"
                                    id="button-addon2">Search</button>
                            </div>
                        </div>
                    </div>
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
                        )}

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
