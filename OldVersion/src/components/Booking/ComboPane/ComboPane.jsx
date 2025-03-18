import React from 'react'
import style from './ServicePane.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons'

export default function ComboPane(comboNode) {
    return (
        <div className={`${style.servicePane} comboPane ${(comboNode.isChosen) ? "borderCustom" : ""}`} id={comboNode.id}>
            <img referrerPolicy='no-referrer' className={style.picture} src={comboNode.imgSrc}></img>
            <div className={style.info}>
                <h2 className={style.heading}><FontAwesomeIcon className={style.icon} icon={faRulerCombined} /> {comboNode.heading}</h2>
                <p className={style.detail}>{comboNode.detail}</p>
                <p className={style.price}>{comboNode.price}k</p>
            </div>
        </div>
    )
}
