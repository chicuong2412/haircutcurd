import React, { useCallback, useMemo, useRef, useState } from 'react'
import LocationPane from '../LocationPane/LocationPane';
import { useEffect } from 'react';
import $ from 'jquery'
import { useInfo } from '../Booking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const locationNode = {
    address: "137, hoan",
    imgSrc: "",
    heading: ""
}


export default function LocationChoosing() {

    const { changeLocation } = useInfo()
    const { dataLocation } = useInfo()

    const [searchField, setSearchField] = useState("");

    const data = useMemo(
        () => {
        return [...dataLocation].filter((location) => {
            return location.name.toLowerCase().includes(searchField.toLowerCase())
                || location.address.toLowerCase().includes(searchField.toLowerCase())
                || searchField === ""
        })
    }, [searchField, dataLocation])

    const navigate = useNavigate()

    const ref = useRef(null)

    useEffect(() => {
        $(".table").on("click", ".paneClick", function (event) {
            changeLocation($(this).attr("id"))
            navigate(-1)
        })

        $(".backIcon").on("click", function () {
            navigate(-1)
        })
    }, [])

    const searching = () => {
        setSearchField(ref.current.value)
    }

    return (
        <div className='holdMainInfo'>
            <div className='LocationForm'>
                <div className='LocationChoosingHead'>
                    <FontAwesomeIcon className='backIcon' icon={faArrowLeft} />
                    <h1 className='heading'>Choosing location</h1>
                    <div className='searchField'>
                        <div className="input-group mb-0">
                            <input ref={ref} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searching();
                                }
                            }} type="text" className="form-control" placeholder="Search by Name"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary noBorderSearch" type="button"
                                    id="button-addon2" onClick={() => {
                                        searching()
                                    }}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='resultSearch'>
                    <div className='table'>
                        {
                            data.map((value) =>
                                <LocationPane
                                    id={value.id}
                                    address={value.name}
                                    imgSrc={value.imgSrc}
                                    note={value.address}
                                ></LocationPane>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

