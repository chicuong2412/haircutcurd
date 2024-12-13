import React from 'react'
import style from "../../../styles/SmallServicePane.module.scss"
import CloseIcon from '@mui/icons-material/Close';

export default function SmallServicePane(props) {
  return (
    <div dataid={props.id} className={`${style.paneHolder}`}>{props.heading} <CloseIcon className={`${style.closeIcon} delButton`}></CloseIcon></div>
  )
}
