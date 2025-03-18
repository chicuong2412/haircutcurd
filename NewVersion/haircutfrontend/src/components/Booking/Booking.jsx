import React, { useMemo } from 'react'
import { createContext, useEffect, useState } from 'react';
import BookingMainForm from './BookingMainForm/BookingMainForm';
import { useContext } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import "../../styles/Booking.css"
import LocationChoosing from './LocationChoosing/LocationChoosing';
import ServiceBookingForm from './ServiceBookingForm/ServiceBookingForm';
import StylistBookingForm from './StylistBookingForm/StylistBookingForm';
import dayjs from 'dayjs';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useMain } from '../App';


const BookingInfo = createContext()

export default function Booking() {

    const {toast} = useMain();

    const [location, setLocation] = useState();
    var [services, setServices] = useState([]);
    var [combos, setCombos] = useState([]);
    const [stylist, setStylist] = useState();
    const [dateTime, setDateTime] = useState();
    const [nameStylist, setNameStylist] = useState();

    const [dataCombos, setDataCombos] = useState([]);
    const [dataServices, setDataServices] = useState([]);
    const [pickAtSalonToggle, setPickAtSalonToggle] = useState(false)

    const [dataLocation, setDataLocations] = useState([]);
    const [dataStylist, setDataStylists] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("ReloadService") === undefined) {
            localStorage.setItem("ReloadService", "false");
        } else if (localStorage.getItem("ReloadService") === "true") {
            localStorage.setItem("ReloadService", "false");
        }
        $.ajax({
            url: "http://localhost:3120/identity/services/getAllPublicServices",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataServices([...data.result]);
            }
        });

        $.ajax({
            url: "http://localhost:3120/identity/combos/getAllPublicCombos",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataCombos([...data.result]);
            }
        });

        $.ajax({
            url: "http://localhost:3120/identity/locations/getPublicLocations",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataLocations([...data.result]);

            }
        });
    }, []);

    useMemo(() => {
        if (location != null) {
            $.ajax({
                url: "http://localhost:3120/identity/workers/getPublicByIdLocation",
                type: 'GET',
                dataType: 'json',
                data: {
                    idLocation: location.id
                },
                CORS: false,
                contentType: 'application/json',
                secure: true,
                async: true,
                success: function (data) {
                    setDataStylists([...data.result]);
                }
            });
        }
    }, [location])

    function changeLocation(id) {
        for (let locationNode of dataLocation) {
            if (locationNode.id === id) {
                setLocation(locationNode)
                break;
            }
        }
    }

    function changeServicesList(servicesBookedList) {
        setServices(servicesBookedList)
    }

    function changeComboList(comboBookedList) {
        setCombos(comboBookedList)
    }

    function changeStylist(id, name) {
        setStylist(id);
        setNameStylist(name);
    }

    const confirmRequest = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $(".loading").css("display", "flex");
                $.ajax({
                    url: "http://localhost:3120/identity/appointments",
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    },
                    data: JSON.stringify({
                        idCustomer: localStorage.getItem("ID"),
                        idWorker: stylist,
                        status: "WAITING",
                        idLocation: location.id,
                        dateTime: dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ss'),
                        idService: [...services.map((t) => t.id)],
                        idCombo: [...combos.map((t) => t.id)],
                    }),
                    contentType: 'application/json',
                    secure: true,
                    async: true,
                    success: function (data) {
                        if (data.code === 103 || data.code === 101) {
                            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: data.message, life: 3000 });
                        } else {
                            toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                        }
                        $(".loading").css("display", "none")
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
                    }
                });
            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });

    }


    return (
        <>
            <Toast ref={toast} />
            <BookingInfo.Provider value={{ dataServices, services, changeServicesList, dataCombos, combos, changeComboList , location, changeLocation, stylist, setStylist, dateTime, setDateTime, dataStylist, changeStylist, dataLocation, nameStylist, confirmRequest, pickAtSalonToggle, setPickAtSalonToggle }}>
                <div className='container-Booking'>
                    <Routes>
                        <Route path='/' element={<BookingMainForm></BookingMainForm>}></Route>
                        <Route path='/step1' element={<LocationChoosing></LocationChoosing>}></Route>
                        <Route path='/step2' element={<ServiceBookingForm></ServiceBookingForm>}></Route>
                        <Route path='/step3' element={<StylistBookingForm></StylistBookingForm>}></Route>
                    </Routes>
                </div>
            </BookingInfo.Provider>
        </>
    )
}

export const useInfo = () => useContext(BookingInfo)

