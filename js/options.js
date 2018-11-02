var vm = new Vue({
	el: "#container",
	data:{
		isChange: false,
		title:'批量创建pid',
		num: 5,
		count: 1,
		statu: 0,
		statu2: 0,
		statu3: 0,
		nums: [1,2,3,4,5,6,7,8,9],
		isActive: 1,
		isStart: false,
		selected: '',
		gcid: 0,
		pvid: '50_115.60.151.227_4846_1540279126603',
		tag: 29,
		itemid: '523189741309',
		t: new Date().getTime(),
		appList: [],
		webList: [],
		otherList: [],
		idList: [{name: "暂无媒体id"}],
		token: '',
		max_num: 0,
		left_num: 0,
		siteid: 0,
		webname: '代理_',
		appname: '',
		realnum: 10,
		webHisList: [],
		startNum: 1,
		numIng: 0,
		isBuild: true,
		list: [],
		seaNum: 0,
		page: 1,
		enterList: [],
		repeat_num: 0,
		success_num: 0,
		allMin: 2,
		allMax: 500,
		isHeader1: false,
		isHeader2: false,
		isHeader3: false,
		isEnter: true,
		timesJ: '',
		timesT: '',
		isStop: 0,
		seaTime: ''
	},
	watch: {
		numIng: function(){
			document.getElementById("wc-top").style.width = this.numIng*100 + "%";
		},
		count: function(){
			document.getElementById("wc-top2").style.width = this.count*100 + "%";			
		}
	},
	mounted(){
		var self = this;
		chrome.storage.local.get(["max_num", "sum", "memberid", "webname", "webHisList", "url", "key", "allMin", "allMax", "startNum"],function(item){
			if (item) {
				self.max_num = item.max_num
				self.left_num = item.sum
				self.memberid = item.memberid				
				self.url = item.url
				self.key = item.key
				if (item.allMin!=undefined && item.allMin) {
					self.allMin = item.allMin
				}
				if (item.allMax!=undefined && item.allMax) {
					self.allMax = item.allMax
				}
				if (item.webname!=undefined && item.webname) {
					self.webname = item.webname
				}
				if (item.startNum!=undefined && item.startNum) {
					self.startNum = item.startNum
				}				
				console.log(item)
				if (item.webHisList != undefined && item.webHisList.length > 0) {
					self.webHisList = item.webHisList
				}				
			}
		});
		chrome.storage.local.get(["token"],function(item){
			if (item.token) {
				self.token = item.token;
				console.log(self.token);
			}else{
				chrome.windows.create({
	                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
	                width:400,
	                height:400,
	                left:600,
	                top:400,
	                type:'popup'
	            });
			}
		});	
		var el_height = $('.wcc-items')[0].scrollHeight;
		$('.wcc-items')[0].scrollTop = el_height;
		$.get("https://pub.alimama.com/common/adzone/newSelfAdzone2.json?tag="+self.tag+"&t="+self.t+"&pvid="+self.pvid+"&_tb_token_="+self.token+"&_input_charset=utf-8",function(res,status){
			console.log(typeof res)
			console.log(res);
			if (res.constructor == String) {
				chrome.windows.create({
	                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
	                width:400,
	                height:400,
	                left:600,
	                top:400,
	                type:'popup'	                
	            });
	            $.get("https://pub.alimama.com/common/adzone/newSelfAdzone2.json?tag="+self.tag+"&t="+self.t+"&pvid="+self.pvid+"&_tb_token_="+self.token+"&_input_charset=utf-8",function(res,status){
					console.log(typeof res)
					console.log(res);
					if (res.constructor == String) {
						// chrome.storage.local.set("isLogin", 1)
						// localStorage.setItem("token", '')
						layer.msg("访问受限了，请五分钟后再试")
					}
				})        
			}else{
				if (res.ok) {
					var ret =res.data;
		        	self.appList = ret.appList;
		        	self.otherList = ret.otherList;
		        	self.webList = ret.webList;
		        	self.idList = self.webList;
		        	self.selected = self.idList[0];
		        	self.siteid = self.selected.siteid;
		        	var str = [];
		        	goenter();
		        	function goenter(){
		        		$.get("https://pub.alimama.com/common/adzone/adzoneManage.json?&tab=1&toPage="+self.page+"&perPageSize=40&gcid="+self.gcid+"&t="+self.t+"&pvid="+self.pvid+"&_tb_token_="+self.token+"&_input_charset=utf-8",function(ret,status){
							if (ret.ok) {								
								self.seaNum = ret.data.paginator.items;								
							}
					    });
		        	}			        
				}
			}					        	
	    });
	},
	methods: {
		change: function(id){
			var self = this;
			self.statu = id;
			self.gcid = id;
			if (id == 0) {
				self.idList = self.webList;
			}else if (id == 7) {
				self.idList = self.appList;
			}else if (id == 8) {
				self.idList = self.otherList;
			}
			if ( self.idList != undefined && self.idList.length > 0) {
				self.selected = self.idList[0]
			}			
			self.siteid = self.selected.siteid;
			var str = [];
			self.page = 1;
        	goenter();
        	function goenter(){
        		$.get("https://pub.alimama.com/common/adzone/adzoneManage.json?&tab=1&toPage="+self.page+"&perPageSize=40&gcid="+self.gcid+"&t="+self.t+"&pvid="+self.pvid+"&_tb_token_="+self.token+"&_input_charset=utf-8",function(ret,status){
        			if (ret.constructor == String) {
						chrome.windows.create({
			                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
			                width:400,
			                height:400,
			                left:600,
			                top:400,
			                type:'popup'	                
			            });            
					}else if (ret.ok) {
						self.seaNum = ret.data.paginator.items;								
					}
			    });
        	}
		},
		getSelected: function(){
			var self = this;
			self.siteid = self.selected.siteid;
		},
		start(){
			var self = this;
			var max = self.allMax;
			var mid = self.allMin;
			var min = self.left_num;
			if (max > self.max_num) {
				layer.msg("您设置的值过大");
				return false;
			}else if(mid < 0){
				layer.msg("请设置大于0的值");
				return false;
			}else if(mid > max){
				layer.msg("设置的最大值小于最小值");
				return false;
			}
			if (self.isStop == 1){
				clearTimeout(self.timesJ);
				clearTimeout(self.timesT);
			}
			self.isHeader1 = true;
			self.isHeader3 = true;
			self.isStart = true;
			var i = mid;
			chrome.storage.local.set({"allMin": self.allMin});
			chrome.storage.local.set({"allMax": self.allMax});			
			chrome.storage.local.set({"webname": self.webname});
			console.log(mid+min+max+self.max_num)
			layer.msg("已开始自动，请勿关闭页面")
			if ( mid >= min && max < self.max_num) {
				console.log(1111)
				genpid(i)
				function genpid(i) {
				    var timestamp = Date.parse( new Date()).toString();
				    stamp = timestamp.substring(0,10);
				    var obj = stamp;
				    var newDate = new Date();
				    newDate.setTime(obj * 1000);

				    var year = newDate.getFullYear();
				    var month = newDate.getMonth() + 1;
				    month = month < 10 ? "0" + month : month;
				    var date = newDate.getDate();
				    date = date < 10 ? "0" + date : date;

				    var hours = newDate.getHours();
				    hours = hours < 10 ? "0" + hours : hours;
				    var minute = newDate.getMinutes();
				    minute = minute < 10 ? "0" + minute : minute;
				    var second = newDate.getSeconds();
				    second = second < 10 ? "0" + second : second;
				    timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minute + ":" + second;
				    self.startNum ++;
				    chrome.storage.local.set({"startNum": self.startNum});
				    var name = self.webname + stamp+"_"+self.startNum;
				    var data = {
				        'siteid':self.siteid,  // 媒体id
				        'gcid': self.gcid,   // 0 网站推广，7 APP推广，  8导购推广
				        'tag': self.tag,
				        'selectact':'add',
				        'newadzonename':name,
				        '_tb_token_':self.token,
				        'pvid':self.pvid,
				    };
				    $.post("https://pub.alimama.com/common/adzone/selfAdzoneCreate.json",
				        data
				        ,function(ret,status){
				            if (ret.ok) {
				            	if (i > max) {
						        	clearTimeout(self.timesJ)
									self.start();
									return false;
						        }
						        console.log(i);
				            	var pid = "mm_"+self.memberid+"_"+ret.data.siteId+"_"+ret.data.adzoneId;
				            	self.webHisList.push({"name": name,"statu": "创建成功","pid": pid, "timestamp": timestamp});
								chrome.storage.local.set({"webHisList": self.webHisList});
								$.post(self.url,{api:'importpid', key: self.key,pids: self.webHisList,memberid: self.memberid},function(ret,status){							            
							    });
				            	var el_height = $('.wcc-items')[1].scrollHeight;
								$('.wcc-items')[1].scrollTop = el_height + 30;
								setTimeout(function(){
									$.post(self.url,{api:'pidinfo', key: self.key, memberid: self.memberid},function(res,status){
										console.log(typeof res);
										console.log(status);
										var ret = JSON.parse(res);
										if (ret.code == 1) {
											self.sum = ret.left_num;
											self.left_num = ret.left_num;
											self.max_num = ret.max_num;
									        chrome.storage.local.set({"max_num": ret.max_num});
									        chrome.storage.local.set({"sum": ret.left_num});
									        self.start();
										}else{
											layer.msg(ret.message)
										}						        
								    });
								},2000)
								
				            }
				        });
				    self.timesJ = setTimeout(function () {
				        i++;
				        // genpid(i);     
				    }, self.num*1000);
				}
			}else{
				function confirm (){
					$.post(self.url,{api:'pidinfo', key: self.key,memberid: self.memberid},function(res,status){
						console.log(typeof res);
						var ret = JSON.parse(res);
						console.log(ret);
						if (ret.code == 1) {
							self.sum = ret.left_num;
							self.left_num = ret.left_num;
							self.max_num = ret.max_num;
					        chrome.storage.local.set({"max_num": ret.max_num});
					        chrome.storage.local.set({"sum": ret.left_num});
					        self.start();
						}else{
							layer.msg(ret.message)
						}						        
				    });
				}
				self.timesT = setTimeout(function () {
			        confirm();     
			    }, 60000);
			}
		},
		start2: function(){
			var self = this;
			layer.msg("已结束")
			clearTimeout(self.timesJ);
			clearTimeout(self.timesT);
			self.isStart = false;
			self.isHeader1 = false;
			self.isHeader2 = false;
			self.isHeader3 = false;
			self.isStop = 1;
		},
		clear: function(){
			var self = this;
			chrome.storage.local.remove("webHisList", function(){
				if (self.webHisList = []) {
					layer.msg("记录已为空")
					self.startNum = 0;
					chrome.storage.local.set({"startNum": self.startNum});
					window.location.reload()
				}else{
					self.webHisList = [];
					self.startNum = 0;
					chrome.storage.local.set({"startNum": self.startNum});
				    layer.msg("清除完毕")
				    window.location.reload()
				}				
			});
			console.log(self.startNum)
		},
		build: function(id){
			var self = this;
			var max = self.max_num;
			var mid = self.realnum;
			var min = self.left_num;
			var i = 1;
			chrome.storage.local.set({"webname": self.webname});
			if (id == 1) {
				self.isBuild = false;
				if (max - min + 1> mid) {
					genpid(i);			
					function genpid(i) {
						var all = parseInt(mid) +1;
						if (i < all) {
				        	var timestamp = Date.parse( new Date()).toString();
						    stamp = timestamp.substring(0,10);
						    var obj = stamp;
						    var newDate = new Date();
						    newDate.setTime(obj * 1000);

						    var year = newDate.getFullYear();
						    var month = newDate.getMonth() + 1;
						    month = month < 10 ? "0" + month : month;
						    var date = newDate.getDate();
						    date = date < 10 ? "0" + date : date;

						    var hours = newDate.getHours();
						    hours = hours < 10 ? "0" + hours : hours;
						    var minute = newDate.getMinutes();
						    minute = minute < 10 ? "0" + minute : minute;
						    var second = newDate.getSeconds();
						    second = second < 10 ? "0" + second : second;
						    timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minute + ":" + second;
						    self.startNum++;
						    chrome.storage.local.set({"startNum": self.startNum});
						    var name = self.webname + stamp+"_"+self.startNum;
						    var data = {
						        'siteid':self.siteid,  // 媒体id
						        'gcid': self.gcid,   // 0 网站推广，7 APP推广，  8导购推广
						        'tag': self.tag,
						        'selectact':'add',
						        'newadzonename':name,
						        '_tb_token_':self.token,
						        'pvid':self.pvid,
						    };
						    console.log(data);
						    $.post("https://pub.alimama.com/common/adzone/selfAdzoneCreate.json",
						        data
						        ,function(ret,status){
						            console.log(ret);
						            console.log(status);
						            if (ret.ok) {
							        	self.isHeader2 = true;
										self.isHeader3 = true;
						            	var pid = "mm_"+self.memberid+"_"+ret.data.siteId+"_"+ret.data.adzoneId;
						            	self.webHisList.push({"name": name,"statu": "创建成功","pid": pid, "timestamp": timestamp});
										chrome.storage.local.set({"webHisList": self.webHisList});
										$.post(self.url,{api:'importpid', key: self.key,pids: self.webHisList,memberid: self.memberid},function(ret,status){							            
									    });
							        	self.numIng = i/self.realnum;
							        	console.log(self.numIng);
						            	var el_height = $('.wcc-items')[0].scrollHeight;
										$('.wcc-items')[0].scrollTop = el_height;
										if (i == all-1) {
									    	layer.msg("生成完毕");
								        	self.isBuild = true;
								        	self.isHeader2 = false;
											self.isHeader3 = false;
											clearTimeout(self.timesJ);
											return;
									    }
						            }
						        });
						    self.timesJ = setTimeout(function () {
						        i++;
						        genpid(i);     
						    }, self.num*1000);
						    		        							        	
				        }
					}
				}else{
					layer.msg("你的期望生成数量已超上限，上限" + (self.max_num - self.left_num));
				}
			}			
		},
		build2: function(){
			var self = this;
			clearTimeout(self.timesJ);
			self.isBuild = true;
			layer.msg("已结束")
		},
		choose: function(id){
			var self = this;
			self.isActive = id;
			self.idList = self.webList;	    
		    var iid = id -1;
			var el_height = $('.wcc-items')[iid].scrollHeight;
			if (el_height == 0) {
				// self.choose(id)
			}else{
				$('.wcc-items')[iid].scrollTop = el_height;
			}			
		},
		enter: function(){
			var self = this;
				var str = [];
				self.page = 1;
				self.count = 0;
				goenter();
				function goenter(){
	        		$.get("https://pub.alimama.com/common/adzone/adzoneManage.json?&tab=1&toPage="+self.page+"&perPageSize=40&gcid="+self.gcid+"&t="+self.t+"&pvid="+self.pvid+"&_tb_token_="+self.token+"&_input_charset=utf-8",function(ret,status){
	        			if (ret.constructor == String) {
							chrome.windows.create({
				                url:"https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=alimama&redirectURL=http%3A%2F%2Flogin.taobao.com%2Fmember%2Ftaobaoke%2Flogin.htm%3Fis_login%3d1&full_redirect=true",
				                width:400,
				                height:400,
				                left:600,
				                top:400,
				                type:'popup'	                
				            });	            
						}else if (ret.ok) {
							self.isEnter = false
							var pagelist = ret.data.pagelist;
							if (pagelist != null) {
								$.each(ret.data.pagelist,function (index, item) {
						            str.push({"name": item.name,"pid": item.adzonePid});
						        })
						        console.log(str)
								self.seaNum = ret.data.paginator.items;
								var pages = ret.data.paginator.pages;
								if (self.page <= pages) {
									self.isHeader2 = true;
									self.isHeader1 = true;
									self.enterList = str;
									$.post(self.url,{api:'importpid', key: self.key,pids:self.enterList,memberid: self.memberid},function(ret,status){
										console.log(ret)
										var res = JSON.parse(ret);
										if (res.code == 1) {
											layer.msg(res.message)
											self.repeat_num = res.repeat_num;
											self.success_num = res.success_num;
											console.log(self.page)
											console.log(pages)
											self.count = self.page/pages;
											console.log(self.count)
											if (self.count >= 1) {
												clearTimeout(self.seaTime)
												document.getElementById("wc-top2").style.width = "100%";
												self.isEnter = true
												self.isHeader2 = false;
												self.isHeader1 = false;
												return false;
											}
											

											// self.count = (self.repeat_num+self.success_num)/self.seaNum;
										}else{
											self.isEnter = true
											self.isHeader2 = false;
											self.isHeader1 = false;
											layer.msg(res.message)
											clearTimeout(self.seaTime)
											return false;
										}   
								    });
								    self.seaTime = setTimeout(function(){
										self.page ++
										goenter()
									}, 2000)																
								}else{
									console.log(322)
									self.isEnter = true
									self.isHeader2 = false;
									self.isHeader1 = false;
									self.enterList = str;
									console.log(self.enterList);
								}
							}  														
						}
				    });
	        	}			
		},
		enter2: function(){
			var self = this;
			clearTimeout(self.seaTime);
			self.isEnter = true;
			self.isHeader2 = false;
			self.isHeader1 = false;
		}
	}
})
layui.use('slider', function(){
	var slider = layui.slider;

	slider.render({
		elem: '#slideTest1',
		min: 5,
		max: 30,
		value: vm.num,
		change: function(value){
			console.log(value)
			vm.num = value;
		}
	});
	slider.render({
		elem: '#slideTest2',
		min: 5,
		max: 30,
		value: vm.num,
		change: function(value){
			console.log(value)
			vm.num = value;
		}
	});
	slider.render({
		elem: '#slideTest3',
		min: 5,
		max: 30,
		value: vm.num,
		change: function(value){
			console.log(value)
			vm.num = value;
		}
	});
});