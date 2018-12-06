require(['../js/config.js'],function(){
	require(['mui','dom','getParams'],function(mui,dom,getParams){
		mui.init();
		
		var id = getParams.id;
		
		mui.ajax('/users/api/detail',{
			data:{
				id:id
			},
			dataType:'json',
			success:function(res){
				if(res.code === 1){
					var data = res.data[0];
					dom('.name').innerHTML = data.name;
					dom('.age').innerHTML = data.age || '无';
					dom('.phone').innerHTML = data.phone || '无';
					dom('.address').innerHTML = data.address || '无';
					dom('.id-card').innerHTML = data.id_card;
				}
				console.log(res)
			},
			error:function(error){
				console.warn(error);
			}
		})
		//点击修改
		dom('.edit-btn').addEventListener('tap',function(){
			location.href="../../page/add.html?id="+id;
		})
	})
})