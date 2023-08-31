import React, { useState } from 'react'

import ChoiceDistance, {
    AvailableDistance,
    AvailableDistances,
} from './choiceDistance'
import ChoiceDate from './choiceDate'
import ChoiceTime from './choiceTime'

import './components_style/settings-file.css'
import getGpx from './getGpx'

interface DataInterface {
    distance: AvailableDistance
    date: string
    time: string
}
const data: DataInterface = {
    distance: AvailableDistances.five,
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
                <div
                    className="center done-button"
                    onClick={() => getGpx(data.distance, data.date, data.time)}
                >
                    Сформировать
                </div>
            </div>
        </div>
    )
}
