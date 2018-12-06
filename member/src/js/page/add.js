require(['../js/config.js'],function(){
	require(['mui','dom','getParams'],function(mui,dom,getParams){
		mui.init();
		
		var id = getParams.id || '';
		
		if(id){
			mui.ajax('/users/api/detail',{
				data:{
					id:id
				},
				success:function(res){
					if(res.code === 1){
						var data = res.data[0];
						dom('.name').value = data.name;
						dom('.age').value = data.age || '';
						dom('.phone').value = data.phone || '';
						dom('.address').value = data.address || '';
						dom('.id-card').value = data.id_card;
					}
				}
			})
		}
		
		//点击添加
		dom('.add-btn').addEventListener('tap',function(){
			var name = dom('.name').value,
				age = dom('.age').value,
				phone = dom('.phone').value,
				address = dom('.address').value,
				idCard = dom('.id-card').value;
				
			if(!name || !idCard){
				alert("姓名或身份证为空")
			}else{
				var url = id ? '/users/api/update' : '/users/api/add';
				mui.ajax(url,{
					data:{
						name:name,
						age:age,
						phone:phone,
						address:address,
						id_card:idCard,
						id:id
					},
					dataType:'json',
					type:'post',
					success:function(res){
						console.log(res);
						if(res.code === 1){
							location.href="../../index.html"
						}
					}
				})
			}
		})
	})
})