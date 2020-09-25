var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    response.statusCode = 200 
    //如果path是'/'，就把path变成index.html,如果不是‘/’，path就等于他自己
    //默认首页
    const filepath = (path ==='/' ? '/index.html' : path)
    //打出path'.'的下标
    //console.log(filepath.lastIndexOf('.'));
     const index = filepath.lastIndexOf('.')
     //substring方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
     //suffix是后缀
     const suffix = filepath.substring(index)
     //console.log(suffix);
     const fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js' :'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpeg'
     }
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content;
    try{
        content = fs.readFileSync(`./public${filepath}`)
    }catch(error){
        content = "文件不存在"
        response.statusCode = 404
    }
    response.write(content)
    response.end()
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)