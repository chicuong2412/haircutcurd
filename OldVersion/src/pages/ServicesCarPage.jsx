import React, { useEffect, useState } from 'react'
import SerComCarousel from '../components/Services_Combo_Carousel/SerComCarousel'
import $ from "jquery"
import { Link } from 'react-router-dom';

export default function ServicesCarPage() {

    const [services, setServices] = useState([]);

    useEffect(() => {
        $.ajax({
            url: "http://localhost:3120/identity/services/getAllPublicServices",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setServices([...data.result]);
            }
        });
    }, [])

    return (
        <>
            <div className='headingPane'>
                <div className='siteName'>
                    Carousel
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Services/Combos</li>
                    </ol>
                </div>
            </div>
            <div className='container' style={{
                marginBottom: "30px",
                marginTop: "30px",
                gap: "10px",
                flexDirection: "column",
                display: "flex"
            }}>
                <SerComCarousel list={services}></SerComCarousel>
                <SerComCarousel list={services}></SerComCarousel>
            </div>
        </>
    )
}
