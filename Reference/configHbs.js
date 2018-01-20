var path = require('path');
var hbs = require('hbs');
//express hbs 修改后缀HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',hbs.__express);
// 设置按名称加载内容
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); 
});
hbs.registerHelper('block', function(name, context) {
    var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return len ? val : context.fn(this);
});
// {{#extend 'style'}}{{#extend "js"}}

//设置公共模版文件
hbs.registerPartials(__dirname + '/views/common');
//+views
//  +common
//    +header.html
//  {{>header }}
