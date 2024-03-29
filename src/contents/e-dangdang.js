import {parse} from './library-parser'

// find isbn
const info = document.head.querySelector('meta[name=keywords]');
var m = info.content.match(/ISBN：(\d+)/)
var isbn = m[1];
console.log('isbn', isbn)
// meet library
chrome.runtime.sendMessage({isbn: isbn}, function(dom) {

    if ( dom == null) {
        return null;
    }
    var response = parse(dom);

    var aside = document.querySelector("body");
    var con = document.createElement('div');
    con.classList = 'download-con libraryxsh';
    con.style = 'position: fixed;top:240px;left:15px;z-index:100';
    aside.prepend(con);

    var title = document.createElement('div');
    title.classList = 'download-tit';
    var h3 = document.createElement('h3');
    h3.textContent = '上海图书馆可借馆藏';
    title.appendChild(h3);
    con.appendChild(title);

    var list = document.createElement('div');
    list.classList = 'device-list';
    con.appendChild(list);

    var ul = document.createElement('ul');
    list.appendChild(ul);

    Object.keys(response).forEach(key => {
        var cnt = response[key];
        var li = document.createElement('li');
        li.textContent = `${key} (${cnt})`;
        ul.appendChild(li);
    })
})