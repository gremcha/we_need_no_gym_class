import React, { useState } from 'react'
import './components_style/settings-file.css'

interface DateProps {
    onChange: (date: string) => void
}

export function addZero(v: string) {
    if (v.length === 1) {
        v = '0' + v
    }
    return v
}

function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear().toString()
    const month = addZero((currentDate.getMonth() + 1).toString())
    const day = addZero(currentDate.getDate().toString())

    return [year, month, day].join('-')
}

export default function ChoiceDate(props: DateProps) {
    const [date, setDate] = useState(getCurrentDate())
    console.log(date)

    const changeDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setDate(ev.currentTarget.value)
    }
    return (
        <div className="choice-date">
            <span className="text-file">Дата: </span>
            <input
                type="date"
                className="date-input"
                onChange={(ev) => changeDate(ev)}
                value={date}
            />
        </div>
    )
}
