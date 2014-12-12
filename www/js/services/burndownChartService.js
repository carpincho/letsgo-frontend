app.factory('BurndownChartService', ['$log', 'RESTService', function($log, RESTService){
  var baseUrl = '/projects';


  return {

     getBurndownChartBySprintId: function (projectId, sprintId, callback) {

      console.log("entra al servicio");
      var url = baseUrl+"/" +projectId+'/sprints/'+sprintId+'/burndown_chart';
      RESTService.get(url, callback);

    },




  }

}]);
