const axios = require('axios')

class APIController {
    static getAPI(req, res, next) {
       const options = {
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke',
        headers: {
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
            'X-RapidAPI-Key': '55174abe7cmshe0dc27ce1016c4dp1ee575jsn672eaddc6670'
        }
        };

        axios.request(options)
        .then(response => {
            res.status(200).json({ 
                setupJoke: response.data.body[0].setup,
                punchline: response.data.body[0].punchline
            })
            // console.log(response.data.body[0].setup);
            // console.log(response.data.body[0].punchline);
        })
        .catch((err) => {
            console.log("ini error dr server api", err.response.data.message);
            next({error: err.response.data.message})
        })
    }

}

module.exports = APIController