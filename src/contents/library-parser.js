function parse(dom) {
    // parse html
    var parser = new DOMParser();
    var doc = parser.parseFromString(dom, "text/html");
    var side = doc.querySelector('#side-collapse-library_name');
    let nameToCount = {};
    if (side != null) {
        var arr = side.querySelectorAll('a');
        arr.forEach(a => {
            var name = a.querySelector('.facet-value');
            if (name != null) {
                var count = a.querySelector('.badge');
                nameToCount[name.textContent] = count.textContent.trim()
            }
        });
    }

    return nameToCount;
}

export { parse }