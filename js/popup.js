var vm = new Vue({
	el: "#wrapper",
	data:{
		isOpen: false,
		value: 6,
		name: '未登录',
		token: '',
		url: '',
		key: '',
		memberid : '',
		sum: 1,
	},
	created(){
		var self = this;
				
	},
	beforeMount(){
		var self = this;
		chrome.storage.local.get(["url","key","sum","isOpen"],function(item){
			if (item.url) {
				self.url = item.url
				self.key = item.key
				self.sum = item.sum
				self.isOpen = item.isOpen
				console.log(self.isOpen);
			}
		});
		$.getJSON("https://pub.alimama.com/common/getUnionPubContextInfo.json",function(ret,status){
	        if (ret.data.noLogin){
	        	layer.msg('请登录');
	        	self.name = '未登录';
	        	chrome.storage.local.set({'token': ''});
	        	console.log(self.isOpen);
	        	if (self.isOpen) {
	        		chrome.windows.create({
		                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
		                width:400,
		                height:400,
		                left:600,
		                top:400,
		                type:'popup'
		            });
	        	}
	        } else {
	        	self.name = ret.data.mmNick;
	        	self.memberid = ret.data.memberid;
	        	chrome.storage.local.set({'name': self.name});
	        	chrome.storage.local.set({'memberid': self.memberid});
	            layer.msg('hello');
	            chrome.cookies.get({url:"http://pub.alimama.com",name:"_tb_token_"},function(cookie){
	                console.log(cookie.value);
	                token = cookie.value;
	                
	                chrome.storage.local.set({'token': token});
	                ///值就在cookie 里面了
	            })
	        }
	    });
	    chrome.storage.local.get("name",function(item){
			if (item.name) {
				self.name = item.name
			}
		});
	    chrome.storage.local.get("memberid",function(item){
			if (item.memberid) {
				self.memberid = item.memberid
			}
		});
	    chrome.storage.local.get("token",function(item){
			if (item.token) {
				self.token = item.token
			}
		});
	},
	methods: {
		open: function(){
			this.isOpen = false;
			chrome.storage.local.set({'isOpen': this.isOpen});
		},
		close: function(){
			this.isOpen = true;
			chrome.storage.local.set({'isOpen': this.isOpen});
		},
		build: function(){
			var self = this;
			if (self.token) {
				var option_url = chrome.extension.getURL('html/options.html');
				chrome.tabs.getAllInWindow(null,function(tabs){
				    var option_tab = tabs.filter(function(t) { return t.url === option_url });
				    if(option_tab.length){
				        // 已经打开，直接激活
				        chrome.tabs.update(option_tab[0].id,{selected:true});
				    }else{
				        chrome.tabs.create({url:option_url,selected:true})
				    }
				});
			}else{
				layer.msg('请登录')
			}
			
		},
		give: function(){
			if (self.token) {
				var option_url = chrome.extension.getURL('html/options.html');
				chrome.tabs.getAllInWindow(null,function(tabs){
				    var option_tab = tabs.filter(function(t) { return t.url === option_url });
				    if(option_tab.length){
				        // 已经打开，直接激活
				        chrome.tabs.update(option_tab[0].id,{selected:true});
				    }else{
				        chrome.tabs.create({url:option_url,selected:true})
				    }
				});
			}else{
				layer.msg('请登录')
			}
		},
		login: function(){
			chrome.windows.create({
                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
                width:400,
                height:400,
                left:600,
                top:400,
                type:'popup'
            });
		},
		submit: function(){
			var self = this;
			
			if (self.url != '') {
				chrome.storage.local.set({"url": self.url});
			}else{
				layer.msg("请输入接口地址");
				return false;
			}
			if (self.key != '') {
				chrome.storage.local.set({"key": self.key});
			}else{
				layer.msg("请输入密钥");
				return false;
			}

			$.post(self.url,{api:'pidinfo', key: self.key,memberid: self.memberid},function(res,status){
				console.log(typeof res);
				var ret = JSON.parse(res);
				console.log(ret);
				if (ret.code == 1) {
					self.sum = ret.left_num;
			        layer.msg("保存成功")
			        chrome.storage.local.set({"max_num": ret.max_num});
			        chrome.storage.local.set({"sum": ret.left_num});
				}						        
		    });
		}
	}
})
layui.use('slider', function(){
  var slider = layui.slider;
  
  //渲染
  slider.render({
    elem: '#slideTest1',
    min: 0,
    max: 10,
    value: vm.value,
  });
});