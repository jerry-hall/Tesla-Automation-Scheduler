const express = require('express')
const bodyParser = require('body-parser')
const command = require('./command')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/api/1/command', (req, res) => {
  const required_keys = ["access_token", "command", "execute_at"]
  var request_body = req.body
  var missing_elements = []
  required_keys.forEach(elem => {
    if (request_body.includes(elem))
      missing_elements.push(elem)
  });
  if (!missing_elements.length){
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