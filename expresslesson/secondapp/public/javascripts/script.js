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
		var rsName = document.getElementById('radioName'),
			rsDesc = document.getElementById('rs-description'),
			rsLogo = document.getElementById('currentLogo'),
			rsDOM = document.getElementById(rsId);
		console.log('Selected: ' + rsId);
		rsName.innerHTML=rsDOM.querySelector('.rsName').innerHTML;
		if (rsDesc) rsDesc.innerHTML=rsDOM.querySelector('.otherInfo').innerHTML;
		if (rsLogo) rsLogo.src=rsDOM.querySelector('.thumb-image').src;
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
		}
		audioplayer.load();
	},
	setVolume :function () {
		audioplayer.volume=rsVolume.value/100;
		volumeValue.innerHTML = rsVolume.value/10;
	}
}

document.addEventListener('DOMContentLoaded',luongnvinfo.doFirst,false);
