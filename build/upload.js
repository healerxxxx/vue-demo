const {username, password} = require('./config')
const addFile = require('easeftp/upload').addFile

addFile(['**/**'], {
  username: username,     // 用户名,     必填
  password: password,     // 密码,       必填
  path: 'relottery/relottery-h5',    // cdn线上路径, 必填
  cwd: './dist',       // 匹配的根目录,     默认为process.cwd()
  exclude: ['*.map', '*.html'],  // 排除不上传的文件,  默认为空
  strict: true,
  debug: true
}).then(({urls, details}) => {
  console.log(urls) // 上传成功的访问url
}, (data) => {
  console.log(data.details) // 所有详细信息
})
