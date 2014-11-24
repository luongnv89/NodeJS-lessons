function deleteRs (rsId,rsName) {
	var ret = confirm("Are you sure want to delete the "+ rsName + " stream?");
	if(ret==true){
		var url = 'admin/delete';
		postData(url,{rsId:rsId},function (response) {
			console.log(response);
			var data = JSON.parse(response);
			if(data.success){
				document.getElementById(rsId).remove();
				$.amaran({
				    content:{
				        title:rsName,
				        message:'was delete successfully!',
				        info:new Date(),
				        icon:'fa fa-remove'
				    },
				    theme:'awesome ok',
				    closeButton:true
				});
			}else{
				$.amaran({
					content:{
						title:rsName,
						message:' was deleted unsuccessfully!'+'Code: '+data.err.code +'. Message:'+ data.err.message,
						info:new Date(),
				        icon:'fa fa-remove'
					},
					theme:'awesome error',
					closeButton:true
				});
			}
		});
	}
}

function updateStream (formId) {
	var rsId = formId.replace('editForm_','');
	var params = {};
	var formEdit = document.getElementById(formId);
	params.id=rsId;
	params.rsName = formEdit.querySelector('.rsName').value;
	params.rsTags = formEdit.querySelector('.rsTags').value;
	params.rsUrls = formEdit.querySelector('.rsUrls').innerHTML;
	params.rsLogo = formEdit.querySelector('.rsLogo').value;
	console.log(JSON.stringify(params));
	postData('admin/edit',params,function (response) {
		var data = JSON.parse(response);
		if(data.success){
			var newContent = new EJS({url:'/templates/item.ejs'}).render(response);
			document.getElementById(rsId).remove();
			document.getElementById('listAllChannel').appendChild(newContent);

			$.amaran({
			    content:{
			        img:data.channel.logo,
			        user:data.channel.name+' edited successfully!',
			        message:'Tasg: ' + data.channel.tags
			       },
			    theme:'user white',
			    closeButton:true
			});
		}else{
			$.amaran({
			    content:{
			        img:'/images/defaultRsLogo.png',
			        user:'A radio stream was edited unsuccessfully!',
			        message:'Code: '+data.err.code +'. Message:'+ data.err.message
			       },
			    theme:'user red',
			    closeButton:true
			});
		}
	});
};