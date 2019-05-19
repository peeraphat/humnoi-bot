const _get = require('lodash/get')
const duration = require('./duration')
const weather = require('./weather')

const routes = {
    'functions': {
        'duration': {
            'done': (userId, data) => {
                const destination = _get(data, 'outputContexts.0.parameters.fields.homeGeoLocation.stringValue', '')
                const dest_lat = _get(data, 'outputContexts.0.parameters.fields.latitude.stringValue', '')
                const dest_lon = _get(data, 'outputContexts.0.parameters.fields.longitude.stringValue', '')
                const hightWay = _get(data, 'outputContexts.0.parameters.fields.hightWay.stringValue', '')
                const origin = `${dest_lat}, ${dest_lon}`

                console.log({ userId, origin, destination, hightWay })
                duration(userId, origin, destination, hightWay)
            }
        }, 
        'weather': {
            'done': (userId, data) => {
                const dest_lat = _get(data, 'outputContexts.0.parameters.fields.latitude.stringValue', '')
                const dest_lon = _get(data, 'outputContexts.0.parameters.fields.longitude.stringValue', '')

                weather(userId, dest_lat, dest_lon)
            }
        }
    }
}

module.exports = (userId, displayName, data) => {
    const handler = _get(routes, displayName, () => {})
    // console.log('displayName', displayName)
    
    return handler(userId, data)
}