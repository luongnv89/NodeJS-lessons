var radioService = angular.module('radioService',[]);

radioService.factory('RadioService',function(){
	var currentChannel = {
      "urls": [
        "http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk"
      ],
      "logo": "/images/bbc.jpg",
      "name": "bbc world service",
      "tags": ["news","english"],
      "comments": {
        "star":[],
        "listent":0
      }
    };
    return {
      getCurrentChannel:function () {
        console.log('Return: ' + currentChannel.name);
        return currentChannel;
      },
      setCurrentChannel:function (newChannel) {
        currentChannel = newChannel;
        console.log('Hey!'+currentChannel.name);
        $.amaran({
          content:{
            title:currentChannel.name,
            message:'is playing!',
            info:new Date(),
            icon:'fa fa-add'
          },
          theme:'awesome ok',
          closeButton:true
        });
    }
  };
});