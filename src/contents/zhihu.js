import {parse} from './library-parser'

chrome.runtime.onMessage.addListener((dom, sender, sendResponse) => {
    //console.log('result from background', dom);
    if ( dom == null) {
        return true;
    }
    var response = parse(dom);
    writeToPage(response);
    sendResponse('thanks');
    return true;
});
// request ex: [{library: '龙岗区图书馆', cnt: 2}]
function writeToPage(request) {

    var aside = document.querySelector("body");

    var xsz = document.querySelector('.libraryxsh');
    if (xsz != null) {
        while(xsz.hasChildNodes()) {
            xsz.removeChild(xsz.firstChild);
        }
    } else {
        var xsz = document.createElement('div');
        xsz.style = 'position: fixed;top:240px;left:15px;width:min-content;z-index:100';
        xsz.classList = 'libraryxsh';
    }

    var card_header = document.createElement('div');
    card_header.classList = 'Card-header';
    var card_header_text = document.createElement('div');
    card_header_text.classList = 'Card-headerText';
    card_header_text.textContent = '上海图书馆可借馆藏';
    card_header.appendChild(card_header_text);
    xsz.appendChild(card_header);

    var topsearch_items = document.createElement('div');
    topsearch_items.classList = 'TopSearch-items';
    Object.keys(request).forEach(key => {
        var cnt = request[key];
        var item = document.createElement('div');
        item.classList = 'TopSearch-item';
        item.textContent = `${key} (${cnt})`;
        // var a = document.createElement('a');
        // a.href = 'javascript:void(0)';
        // a.textContent = `${key} (${cnt})`;
        // li.appendChild(a);

        topsearch_items.appendChild(item);
    })
    xsz.appendChild(topsearch_items);

    aside.prepend(xsz);
}

