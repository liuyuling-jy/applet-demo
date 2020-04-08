const api=require('./router/api');
const fs=require('fs');
const path=require('path');
const bodyParser=require('body-parser');
const express =require('express');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(api);
// express.static 用来处理静态资源
app.use(express.static(path.resolve(__dirname, '../src/dist')));

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf-8')
  res.send(html)
})
app.listen(8011);
console.log('已启动。。。')