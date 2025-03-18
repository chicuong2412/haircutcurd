import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PageviewIcon from '@mui/icons-material/Pageview';

export default function DialogHeader({ header }) {
    return (
        <>
            <div className="inline-flex align-items-center justify-content-center gap-2" style={{display: "flex", gap: 2}}>
                {(header === "Create") ? (<NoteAddIcon fontSize='large'></NoteAddIcon>)
                    : (header === "Edit") ? (<CreateIcon fontSize='large'></CreateIcon>)
                        : (<PageviewIcon fontSize='large'></PageviewIcon>)}
                <span className="font-bold white-space-nowrap">{header}</span>
            </div>
        </>
    )
}
