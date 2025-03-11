import React from 'react'
import style from './ServicePane.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons'

export default function ServicePane(serviceNode) {
    return (
        <div className={`${style.servicePane} servicePane ${(serviceNode.isChosen) ? "borderCustom": ""}`} id={serviceNode.id}>
            <img referrerPolicy='no-referrer' className={style.picture} src={serviceNode.imgSrc}></img>
            <div className= {style.info}>
                <h2 className={style.heading}><FontAwesomeIcon className={style.icon} icon={faRulerCombined} /> {serviceNode.heading}</h2>
                <p className={style.detail}>{serviceNode.detail}</p>
                <p className={style.price}>{serviceNode.price}k</p>
            </div>
        </div>
    )
}
