luongnvinfo={
	doFirst:function () {
		audioplayer = document.getElementById('audioplayer');
		audioplayer.volume=0.5;
		btnPlay = document.getElementById('btnPlay');
		rsVolume = document.getElementById('volume');
		rsVolume.value = audioplayer.volume*100;
		rsVolume.addEventListener('change',luongnvinfo.setVolume,false);
		volumeValue = document.getElementById('volumeValue');
		volumeValue.innerHTML = rsVolume.value/10;

		btnNext = document.getElementById('btnNext');
		btnNext.onclick = function () {
			var currentIndex = audioplayer.getAttribute('currentRS');
			if(!document.getElementById(String(Number(currentIndex)+1))){
				luongnvinfo.selectStream(0);	
			}else{
				luongnvinfo.selectStream(Number(currentIndex)+1);	
			}
		}
		btnPrevious = document.getElementById('btnPrevious');
		btnPrevious.onclick = function () {
			var currentIndex = audioplayer.getAttribute('currentRS');
			if(currentIndex==0){
				alert('No previous radio stream');
			}else{
				luongnvinfo.selectStream(Number(currentIndex)-1);	
			}
		}

		btnPlay.onclick = function () {
			luongnvinfo.btnPlayClick();
		}

		rsName = document.getElementById('radioName');
		rsDesc = document.getElementById('rs-description');
		rsLogo = document.getElementById('currentLogo');

		if(localStorage.getItem('rsName')){
			console.log('Found stream in local');
			if (rsName) rsName.innerHTML=localStorage.getItem('rsName');
			if (rsDesc) rsDesc.innerHTML = localStorage.getItem('rsDesc');
			if (rsLogo) rsLogo.src = localStorage.getItem('rsLogo');
			var listSource = audioplayer.querySelectorAll('source');
			for(var i=0;i<listSource.length;i++){
				listSource[i].remove();
			}
			var i=0;
			while(localStorage.getItem('rsUrl'+i)){
				var source = document.createElement('source');
				source.src = localStorage.getItem('rsUrl'+i);
				audioplayer.appendChild(source);
				i++;
			}
			audioplayer.load();
		}
	},
	btnPlayClick:function () {
		if(audioplayer.paused){
			btnPlay.setAttribute('class','fa fa-pause fa-2x');
			audioplayer.play();
		}else{
			btnPlay.setAttribute('class','fa fa-play fa-2x');
			audioplayer.pause();
		}
	},
	selectStream:function (rsId) {
		var rsDOM = document.getElementById(rsId);
		console.log('Selected: ' + rsId);
		var rName = rsDOM.querySelector('.rsName').innerHTML,
			rDesc = rsDOM.querySelector('.detail-desc').title,
			rLogo = rsDOM.querySelector('.thumb-image').src;
		//Save to localStorage
		localStorage.clear();
		localStorage.setItem('rsName',rName);
		localStorage.setItem('rsDesc',rDesc);
		localStorage.setItem('rsLogo',rLogo);

		if (rsName) rsName.innerHTML=rName;
		if (rsDesc) rsDesc.innerHTML = rDesc;
		if (rsLogo) rsLogo.src = rLogo;
		audioplayer.setAttribute('currentRS',rsId);
		var listSource = audioplayer.querySelectorAll('source');

		for(var i=0;i<listSource.length;i++){
			listSource[i].remove();
		}
		urlStream = rsDOM.getAttribute('rsurls').split(',');
		console.log(rsDOM);
		for(var j=0;j<urlStream.length;j++){
			var source = document.createElement('source');
			source.src = urlStream[j];
			audioplayer.appendChild(source);
			localStorage.setItem('rsUrl'+i,urlStream[j]);
		}
		audioplayer.load();
	},
	setVolume :function () {
		audioplayer.volume=rsVolume.value/100;
		volumeValue.innerHTML = rsVolume.value/10;
	},
	changeLayout:function (layout) {
		var newURL;
		if(layout===1){
			newURL = window.location.origin + window.location.pathname+',compact';
		}else{
			newURL = window.location.origin + (window.location.pathname).replace('compact,','').replace(',compact','');
		}
		console.log("New URL: " + newURL);
		window.location=newURL;
	},
	filter:function (tag,currentParams,added) {
		console.log('new filter with tag: ' + tag +' and : ' + added+"\n Current Params: " + currentParams);
		var newURL;
		if(added){
			newURL = window.location.origin + '/'+currentParams+','+tag;
		}else{
			newURL = window.location.origin +'/'+ currentParams.replace(tag+',','').replace(','+tag,'');
		}
		console.log("New URL: " + newURL);
		window.location=newURL;
	},
	postFilter:function () {
		var filter = document.getElementById('filter');
		var checkList = filter.querySelectorAll('input');
	}
}

document.addEventListener('DOMContentLoaded',luongnvinfo.doFirst,false);
