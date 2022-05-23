const axios = require('axios')

class APIController {
    static getRandomActivity(req, res, next) {
        console.log("masuk")
        // const apiKey = process.env.API_WEATHER
        axios(
           { 
            method: 'get',
            url: `http://www.boredapi.com/api/activity`
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json({
                activity: response.data.activity,
                type: response.data.type,
                participants: response.data.participants
            })
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = APIController