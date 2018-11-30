var vm = new Vue({
	el: "#wrapper",
	data:{
		isOpen: false,
		value: 6,
		name: '点击登录',
		token: '',
		url: '',
		key: '',
		memberid : '',
		sum: '未创建',
		isFirst: 0,
		isLogin: 0
	},
	created(){
		var self = this;
	},
	beforeMount(){
		var self = this;
		chrome.storage.local.get(["url","key","sum","isOpen","name","memberid","token", "isFirst", "isLogin"],function(item){
			if (item.url) {
				self.url = item.url
				self.key = item.key
				self.sum = item.sum
				self.isOpen = item.isOpen
			}
			if (item.name) {
				self.name = item.name
			}
			if (item.isLogin) {
				self.isLogin = item.isLogin
			}
			if (item.isFirst) {
				self.isFirst = item.isFirst
			}
			if (item.memberid) {
				self.memberid = item.memberid
			}
			if (item.token) {
				self.token = item.token
			}
		});
		$.getJSON("https://pub.alimama.com/common/getUnionPubContextInfo.json",function(ret,status){
	        if (ret.data.noLogin){
	        	layer.msg('请登录');
	        	self.name = '点击登录';
	        	chrome.storage.local.set({'token': ''});
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
	        	localStorage.setItem("memberid", self.memberid);
	        	if (self.isFirst == 0) {
	        		layer.msg('hello,开启你的助手之旅');
	        		self.isFirst = 1;
	        		chrome.storage.local.set({'isFirst': self.isFirst});
	        	}
	            chrome.cookies.get({url:"http://pub.alimama.com",name:"_tb_token_"},function(cookie){
	                self.token = cookie.value;
	                chrome.storage.local.set({'token': self.token});
	                ///值就在cookie 里面了
	            })
	        }
	    });
	},
	mounted(){
		var self = this;
		var link = window.localStorage.getItem("url")
		if (link) {
			self.url = localStorage.getItem("url");
			self.key = localStorage.getItem("key");
			self.memberid = localStorage.getItem("memberid");
			$.post(self.url,{api:'pidinfo', key: self.key, memberid: self.memberid},function(res,status){
				if (status == 'success') {
					var ret = JSON.parse(res);
					if (ret.code == 1) {
						self.sum = ret.left_num;
				        chrome.storage.local.set({"max_num": ret.max_num});
				        chrome.storage.local.set({"sum": ret.left_num});
					
					}
				}						        
		    });
		}
	    
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
				var option_url = chrome.extension.getURL('html/options.html#reloaded');
				chrome.tabs.getAllInWindow(null,function(tabs){
				    var option_tab = tabs.filter(function(t) { return t.url === option_url });
				    if(option_tab.length){
				        // 已经打开，直接激活
				        chrome.tabs.update(option_tab[0].id,{selected:true});
				    }else{
				        chrome.storage.local.set({"sum": ret.left_num});
				    }
				});
			}else{
				layer.msg('请登录')
			}			
		},
		give: function(){
			var self = this;
			if (self.token) {
				var option_url = chrome.extension.getURL('html/options.html#reloaded');
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
                type:'popup',
                incognito: false
            });
            $.getJSON("https://pub.alimama.com/common/getUnionPubContextInfo.json",function(ret,status){
		        if (ret.data.noLogin){
		        	layer.msg('请登录');
		        	self.name = '未登录';
		        	chrome.storage.local.set({'token': ''});
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
		        	localStorage.setItem("memberid", self.memberid);
		            chrome.cookies.get({url:"http://pub.alimama.com",name:"_tb_token_"},function(cookie){
		                self.token = cookie.value;
		                chrome.storage.local.set({'token': self.token});
		            })
		        }
		    });
		},
		submit: function(){
			var self = this;
			
			if (self.url != '') {
				chrome.storage.local.set({"url": self.url});
				localStorage.setItem("url", self.url);
			}else{
				layer.msg("请输入接口地址");
				return false;
			}
			if (self.key != '') {
				chrome.storage.local.set({"key": self.key});
				localStorage.setItem("key", self.key);
			}else{
				layer.msg("请输入密钥");
				return false;
			}

			var option_url = chrome.extension.getURL('html/options.html#reloaded');
			chrome.tabs.update({url:option_url,selected:true})

			layer.msg("保存中..")
			$.post(self.url,{api:'pidinfo', key: self.key,memberid: self.memberid},function(res,status){
				console.log(res);
				console.log(typeof res);
				if (res.constructor == String) {
					var ret = JSON.parse(res);
				}else{
					var ret = res;
				}
				
				if (ret.code == 1) {	
					self.sum = ret.left_num;
			        layer.msg("保存成功")
			        chrome.storage.local.set({"max_num": ret.max_num});
			        chrome.storage.local.set({"sum": ret.left_num});
				}else{
					layer.msg(ret.message || ret.msg)
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