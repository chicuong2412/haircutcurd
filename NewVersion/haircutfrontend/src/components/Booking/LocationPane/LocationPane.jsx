import React from 'react'
import style from './LocationPane.module.scss'

export default function LocationPane(locationNode) {
    return (
        <div className={`${style.locationPane} paneClick`} id={locationNode.id}>
            <img referrerPolicy='no-referrer' className={style.picture} src={(locationNode.imgSrc !== "") ? locationNode.imgSrc : "../images/BarberDefault.png"} loading='lazy'></img>
            <div className={style.info} >
                <h2 className={style.address}>{locationNode.address}</h2>
                <p className={style.note}>{locationNode.note}</p>
            </div>
        </div>
    )
}
