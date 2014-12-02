'use strict';

app.filter('projectStatusFromValue', ['ProjectService', function (ProjectService) {
  return function (input) {
    return ProjectService.getLabelFromValue(input);
  }
}]);

app.filter('sprintStatusFromValue', ['SprintService', function (SprintService) {
  return function (input) {
    return SprintService.getLabelFromValue(input);
  }
}]);
