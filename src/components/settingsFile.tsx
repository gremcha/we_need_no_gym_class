import React, { useState } from 'react'

import ChoiceDistance, { AvailableDistance } from './choiceDistance'
import ChoiceDate from './choiceDate'
import ChoiceTime from './choiceTime'

import './components_style/settings-file.css'

interface DataInterface {
    distance: AvailableDistance | null
    date: string
    time: string
}
const data: DataInterface = {
    distance: null,
    date: '',
    time: '',
}

export default function SettingsFile() {
    const distanceChangeHandler = (distance: AvailableDistance) => {
        data.distance = distance
    }

    const dateChangeHandler = (date: string) => {
        data.date = date
    }

    const timeChangeHandler = (time: string) => {
        data.time = time
    }
    return (
        <div className="center">
            <div className="settings-file">
                <ChoiceDistance onChange={distanceChangeHandler} />
                <ChoiceDate onChange={dateChangeHandler} />
                <ChoiceTime onChange={timeChangeHandler} />
            </div>
            <div className="center done-button">Сформировать</div>
        </div>
    )
}
