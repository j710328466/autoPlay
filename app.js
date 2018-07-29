var http = require('http'),
  path = require('path'),
  {
    exec
  } = require('child_process')

const PORT = 3344,
      PATH = path.resolve(__dirname, '../')

var app = http.createServer((req, res) => {
  if (req.url.search(/ci\/?$/i) > 0) {

    var cmd = `cd ${PATH} && git reset --hard && git pull && pm2 restart app`

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        res.writeHead(500)
        res.end('Server Internal Error.')
        throw err
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
      res.writeHead(200)
      res.end('option is complate!')
    })

  } else {
    res.writeHead(404)
    res.end('this page is not find.')
  }
})

app.listen(PORT, () => {
  console.log('this app running at port:' + PORT)
})