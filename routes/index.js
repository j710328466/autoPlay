var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
var { exec } = require('child_process')

router.get('/', function(req, res, next) {
  res.send('我是首页，用来测试');
});

router.post('/afterE', (req, res, next) => {
  console.log(req.body)
  var project = 'share_after'
  let PATH = path.resolve(__dirname, '../' + project)

  var cmd = `cd ${PATH} && git reset --hard && git pull && pm2 restart ${project}`

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      res.writeHead(500)
      res.end('Server Internal Error.')
      throw err
    }
    let mes = {
      "msgtype": "text",
      "text": {
        "content": `${req.body.ref}构建成功👀`
      // },
      // "at": {
      //   "atMobiles": [
      //     "1825718XXXX"
      //   ],
      //   "isAtAll": false
      }
    }
    fetch('https://oapi.dingtalk.com/robot/send?access_token=48f7a75411f28e0b1e745496b335fe8cda5740472f4d387eb6f7cbe0e74f5866', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mes)
      }).then(res => res.json())
      .then(json => console.log(json));
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.writeHead(200)
    res.end('this is good~')
  })
})

module.exports = router