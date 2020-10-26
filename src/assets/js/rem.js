var doc = document.documentElement;
var wid = doc.clientWidth;
var fs = null
window.onload = function() {
    fs = wid >= 1024 ? 1024 : wid >= 768 ? wid = 768 : wid >= 414 ? wid = 414 : wid >= 375 ? wid = 375 : wid >= 320 ? wid = 320 : wid = 320;
    // console.log(fs)
    var rem = fs / 7.5
    doc.style.fontSize = rem + 'px';
}
window.onresize = function() {
    doc = document.documentElement
    wid = doc.clientWidth
    fs = wid >= 1024 ? 1024 : wid >= 768 ? wid = 768 : wid >= 414 ? wid = 414 : wid >= 375 ? wid = 375 : wid >= 320 ? wid = 320 : wid = 320;
    // console.log(fs)
    var rem = fs / 7.5
    doc.style.fontSize = rem + 'px'
};