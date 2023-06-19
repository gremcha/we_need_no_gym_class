import { file } from './file'

class Gpx {
    private distance: string
    private date: string
    private time: string
    private textDate: string | null
    private UTCTime: string | null
    private file: string
    newFile: string

    constructor(distance: string, date: string, time: string) {
        this.distance = distance
        this.date = date
        this.time = time
        this.textDate = null
        this.UTCTime = null
        this.file = file
        this.newFile = ''

        this.setTextDate()
        this.setUTCTime()
    }

    setTextDate(this: Gpx) {
        this.textDate = new Date(this.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    setUTCTime(this: Gpx) {
        const time = new Date(this.time).toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })

        const tz = new Date().getTimezoneOffset() / 60

        let hour = +time.slice(0, 2)
        let dayHalf = time.slice(10)

        if (hour - tz > 0 || hour - tz < 12) {
            hour -= tz
        } else {
            hour = 12 - hour - tz
            dayHalf = dayHalf == 'AM' ? 'PM' : 'AM'
        }

        const stringHour =
            hour.toString().length == 1
                ? '0' + hour.toString()
                : hour.toString()

        this.UTCTime = hour.toString() + time.slice(2, 10) + dayHalf
    }

    openFile(this: Gpx) {
        let reader = new FileReader()
    }
}

export default function getGpx(distance: string, date: string, time: string) {
    const gpx = new Gpx(distance, date, time)
}
