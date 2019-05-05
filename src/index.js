require('dotenv').config()
const app = require('express')()
const line = require('@line/bot-sdk')
const dialogflow = require('dialogflow')
const functions = require('./functions')
const cors = require('cors')
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
}
const client = new line.Client(config)

app.use(cors({ origin: true }))
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
})

app.get('/', (req, res) => {
    res.end('hello humnoi.')
})

async function handleEvent(event) {
    const userId = event.source.userId
    const sessionClient = new dialogflow.SessionsClient()
    const sessionPath = sessionClient.sessionPath(process.env.PROJECT_ID, userId)
    let responseText = ''
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null)
    }

    const responses = await sessionClient.detectIntent({
        session: sessionPath,
        queryInput: {
            text: {
                text: event.message.text,
                languageCode: 'th-TH'
            }
        }
    })
    const result = responses[0].queryResult
    responseText = result.fulfillmentText
    const action = result.action
    if (action) {
        router = action.split('.')
        // console.log('router', router)
        if (router[0] === 'functions') {
            functions(event.replyToken, action, result)

            return Promise.resolve(null)
        }
    }
    // create a echoing text message
    // console.dir(result, {depth: null})
    const echo = {
        type: 'text',
        text: responseText
    };

    // use reply API
    return client.replyMessage(event.replyToken, echo)
}

app.listen(process.env.PORT, () => {console.log(`Online ${process.env.PORT}`)} ) 
// exports.app = firebaseFunctions.https.onRequest(app)