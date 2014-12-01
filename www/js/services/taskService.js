app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){


  var currentProjectName = "someProject";
  var currentSprintName = "someSprint";
  var currentStoryName = "SomeStory";
var taskStatusOptions = [
  { label:'Not Started ', value: 0 },
  { label:'In Progress', value: 1 },
  { label:'Completed', value: 2 },
  { label:'Blocked', value: 3 },
];
  return{



    getOptionByValue: function (value){
      var i=0;
      var foundOption = {};

      for (i=0; i<taskStatusOptions.length; i++){
        if(taskStatusOptions[i].value == value){
          foundOption = taskStatusOptions[i]
          break;
        }
      }
      return foundOption;
    },

    getLabelFromValue: function(value){
      var label = '';
      for (var i=0; i<taskStatusOptions.length; i++){
        if(taskStatusOptions[i].value == value){
          label = taskStatusOptions[i].label;
          break;
        }
      }
      return label;
    },
    getTaskStatusOptions: function(){
      return taskStatusOptions;
    },

    getTaskPath: function(projectId, sprintId, storyId){
      return "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";
    },

    getAllTasks: function(projectId, sprintId, storyId,callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";
      RESTService.get(url, callback);
    },

    createTask: function(projectId, sprintId, storyId,payload, callback){
      var url = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";
      RESTService.post(url, payload, callback);
    },

    getTaskById: function (projectId, sprintId, storyId, taskId, callback) {
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.get(url, callback);
    },

    editTask: function(projectId, sprintId, storyId, taskId, payload, callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.put(url, payload, callback);
    },

    deleteTask: function(projectId, sprintId, storyId, taskId, callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.delete(url, callback);
    },
    assignDevelopersToTask: function(projectId, sprintId, storyId, taskId, payload, callback){
      var url = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId + "/assign_devs";
      RESTService.put(url, payload, callback);
    },
    unassignDevelopersToTask: function(projectId, sprintId, storyId, taskId, payload, callback){
      var url = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId + "/unassign_devs";
      RESTService.put(url, payload, callback);
    }

  };
}]);
