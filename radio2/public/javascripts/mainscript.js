document.addEventListener('DOMContentLoaded',function () {
	var btnSearch = document.getElementById('btnSearch');
	btnSearch.addEventListener('click',function () {
		var inputText = document.getElementById('ipSearchBox').value;
		if(inputText==""){
			alert('Search box is empty!');
		}else{
			var url = "/search/"+inputText;
			getData(url,updateListChannels);
		} 
	},false);
	var btnAddnewSubmit = document.getElementById('btnAddnewSubmit');
	btnAddnewSubmit.addEventListener('click',submitAddnewForm,false);
},false);

function searchByTag (t) {
	var url = "/tags/"+t;
	getData(url,updateListChannels);
}

function updateListChannels (data) {
	if((window.location.pathname).indexOf('admin')>0){
		data.admin=true;
	}else{
		data.admin=false;
	}
	var newContent = new EJS({url:'/templates/listChannels.ejs'}).render(data);
	document.getElementById('listAllChannel').innerHTML=newContent;
}

function submitAddnewForm () {
	var params = {};
	var formAddnew = document.getElementById('formAddnew').value;
	params.rsName = document.querySelector('#rsName').value;
	params.rsTags = document.querySelector('#rsTags').value;
	params.rsUrls = document.querySelector('#rsUrls').innerHTML;
	params.rsLogo = document.querySelector('#rsLogo').value;
	console.log(JSON.stringify(params));
	postData('addnew',params,function (response) {
		console.log(response);
		test=response;
		var data = JSON.parse(response);
		if((window.location.pathname).indexOf('admin')>0){
			data.admin=true;
		}else{
			data.admin=false;
		}
		var newContent = new EJS({url:'templates/item.ejs'}).render(data);
		document.getElementById('listAllChannel').appendChild(newContent);
		if(data.success){
			$.amaran({
			    content:{
			        img:data.channel.logo,
			        user:data.channel.name+' added successfully!',
			        message:'Tasg: ' + data.channel.tags
			       },
			    theme:'user white',
			    closeButton:true
			});
		}else{
			$.amaran({
			    content:{
			        img:data.channel.logo,
			        user:'A radio stream was added unsuccessfully!',
			        message:'Code: '+data.err.code +'. Message:'+ data.err.message
			       },
			    theme:'user red',
			    closeButton:true
			});
		}
	});
};

function getData (url,callback) {
	var http = new XMLHttpRequest();
	http.open('GET',url,true);
	http.onload = function () {
		var data = JSON.parse(this.responseText);
		return callback(data);
	};
	http.send();
}

function postData (url,data,callback) {
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			return callback(http.responseText);
		}
	}
	http.send(JSON.stringify(data));
}