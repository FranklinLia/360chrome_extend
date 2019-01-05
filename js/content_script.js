// console.log('我是阿里后妈 content_script.js');

var width = $(window).width();
// if (width<500){
    // $.getJSON("https://pub.alimama.com/common/getUnionPubContextInfo.json",function(ret,status){
    // 	console.log(ret.data)
    //     if (ret.data.noLogin){
        	chrome.extension.sendMessage(null, {data:[{cc: 1}],status:1});
    //     } else {
    //     	console.log(222)
    //         chrome.extension.sendMessage(null, {data:ret.data,status:1});
    //     }
    // });
// }




