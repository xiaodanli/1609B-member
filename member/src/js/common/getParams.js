define(function(){
	var url = location.search;
	
	var params = {};
	
	if(url.indexOf('?') != -1){
		url = url.substr(1);
		
		var bArr = url.split('&');
		
		bArr.forEach(function(item){
			var sArr = item.split('=');  //[id,10]   [num,10]
			
			params[sArr[0]] = sArr[1];
		})
	}
	
	return params
	
})