require('dotenv').config()
const line = require('@line/bot-sdk')
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
}
const client = new line.Client(config)

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
})

// googleMapsClient.geocode({
//     address: 'chote fashion'
// }, (err, res) => {
//     console.dir(res.json.results, {depth: null})
// })
module.exports = (token, origin, destination) => {
    return googleMapsClient.directions({
        origin: origin.split(','), //['13.638406', '100.500629'],
        destination: destination.split(','), //['13.674024', '100.465910'],
        mode: 'driving',
        optimize: true,
        alternatives: false
    }, async (err, res) => {
        if (err) return console.error(err)
        const {
            distance,
            duration
        } = res.json.routes[0].legs[0]
        const echo = {
            type: 'text',
            text: `ห่างจากตรงนี้ ${distance.text} ใช้เวลาเดินทางประมาณ ${duration.text}`
        }
        return await client.replyMessage(token, echo)
    })
}