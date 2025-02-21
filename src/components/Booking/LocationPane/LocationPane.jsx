import React from 'react'
import style from './LocationPane.module.scss'

export default function LocationPane(locationNode) {
    return (
        <div className={`${style.locationPane} paneClick`} id={locationNode.id}>
            <img className={style.picture} src={locationNode.imgSrc}></img>
            <div className={style.info} >
                <h2 className={style.address}>{locationNode.address}</h2>
                <p className={style.note}>{locationNode.note}</p>
            </div>
        </div>
    )
}
