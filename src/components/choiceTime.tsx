import React, { useState } from 'react'
import { addZero } from './choiceDate'

interface TimeProps {
    onChange: (date: string) => void
}

function getCurrentTime() {
    const currentDate = new Date()
    const hour = addZero(currentDate.getHours().toString())
    const minute = addZero((currentDate.getMinutes() + 1).toString())
    const second = addZero(currentDate.getSeconds().toString())

    return [hour, minute, second].join(':')
}

export default function ChoiceTime(props: TimeProps) {
    const [time, setTime] = useState(getCurrentTime())
    props.onChange(time)

    const changeTime = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setTime(ev.currentTarget.value)
        props.onChange(time)
    }

    return (
        <div className="choice-date">
            <span className="text-file">Время:</span>
            <input
                type="time"
                className="date-input"
                onChange={(ev) => changeTime(ev)}
                value={time}
            />
        </div>
    )
}
