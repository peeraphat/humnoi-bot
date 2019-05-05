require('dotenv').config()
const fs = require('fs')

fs.writeFile(process.env.GC_CRED, process.env.GOOGLE_APPLICATION_CREDENTIALS, err => {})