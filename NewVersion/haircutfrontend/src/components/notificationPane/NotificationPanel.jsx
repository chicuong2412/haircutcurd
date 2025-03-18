import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import NotiItem from './NotiItem/NotiItem';



export default function NotificationPanel({open, data, deleteData, deleteAll}) {


    useEffect(() => {
        document.querySelector(".clearAll")?.addEventListener("click", deleteAll)
        

        return () => {
            document.querySelector(".clearAll")?.removeEventListener("click", deleteAll)
        }
    }, [])

    


    return (
        <div className='notiPanel'>
            <div className='top'>
                <div onClick={() => {
                    
                }} className='close'>
                    <CloseIcon fontSize='large'></CloseIcon>
                </div>
                <h2 className='heading'>NOTIFICATION</h2>
            </div>

            <div className='clearAll' style={{
                display: `${(data.length > 0) ? "block": "none"}`

            }}>
                <span className='text'>clear all</span>
            </div> 
            <div className='container'>
                {data.map((t) => {
                    return (
                        <NotiItem
                            header={t.header}
                            message={t.message}
                            key={t.id}
                            id={t.id}
                            deleteFun={deleteData}
                        ></NotiItem>
                    )
                })}

            </div>
        </div>
    )
}
