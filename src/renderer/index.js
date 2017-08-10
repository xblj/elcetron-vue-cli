import './style.css';
console.log('rendeer')
var app = document.getElementById('app');
app.innerHTML = PRODUCTION;

//  去掉下面的内容，当内容发生变化是，是刷新整个页面，而不是只替换更改内容
if (!PRODUCTION) {
    if (module.hot) {
        module.hot.accept();
    }
}