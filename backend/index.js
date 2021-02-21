const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Helpers:
const command = require('./Components/command')
const required_keys = require('./Components/required_keys')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/api/1/command', async (req, res) => {
  var request_body = req.body
  var missing_elements = []
  required_keys.forEach(elem => {
    if (!(elem in request_body))
      missing_elements.push(elem)
  });
  if (missing_elements.length > 0){
    return res.status(400).send({
      message: `Missing elements: ${missing_elements}` 
    })}
  var response = await command.handle_command(request_body)
  return res.status(response['code']).send({
    message: response['message'] 
  })
})

app.listen(port, () => {
console.log(`Listening at http://localhost:${port}!`)
})