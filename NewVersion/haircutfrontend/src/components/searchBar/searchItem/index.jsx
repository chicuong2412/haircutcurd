import React from 'react'
import style from "../../../styles/SearchBar.module.scss"

export default function SearchItem(props) {
  return (
    <div className={`${style.searchItemContainer} serviceItem`} dataid = {props.id}>
        <span className={style.idHeading}>{props.id}</span>
        <span className={style.nameHeading}>{props.name}</span>
    </div>
  )
}
