import React from 'react'
import { Delete } from '@mui/icons-material'

export default function NotiItem({ header, message, id, deleteFun }) {
    return (
        <div className={`notiItem noti${id}`} id={id}>
            <p className='notiHead'>{header}</p>
            <p>{message}</p>
            <span onClick={() => {
                document.querySelector(`.noti${id}`).classList.toggle("scale0")
                setTimeout(() => {
                    deleteFun(id)
                }, 200)
            }} className='deleteNoti'><Delete></Delete></span>
        </div>
    )
}
