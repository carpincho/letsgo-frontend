app.factory('ChatService', ['$log', '$http', '$rootScope', 'RESTService', function($log, $http, $rootScope,RESTService){
  var baseUrl = '/projects';


  return {


    getAllMsg: function (projectId,callback) {
      var url = baseUrl + "/" + projectId+"/messages";
      RESTService.get(url, callback);
    },

    sendMsg: function (projectId, payload, callback) {
      var url = baseUrl + "/" + projectId +"/messages";

    console.log("url send "+url);
      RESTService.post(url,payload, callback);
    },


  }

}]);
