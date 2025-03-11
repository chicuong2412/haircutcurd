import React, { useEffect, useRef, useState } from 'react'
import style from './AppointmentHistory.module.scss'
import { faCalendar, faScissors, faUser, faCircle, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faPenToSquare, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SmallServicePane from '../Booking/SmallServicePane'




export default function AppointmentPane({ data, cancel }) {

    const [expanded, setExpanded] = useState(false)




    return (
        <>
            {(!expanded) ? <Card data={data} setExpanded={() => setExpanded(true)} cancel={cancel} />
                : <ExpanedCard data={data} setExpanded={() => setExpanded(false)} cancel={cancel} />}
        </>
    )
}


function Card({ data, setExpanded, cancel }) {
    return (
        <div className={style.AppointmentPane}>
            <p><FontAwesomeIcon icon={faCalendar} /> <span className={style.title}>Date-time:</span> {data.dateTime.replace("T", " ").slice(0, 16)}</p>
            <p className={style.services}><FontAwesomeIcon icon={faScissors} /> <span className={style.title}>Services/Combos:</span> Expand to see more</p>
            <p><FontAwesomeIcon icon={faUser} /> <span className={style.title}>{(localStorage.getItem("ROLE").includes("CUSTOMER") ? "Sylist" : "Customer")} name: </span>{(localStorage.getItem("ROLE").includes("CUSTOMER") ? data.worker.nameWorker : data.customer.nameCustomer)}</p>
            <p><FontAwesomeIcon icon={faCircle} /> <span className={style.title}>Status: </span>{data.status}</p>
            {/* {(data.status !== "CANCELLED" ? (<p><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon> Click here to change</p>) : <></>)} */}
            {(data.status !== "CANCELLED" ? (<p onClick={() => {
                cancel(data.id)
            }} className={style.cancelButton}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></p>) : <></>)}
            <span onClick={setExpanded} className={style.expandButton}><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></span>
        </div>
    )
}

function ExpanedCard({ data, setExpanded, cancel }) {
    return (
        <div className={style.expandedCard}>
            <p><FontAwesomeIcon icon={faCalendar} /> Date-time: {data.dateTime.replace("T", " ").slice(0, 16)}</p>
            <p className={style.services}><FontAwesomeIcon icon={faScissors} /> List services/combos:</p>
            {data.idService.map((service) => {
                return (
                    <><SmallServicePane heading={service.name} /> </>
                )
            })}
            {data.idCombo.map((service) => {
                return (
                    <><SmallServicePane heading={service.name} /> </>
                )
            })}
            <p><FontAwesomeIcon icon={faUser} /> <span className={style.title}>{(localStorage.getItem("ROLE").includes("CUSTOMER") ? "Sylist" : "Customer")} name: </span>{(localStorage.getItem("ROLE").includes("CUSTOMER") ? data.customer.nameCustomer : data.worker.nameWorker)}</p>
            <p><FontAwesomeIcon icon={faCircle} /> <span className={style.title}>Status: </span>{data.status}</p>
            {/* {(data.status !== "CANCELLED" ? (<p><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon> Click here to change</p>) : <></>)} */}
            {(data.status !== "CANCELLED" ? (<p onClick={() => {
                cancel(data.id)
            }} className={style.cancelButton}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></p>) : <></>)}

            <span onClick={setExpanded} className={style.expandButton}><FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} /></span>
        </div>
    )
}