let widthHtml = document.documentElement.clientWidth ||
body.clientWidth
let HtmlDom = document.getElementsByTagName('html')[0]
if(widthHtml > 750) {
    widthHtml = 750
}
HtmlDom.style.fontSize = widthHtml/20 + 'px'