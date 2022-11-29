
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    checkBorrowable(request).then(sendResponse);
    return true; // return true to indicate you want to send a response asynchronously
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
        {
            title: '查询上海图书馆：%s', // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            documentUrlPatterns: ["https://*.zhihu.com/*"],
            id: "IDcdefjaabdoeljkjfnhdnikcaanomjgao"
        }
    )
  });

chrome.contextMenus.onClicked.addListener((info, tab) => {
    checkBorrowable({title: info.selectionText}).then(result => {
        chrome.tabs.sendMessage(tab.id, result, (response)=>{});
    });
    
});

async function checkBorrowable(request) {
    var books = await getBooks(request);
    return books;
}
async function getBooks(request) {
    let {isbn, title} = request;
    if (isbn == 0) {
        return {};
    }
    var url = '';
    if (title) {
        url = `https://vufind.library.sh.cn/Search/Results?searchtype=vague&lookfor=${title}&type=AllFields&filter%5B0%5D=loan_type_name%3A%22pj%22&limit=20`;
    } else {
        // isbn + 普通外借
        url = `https://vufind.library.sh.cn/Search/Results?join=AND&bool0%5B%5D=AND&lookfor0%5B%5D=${isbn}&type0%5B%5D=ISBN&filter%5B%5D=loan_type_name%3A%22pj%22`;
    }
    try {
        let response = await fetch(url, { mode: 'no-cors' });
        // .then(r => r.text())
        // .then(result => {
        //     return result;
        // })
        return await response.text();
    } catch(e){

    }

}

