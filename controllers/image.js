import fetch from 'node-fetch';

const handleApiCall = (req, res) => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key e3171c553ad64c419543abe0ae1b28f8'
        },
        body: JSON.stringify({
          "user_app_id": {
            "user_id": "kenjorda",
            "app_id": "066472a7e9ee4a8a8db2d41b46335e79"
          },
          "inputs": [
                  {
                    "data": {
                      "image": {
                        "url": req.body.input
                  }
                }
              }
            ]
        })
      }

    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
    .then(data => data.json())
    .then(result => {
        res.json(result);
    })
    //     {

    //     res.json(data);
    // })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('unable to get count or entries'));
}

export {handleImage, handleApiCall};