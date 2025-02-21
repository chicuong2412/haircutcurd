import React, { useMemo } from 'react'
import { createContext, useEffect, useState } from 'react';
import BookingMainForm from './BookingMainForm/BookingMainForm';
import { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import $ from "jquery";
import "../../styles/Booking.css"
import LocationChoosing from './LocationChoosing/LocationChoosing';
import ServiceBookingForm from './ServiceBookingForm/ServiceBookingForm';
import StylistBookingForm from './StylistBookingForm/StylistBookingForm';



// var data = [{
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1053.png",
//     heading: "Combo Cắt Gội Massage Giãn Cơ Cổ Vai Gáy Bằng Đá Nóng",
//     id: "1",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ cao",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1054.png",
//     heading: "Combo Cắt Gội Massage Chăm Sóc Da Chuyên Sâu Thương Gia",
//     id: "2",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1052.png",
//     heading: "Combo Cắt Gội Thương Gia Cơ Bản",
//     id: "3",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage thư giãn",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1057.png",
//     heading: "Combo Cắt Gội Massage Cổ Vai Gáy Thương Gia",
//     id: "4",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1053.png",
//     heading: "Combo Cắt Gội Massage Giãn Cơ Cổ Vai Gáy Bằng Đá Nóng",
//     id: "1",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ cao",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1054.png",
//     heading: "Combo Cắt Gội Massage Chăm Sóc Da Chuyên Sâu Thương Gia",
//     id: "2",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1052.png",
//     heading: "Combo Cắt Gội Thương Gia Cơ Bản",
//     id: "3",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage thư giãn",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1057.png",
//     heading: "Combo Cắt Gội Massage Cổ Vai Gáy Thương Gia",
//     id: "4",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1053.png",
//     heading: "Combo Cắt Gội Massage Giãn Cơ Cổ Vai Gáy Bằng Đá Nóng",
//     id: "1",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ cao",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1054.png",
//     heading: "Combo Cắt Gội Massage Chăm Sóc Da Chuyên Sâu Thương Gia",
//     id: "2",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage bấm huyệt đầu 10 phút, Massage cổ vai gáy bằng đá nóng Himalaya 15 phút Chăm",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1052.png",
//     heading: "Combo Cắt Gội Thương Gia Cơ Bản",
//     id: "3",
//     isChosen: "false",
//     price: 100
// }, {
//     detail: "Combo cắt kỹ, Combo gội massage thư giãn",
//     imgSrc: "https://storage.30shine.com/service/combo_booking/1057.png",
//     heading: "Combo Cắt Gội Massage Cổ Vai Gáy Thương Gia",
//     id: "4",
//     isChosen: "false",
//     price: 100
// }]

// var dataStylist = [{
//     descrip: "Specialist in men hair",
//     imgSrc: "https://html.dynamiclayers.net/dl/barbershop/img/team-1.jpg",
//     name: "Marcus",
//     id: "2",
//     rate: 4.8
// }, {
//     descrip: "Specialist in men hair",
//     imgSrc: "https://html.dynamiclayers.net/dl/barbershop/img/team-2.jpg",
//     name: "José Carpio",
//     id: "4",
//     rate: 4.9
// }, {
//     descrip: "Specialist in men hair",
//     imgSrc: "https://html.dynamiclayers.net/dl/barbershop/img/team-3.jpg",
//     name: "Michel Ibáñez",
//     id: "4",
//     rate: 4.6
// }, {
//     descrip: "Specialist in men hair",
//     imgSrc: "https://html.dynamiclayers.net/dl/barbershop/img/team-4.jpg",
//     name: "Adam Castellon",
//     id: "4",
//     rate: 4.5
// }]

// var dataLocation = [{
//     id: "1",
//     address: "10 Trần Phú, P. Mộ Lao, Q. Hà Đông, Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "10 Trần Phú, P. Mộ Lao, Q. Hà Đông, Hà NộiSố 10 Trần Phú - Gần toà nhà MacPlaza. Cách hầm chui Nguyễn Trãi 700m hướng về phía Hà Đông"
// }, {
//     id: "2",
//     address: "104 Cửa Bắc, P. Quán Thánh, Q. Ba Đình,TP Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "Đối diện Trường THPT Phan Đình Phùng"
// }, {
//     id: "3",
//     address: "104 Cửa Bắc, P. Quán Thánh, Q. Ba Đình,TP Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "Đối diện Trường THPT Phan Đình Phùng"
// }, {
//     id: "4",
//     address: "104 Cửa Bắc, P. Quán Thánh, Q. Ba Đình,TP Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "Đối diện Trường THPT Phan Đình Phùng"
// }, {
//     id: "5",
//     address: "104 Cửa Bắc, P. Quán Thánh, Q. Ba Đình,TP Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "Đối diện Trường THPT Phan Đình Phùng"
// }, {
//     id: "6",
//     address: "104 Cửa Bắc, P. Quán Thánh, Q. Ba Đình,TP Hà Nội",
//     imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsld5wqleWipChHgAweJe6V9bYQQdj_njLdg&s",
//     note: "Đối diện Trường THPT Phan Đình Phùng"
// }]

const BookingInfo = createContext()

export default function Booking() {

    const [location, setLocation] = useState();
    var [services, setServices] = useState([]);
    const [stylist, setStylist] = useState();
    const [dateTime, setDateTime] = useState();
    const [nameStylist, setNameStylist] = useState();

    let url = new URLSearchParams(window.location.pathname);
    console.log(url.toString());

    const [dataServices, setDataServices] = useState([]);
    const [dataLocation, setDataLocations] = useState([]);
    const [dataStylist, setDataStylists] = useState([])

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
            url: "http://localhost:3120/identity/locations/getPublicLocations",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataLocations([...data.result]);
                console.log(data);
                
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
                    console.log(data);
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

    function changeStylist(id, name) {
        setStylist(id);
        setNameStylist(name);
        console.log(name);
    }


    return (
        <BookingInfo.Provider value={{ dataServices, services, changeServicesList, location, changeLocation, stylist, setStylist, dateTime, setDateTime, dataStylist, changeStylist, dataLocation, nameStylist }}>
            <div className='container-Booking'>
                <Routes>
                    <Route path='/' element={<BookingMainForm></BookingMainForm>}></Route>
                    <Route path='/step1' element={<LocationChoosing></LocationChoosing>}></Route>
                    <Route path='/step2' element={<ServiceBookingForm></ServiceBookingForm>}></Route>
                    <Route path='/step3' element={<StylistBookingForm></StylistBookingForm>}></Route>
                </Routes>

            </div>
        </BookingInfo.Provider>
    )
}

export const useInfo = () => useContext(BookingInfo)

