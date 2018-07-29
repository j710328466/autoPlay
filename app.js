var express = require('express');
var app = express();
var path = require('path')
var { exec } = require('child_process')

const PORT = 3344,
      project = 'travis_demo'

app.get('/CI', (req, res, next) => {
  // if (false) {
    let PATH = path.resolve(__dirname, '../' + project)
    var cmd = `cd ${PATH} && git reset --hard && git pull && pm2 restart ${project}`
    // var cmd = `cd ${PATH} && mkdir fuck`

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        res.writeHead(500)
        res.end('Server Internal Error.')
        throw err
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.writeHead(200)
      res.end('this is good~')
    })        
  // }
})

app.listen(PORT, () => {
  console.log('this app is running at port:' + PORT)
})                      
