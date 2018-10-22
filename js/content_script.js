console.log('我是阿里后妈 content_script.js');

var width = $(window).width();
if (width<500){
    $.getJSON("https://pub.alimama.com/common/getUnionPubContextInfo.json",function(ret,status){
        if (ret.data.noLogin){

        } else {
            chrome.extension.sendMessage(null, {data:ret.data,status:1});
        }
    });
}




