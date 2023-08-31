import { file } from './file'

function randomInt(min: number, max: number) {
    return Math.random() * (max - min) + min
}

class Gpx {
    private unixTimestamp: number
    private distance: string
    private textDate: string
    private file: string[]
    private newFile: string[]
    resultTextFile: string
    private link: HTMLAnchorElement

    constructor(distance: string, date: string, time: string) {
        this.unixTimestamp = Date.parse(date + ' ' + time)
        this.distance = distance
        this.textDate = this.setTextDate()
        this.file = file.split('\n')
        this.newFile = []
        this.resultTextFile = ''
        this.link = document.createElement('a')
    }

    setTextDate(this: Gpx) {
        return new Date(this.unixTimestamp).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    }

    setNextTime(this: Gpx) {
        const timePlus = randomInt(5, 8) * 1000
        this.unixTimestamp += timePlus
        console.log(new Date(this.unixTimestamp))
    }

    getXML(this: Gpx, tag: string, data: string) {
        return `<${tag}>${data}</${tag}>`
    }

    getEle(this: Gpx, line: string) {
        const ele =
            parseInt(line.slice(line.search('>') + 1, line.lastIndexOf('<'))) +
            randomInt(-1, 1)
        return this.getXML('ele', ele.toString())
    }

    createFile(this: Gpx) {
        let isCore = false

        for (let line of this.file) {
            if (line.search('<trkseg>') !== -1) {
                isCore = true
                this.newFile.push(line)
            } else if (line.search('<length>') !== -1) {
                const length =
                    parseInt(this.distance) * 1000 +
                    randomInt(1001, 10000) / 100 //! добавить опцию
                this.newFile.push(this.getXML('length', length.toString()))
            } else if (
                line.search('<name>') !== -1 &&
                line.search('Android') === -1
            ) {
                this.newFile.push(this.getXML('name', this.textDate))
            } else if (
                line.search('<creationtime>') !== -1 ||
                line.search('<time>') !== -1
            ) {
                const date = new Date(this.unixTimestamp)

                let ISOString = date.toISOString()
                ISOString =
                    ISOString.slice(0, ISOString.length - 5) +
                    ISOString[ISOString.length - 1]

                if (line.search('<creationtime>') !== -1) {
                    this.newFile.push(this.getXML('creationtime', ISOString))
                } else {
                    this.newFile.push(this.getXML('time', ISOString))
                }

                if (isCore) {
                    this.setNextTime()
                }
            } else if (line.search('<duration>') !== -1) {
                this.newFile.push(this.getXML('duration', '3000')) //! добавить опцию
            } else if (line.search('<ele>') !== -1) {
                this.newFile.push(this.getEle(line))
            } else if (line.search('<geotracker:meta c=') !== -1) {
                const speed = 6 + randomInt(-150, 100) / 100
                const resultString = `<geotracker:meta c="${speed}" s="1.04" />`
                this.newFile.push(resultString)
            } else if (line.search('<trkpt') !== -1) {
                const lData = line.split(' ')

                const lat =
                    parseFloat(lData[lData.length - 2].slice(5, 15)) +
                    randomInt(-100, 100) / 100000000

                const lon =
                    parseFloat(lData[lData.length - 1].slice(5, 15)) +
                    randomInt(-100, 100) / 100000000
                this.newFile.push(`<trkpt lat="${lat}" lon="${lon}">`)
            } else {
                this.newFile.push(line)
            }
        }

        this.resultTextFile = this.newFile.join('\n')
    }

    createLink(this: Gpx) {}

    downloadFile(this: Gpx) {
        const content = this.resultTextFile
        const file = new Blob([content], { type: 'text/plain' })
        this.link.href = URL.createObjectURL(file)
        this.link.download = `${this.textDate}.gpx`
        this.link.click()
        URL.revokeObjectURL(this.link.href)
    }
}

export default function getGpx(distance: string, date: string, time: string) {
    const gpx = new Gpx(distance, date, time)
    gpx.createFile()
    gpx.downloadFile()
}
