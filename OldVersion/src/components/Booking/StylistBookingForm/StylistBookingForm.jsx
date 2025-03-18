import React, { useEffect } from 'react'
import StylistPane from '../StylistPane/StylistPane';
import $ from 'jquery'
import { useInfo } from '../Booking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function StylistBookingForm() {

    const { dataStylist, changeStylist } = useInfo()
    const navigate = useNavigate()

    useEffect(() => {
        $(".stylistTable").on('click', ".stylistPane", function () {
            changeStylist($(this).attr("id"), $(this).attr("name"));
            navigate('/booking');
        })

        $(".backIcon").on("click", function () {
            navigate('/booking')
        })
    }, []);

    return (
        <div className='holdMainInfoStylist'>
            <div className='LocationChoosingHead'>
                <FontAwesomeIcon className='backIcon' icon={faArrowLeft} />
                <h1 className='heading'>Choosing your stylist</h1>
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
            <div className='resultSearch'>
                <div className='stylistTable'>
                    {dataStylist.map((stylist) =>
                        <StylistPane key={stylist.id}
                            descrip={stylist.specialities}
                            imgSrc={"https://html.dynamiclayers.net/dl/barbershop/img/team-1.jpg"}
                            name={stylist.nameWorker}
                            id={stylist.id}
                            rate={stylist.rate}
                        ></StylistPane>
                    )}
                </div>
            </div>
        </div>
    )
}
