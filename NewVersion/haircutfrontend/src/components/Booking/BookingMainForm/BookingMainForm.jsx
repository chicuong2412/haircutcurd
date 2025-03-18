import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faScissors } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import $ from 'jquery'
import SmallServicePane from '../SmallServicePane'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb'
import { useInfo } from '../Booking'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'



function BookingMainForm() {

    const { services, combos, pickAtSalonToggle, setPickAtSalonToggle, changeServicesList, changeComboList } = useInfo()
    const { location } = useInfo()
    const { nameStylist } = useInfo()
    const { dateTime } = useInfo()
    const { setDateTime } = useInfo()
    const { data, confirmRequest } = useInfo()


    const navigate = useNavigate()

    useEffect(() => {
        $(".clickChangeForm").on("click", function (event) {
            var url = $(this).attr("datapage");
            if ($(this).attr("accessFlag") === "true") {
                navigate(`/booking/` + url)
            } else {
                $(".aleartEdit").show()
            }

        })
    }, [])

    useEffect(() => {
        var flagButton = true;
        if (location === undefined) {
            $(".tick.1").hide();
            $(".leftLine.1").hide();
            flagButton = false;
        } else {
            $(".tick.1").fadeIn();
            $(".leftLine.1").show();
            var height = $(".tick.1").parent().outerHeight();
            $(".leftLine.1").css("height", height);
            $(".clickChangeForm.2").attr("accessFlag", "true")
        }
        
        if (pickAtSalonToggle == false && services.length == 0) {
            $(".tick.2").hide();
            $(".leftLine.2").hide();
            flagButton = false;
        } else {
            $(".tick.2").fadeIn();
            $(".leftLine.2").show();
            var height = $(".tick.2").parent().outerHeight();
            $(".leftLine.2").css("height", height);
            $(".clickChangeForm.3").attr("accessFlag", "true")
        }

        if (nameStylist === undefined) {
            $(".tick.3").hide();
            $(".leftLine.3").hide();
            flagButton = false;

        } else {
            $(".tick.3").fadeIn();
            $(".leftLine.3").show();
            var height = $(".tick.3").parent().outerHeight();
            $(".leftLine.3").css("height", height);
        }

        if (dateTime === undefined) {
            $(".tick.4").hide();
            $(".leftLine.4").hide();
            flagButton = false;
        } else {
            $(".tick.4").fadeIn();
        }

        if (!flagButton) {
            if (!$(".button-next").hasClass("btn-inactive"))
                $(".button-next").addClass("btn-inactive");
            $(".button-next").off("click", addOnClickRq)
        } else {
            $(".button-next").removeClass("btn-inactive");
            $(".button-next").on("click", addOnClickRq)
        }

    }, [location, services, nameStylist, dateTime, pickAtSalonToggle])


    function addOnClickRq() {
        confirmRequest();
    }

    function turnOffAlert() {
        $(".aleartEdit").hide()
    }

    return (
        <React.Fragment>
            <div className='holdMainInfo'>
                <div className="mb-3 holdingStep">
                    <label className='stepStyle'>1. Choose Location</label>
                    <span className='tick 1'><FontAwesomeIcon icon={faCheck} /></span>
                    <span className='leftLine 1'></span>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLocationCrosshairs} /></span>
                        <input type="text" datapage="step1" accessFlag={"true"} className="form-control clickChangeForm 1"
                            placeholder={(location) ? location.address : "Click to choose"}
                            readOnly></input>
                    </div>
                </div>
                <div className="mb-3 holdingStep">
                    <label className='stepStyle'>2. Choose Services</label>
                    <span className='leftLine 2'></span>
                    <span className='tick 2'><FontAwesomeIcon icon={faCheck} /></span>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faScissors} /></span>
                        <input type="text" datapage="step2" accessFlag={"false"} className="form-control clickChangeForm 2" placeholder="Click to choose" readOnly></input>
                    </div>
                    <FormControlLabel control={<Switch checked={pickAtSalonToggle} onChange={() => {
                        setPickAtSalonToggle(!pickAtSalonToggle)
                        changeServicesList([])
                        changeComboList([])
                    }} />} 
                    label="Pick services/combos at salon"></FormControlLabel>

                    <div className='listServices'>
                        {services.map((value) =>
                            <SmallServicePane
                                key={value.id}
                                id={value.id}
                                heading={value.name}
                            ></SmallServicePane>
                        )}
                        {
                            combos.map((combo) =>
                                <SmallServicePane
                                    key={combo.id}
                                    id={combo.id}
                                    heading={combo.name}
                                ></SmallServicePane>
                            )
                        }
                    </div>
                </div>
                <div className="mb-3 holdingStep">
                    <label className='stepStyle'>3. Choose Stylist</label>
                    <span className='tick 3'><FontAwesomeIcon icon={faCheck} /></span>
                    <span className='leftLine 3'></span>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                        <input type="text" datapage="step3" accessFlag={"false"} className="form-control clickChangeForm 3"
                            placeholder={nameStylist || "Click to choose"}
                            readOnly></input>
                    </div>
                </div>
                <div className="mb-3 holdingStep">
                    <label className='stepStyle'>4. Choose Date</label>
                    <span className='tick 4'><FontAwesomeIcon icon={faCheck} /></span>
                    <span className='leftLine 4'></span>
                    <div className="input-group mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DateTimePicker
                                label="Appointment date"
                                defaultValue={dayjs()}
                                onChange={(newValue) => setDateTime(newValue)}
                                minDateTime={dayjs()}
                                // minTime={dayjs()}
                                minutesStep={15}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div class="alert alert-primary aleartEdit" role="alert">
                    You need to fill in previous information first!!!
                    <button type="button" class="btn-close"
                        onClick={turnOffAlert}
                        aria-label="Close"></button>
                </div>

            </div>
            <div class="button-affix">
                <div class="space-between text-center content-step time-line ">
                    <div class="right button-next pointer" role="presentation">
                        <span>Confirm Booking</span></div>
                    <span class="sub-description">Payment after services, no worries when cancell appointments</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BookingMainForm;