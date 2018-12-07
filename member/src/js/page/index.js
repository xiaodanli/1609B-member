require(['./js/config.js'],function(){
	require(['mui','dom'],function(mui,dom){
		var pagenum = 0,	//第几页
			pageSize = 10,	//每页条数
			status = false,
			total;//是否到最底	
			
		mui.init({
			pullRefresh:{
				container:'#pullrefresh',
				up:{
					auto:true,
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		
		//上拉加载
		function pullupRefresh(){
			setTimeout(function(){
				pagenum++;
				getList(pagenum,pageSize);
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(total === pagenum);
			},1500)
		}
		
		//滚动
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		
		function getList(){
			//请求数据
			mui.ajax('/users/api/userlist',{
				dataType:'json',
				data:{
					pagenum:pagenum,
					pageSize:pageSize
				},
				success:function(res){
					console.log(res);
					if(res.code === 1){
						renderList(res.data);
						total = res.total;
					}
				}
			})		
		}
		
		
		//渲染数据
		function renderList(data){
			var str = '';
			
			data.forEach(function(item){
				str += `
					<li class="mui-table-view-cell">
						${item.name}
						<div class="btns">
							<button type="button" class="mui-btn mui-btn-primary" data-id="${item.id}">
								查看详情
							</button>
							<button type="button" class="mui-btn mui-btn-danger"  data-id="${item.id}">
								删除
							</button>
						</div>
					</li>
				`
			});
			
			document.querySelector('.list').innerHTML += str;
		}
		
		//点击添加去添加界面
		var addBtn = document.querySelector('.mui-icon-plus');
		addBtn.addEventListener('tap',function(){
			location.href="./page/add.html";
		})
		
		//点击查看详情界面
		mui('.list').on('tap','.mui-btn-primary',function(){
			var id = this.getAttribute('data-id');
			location.href="../../page/detail.html?id="+id;
		})
		
		//点击删除
		mui('.list').on('tap','.mui-btn-danger',function(){
			var id = this.getAttribute('data-id');
			var that = this;
			mui.confirm('是否确定删除？','提示',["取消","确定"],function(index){
				if(index.index === 1){
					mui.ajax('/users/api/del',{
						data:{
							id:id
						},
						success:function(res){
							if(res.code === 1){
								dom('.list').removeChild(that.parentNode.parentNode)
							}
						}
					})
				}
			})
		})
	})
})