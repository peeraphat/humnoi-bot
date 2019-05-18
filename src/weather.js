require('dotenv').config()
const rp = require('request-promise')
const line = require('@line/bot-sdk')
const _get = require('lodash/get')
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
}
const client = new line.Client(config)

module.exports = async (token, lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API}&units=metric`
        const res = await rp(url)
        const results = JSON.parse(res)
        const {
            name,
            weather,
            main
        } = results

        return await client.replyMessage(token, {
            type: 'text',
            text: `@${name} ${parseInt(main.temp)}Cํ สภาพอากาศ ${weather[0].main} รายละเอียด ${weather[0].description}`
        })
    } catch (err) {
        console.dir(err)
    }

}