console.log('background');
// alert('我来自background');
var bgvar = 111;

// 事件测试
chrome.tabs.onCreated.addListener(function (tab) {
    // alert("tab创建事件 tab.url"+tab.url+" tab.status "+tab.status );
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status=='complete'){
        // alert("tab更新事件 tab.id"+tab.id+" tab.url "+tab.url );


    }
})
chrome.tabs.onAttached.addListener(function (tabId, attachInfo) {
    // alert("tab移动到其他窗口事件："+tabId+" attachInfo："+JSON.stringify(attachInfo));
});

chrome.tabs.onDetached.addListener(function (tabId, attachInfo) {
    // alert("tab脱离事件："+tabId+" attachInfo："+JSON.stringify(attachInfo));
});

chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
    // alert("tab窗口内移动事件："+tabId+" moveInfo："+JSON.stringify(moveInfo));
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    // alert("tab窗口关闭事件："+tabId+" removeInfo："+JSON.stringify(removeInfo));
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    // console.log("tab窗口选中事件："+tabId+" selectInfo："+JSON.stringify(selectInfo));
});

// 接收注入页面消息
console.log(chrome);
chrome.extension.onMessage.addListener(function (data) {
    console.log(data);
    if (data.status){
        var self = this;
        var ret = data.data;
        if (ret.mmNick) {
            self.name = ret.mmNick;
        }
        
        
        chrome.windows.getAll(null, function (win) {
            win.map(function (value,index,array) {
                // alert(value);
                if (value.type=='popup'){
                    // alert(1)
                    chrome.windows.remove(value.id);
                }
            });
        });

        function onload(){
            if(location.href.indexOf('#reloaded')==-1){
                location.href=location.href+"#reloaded";
                location.reload();
            }
        };
        onload();
    }
    // alert('background收到了'+JSON.stringify(data));
});

