import React, { useState } from 'react'
import { PickList } from 'primereact/picklist';


function check(value, listCheck) {
    for (let i of listCheck) {
        if (i.id === value.id) {
            return false;
        }
    }
    return true;
}

export default function List({ options, setValue, value, editable }) {
    if (value === undefined) {
        return (<></>);
    }

    const [source, setSource] = useState(() => {
        let finalOptions = [];

        for (let i of options) {
            if (check(i, value)) {
                finalOptions.push(i);
            }
        }

        return [...finalOptions];
    });
    const [target, setTarget] = useState([...value]);

    const itemTemplate = (item) => {
        return (
            <div className="">
                <div>ID: {item.id}</div>
                <div className="">Name: {item.name}</div>
            </div>
        );
    };

    const onChange = (event) => {
        if (editable) {
            setSource(event.source);
            setTarget(event.target);
            setValue(event.target);
        }

    };

    return (
        <div className="card">
            <PickList dataKey="id" source={source} filter filterBy="name" target={target}  onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
        </div>
    )
}
