const _get = require('lodash/get')
const duration = require('./duration')

const routes = {
    'functions': {
        'duration': {
            'done': (userId, data) => {
                const origin = _get(data, 'outputContexts.0.parameters.fields.homeGeoLocation.stringValue', '')
                const dest_lat = _get(data, 'outputContexts.0.parameters.fields.latitude.stringValue', '')
                const dest_lon = _get(data, 'outputContexts.0.parameters.fields.longitude.stringValue', '')
                const destination = `${dest_lat}, ${dest_lon}`

                duration(userId, origin, destination)
            }
        }
    }
}

module.exports = (userId, displayName, data) => {
    const handler = _get(routes, displayName, () => {})
    // console.log('displayName', displayName)
    
    return handler(userId, data)
}