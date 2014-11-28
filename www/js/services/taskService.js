app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){
  var currentProjectID = 1;
  var currentSprintID = 1;
  var currentStoryID = 1;
  var currentProjectName = "someProject";
  var currentSprintName = "someSprint";
  var currentStoryName = "SomeStory";
  return{

    getCurrentStory: function(){
      var currentStory = currentProjectName+" > "+currentSprintName+" > "+currentStoryName;
      return currentStory;
    },

    getCurrentStoryID:function(){
      return currentStoryID;
    },

    getTaskPath: function(){
      var taskPath = "/projects/" + currentProjectID + "/sprints/" + currentSprintID + "/stories/" + currentStoryID + "/tasks";
      return taskPath;
    },

    /*getAllTasks: function(currentTaskPath){
    var get_all_tasks_url =currentTaskPath;
    var currentTasks = [];
    RESTService.get(get_all_tasks_url, function(data){
    console.log('Fetching ' + data.length + ' tasks from server...');
    currentTasks = data;
  });
  return currentTasks;
}*/
};
}]);
