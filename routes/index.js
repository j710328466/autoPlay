var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
var path = require('path')
var { exec } = require('child_process')

router.get('/', function(req, res, next) {
  res.send('监听改变');
});

router.post('/afterE', (req, res, next) => {
  var project = 'share-2018.8'
  let PATH = path.resolve(__dirname, '../../' + project)

  var cmd = `cd ${PATH} && git reset --hard && git pull && cd ./server && pm2 restart ${project}`

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      res.writeHead(500)
      res.end('Server Internal Error.')
      throw err
    }
    let mes = {
      "msgtype": "text",
      "text": {
        "content": `${req.body.ref}分支构建成功咯~👀`
      // },
      // "at": {
      //   "atMobiles": [
      //     "1825718XXXX"
      //   ],
      //   "isAtAll": false
      }
    }
    fetch('https://oapi.dingtalk.com/robot/send?access_token=72cbd7cd838a6666d8678ecbad970010ce18ad1c80fb65514741e7f6b88912d7', {
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