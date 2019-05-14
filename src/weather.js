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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API}`
    const res = await rp(url)
    const results = JSON.parse(res)
    // console.dir(results, {depth: null})
    const { name, weather } = results
    // const name = _get(results, 'name', '')
    // const weather = _get(results, 'weather')

    const echo = {
        type: 'text',
        text: `@${name} สภาพอากาศ ${weather[0].main} รายละเอียด ${weather[0].description}`
    }
    return await client.replyMessage(token, echo)
}