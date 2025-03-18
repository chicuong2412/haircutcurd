import React, { useEffect } from 'react'
import style from './css/MenuStyle.module.scss'
import $ from 'jquery'
import { Link, useNavigate } from 'react-router-dom'
import { useMain } from '../../App'

export default function UserTab() {

    const { setIsLogged } = useMain()
    const navigate = useNavigate()

    useEffect(() => {
        $(".signOut").on('click', function () {
            setIsLogged(false)
            localStorage.clear()
            navigate('/')
        })
    })

    return (
        <ul className={`${style.userTab} ${style.userTabNone}`} id='userTab'>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/appointments"}>Appointment history</Link></li>
            <li><a className='signOut'>Sign out</a></li>
        </ul>
    )
}
