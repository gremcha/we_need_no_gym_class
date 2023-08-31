import React, { useState } from 'react'
import './components_style/settings-file.css'

export enum AvailableDistances {
    five = '5',
    three = '3',
}

export type AvailableDistance = `${AvailableDistances}`

interface DistanceProps {
    onChange: (distance: AvailableDistance) => void
}

export default function ChoiceDistance(props: DistanceProps) {
    const [distance, setDistance] = useState<AvailableDistance>(
        AvailableDistances.five
    )
    props.onChange(distance)

    const changeDate = (value: AvailableDistance) => {
        setDistance(value)
        props.onChange(value)
    }

    return (
        <div className="choice-distance">
            <span className="text-file">Расстояние:</span>
            <div className="distance-toggler">
                {Object.values(AvailableDistances).map((value) => (
                    <div
                        className={`button-distance${
                            value === distance ? '-active' : ''
                        }`}
                        onClick={() => changeDate(value)}
                    >
                        {value} км
                    </div>
                ))}
            </div>
        </div>
    )
}
