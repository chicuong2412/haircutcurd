import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel';
import style from "../../styles/PaneCarousel.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons'

export default function SerComCarousel({ list }) {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const ServicePane = (serviceNode) => {
        
        return (
            <div className={`${style.servicePane} servicePane ${(serviceNode.isChosen) ? "borderCustom" : ""}`} id={serviceNode.id}>
                <div className={style.holder}>
                    <img loading='lazy' referrerPolicy='no-referrer' className={style.picture} src={serviceNode.imgSrc}></img>
                    <div className={style.info}>
                        <h2 className={style.heading}><FontAwesomeIcon className={style.icon} icon={faRulerCombined} /> {serviceNode.name}</h2>
                        <p className={style.detail}>{serviceNode.description}</p>
                        <p className={style.price}>{serviceNode.price}k</p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="card" style={{
            paddingBottom: "30px",
            paddingTop: "30px",
        }}>
            {/* <h2 className={style.header}>Header</h2> */}
            <Carousel value={list} numVisible={ screenWidth > 1024 ? 3 : screenWidth > 768 ? 2 : 1} circular itemTemplate={ServicePane} />
        </div>
    )
}
