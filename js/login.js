// console.log('login.js');

setTimeout(function () {
    var nickname = jQuery('.user-name').html();
    if (nickname){
        jQuery("#J_SubmitQuick").trigger("click");
        chrome.windows.update(1, {selected: true});
    } else {
        // 没登陆旺旺
        // alert("旺旺没登陆，请手动输入密码登陆");
        
    }
}, 2000);
