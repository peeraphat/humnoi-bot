require('dotenv').config()
const fs = require('fs')

const keys = process.env.GC_CRED
if(keys) {
    fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, keys, err => {})
}