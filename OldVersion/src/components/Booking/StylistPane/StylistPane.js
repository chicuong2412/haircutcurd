import React from 'react'
import style from './StylistPane.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function StylistPane(stylistNode) {
    return (
        <div className={`${style.stylistPane} stylistPane`} id={stylistNode.id} name={stylistNode.name}>
            <img className={style.picture} src={stylistNode.imgSrc} loading='lazy'></img>
            <div className={style.info}>
                <h2 className={style.heading}> <FontAwesomeIcon className={style.icon} icon={faUser} /> {stylistNode.name}</h2>
                <p className={style.descrip}><FontAwesomeIcon className={style.icon} icon={faCircleInfo} /> {stylistNode.descrip}</p>
                <p className={style.price}><FontAwesomeIcon className={style.icon + " " + style.star} icon={faStar} />{stylistNode.rate}/5</p>
            </div>
        </div>
    )
}
