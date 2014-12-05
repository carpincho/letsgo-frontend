'use strict';

app.directive('fadeIn', function () {
  return {
    compile:function (elm) {
      $(elm).css('opacity', 0.0);
      return function (scope, elm, attrs) {
        $(elm).animate({ opacity: 1.0 }, 400, "swing");
      };
    }
  };
});


app.directive('showErrors', function() {
  return {
    restrict: 'A',
    require:  '^form',
    link: function (scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl   = el[0].querySelector("[name]");
      // convert the native text box element to an angular element
      var inputNgEl = angular.element(inputEl);
      // get the name on the text box so we know the property to check
      // on the form controller
      var inputName = inputNgEl.attr('name');

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function() {
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      })

    }
  }
});

app.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}]);

app.directive('dateLowerThan', ["$filter", function ($filter) {
  return {
    require: 'ngModel',
    link: function (scsope, elm, attrs, ctrl) {
      var isValidDate = function (dateStr) {
          if (dateStr == undefined)
            return false;
          var dateTime = Date.parse(dateStr);
          if (isNaN(dateTime)) {
            return false;
          }
          return true;
        };

        var getDateDifference = function (fromDate, toDate) {
          return Date.parse(toDate) - Date.parse(fromDate);
        };

        var isValidDateRange = function (fromDate, toDate) {
          if (fromDate == "" || toDate == "")
            return true;
            if (isValidDate(fromDate) == false) {
              return false;
            }
            if (isValidDate(toDate) == true) {
              var days = getDateDifference(fromDate, toDate);
              if (days < 0) {
                return false;
              }
            }
            return true;
          };
      var validateDateRange = function (inputValue) {
        var fromDate = $filter('date')(attrs.dateLowerThan, 'yyyy/MM/dd');
        var toDate = $filter('date')(inputValue, 'yyyy/MM/dd');
        var isValid = isValidDateRange(fromDate, toDate);
        ctrl.$setValidity('dateLowerThan', isValid);
        return inputValue;
      };

      ctrl.$parsers.unshift(validateDateRange);
      ctrl.$formatters.push(validateDateRange);
      attrs.$observe('dateLowerThan', function () {
        validateDateRange(ctrl.$viewValue);
      });
    }
  };
}]);

app.directive('dateGreaterThan', ["$filter", function ($filter) {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var isValidDate = function (dateStr) {
        if (dateStr == undefined)
          return false;
          var dateTime = Date.parse(dateStr);
          if (isNaN(dateTime)) {
            return false;
          }
          return true;
        };

        var getDateDifference = function (fromDate, toDate) {
          return Date.parse(toDate) - Date.parse(fromDate);
        };

        var isValidDateRange = function (fromDate, toDate) {
          if (fromDate == "" || toDate == "")
            return true;
            if (isValidDate(fromDate) == false) {
              return false;
            }
            if (isValidDate(toDate) == true) {
              var days = getDateDifference(fromDate, toDate);
              if (days < 0) {
                return false;
              }
            }
            return true;
          };
      var validateDateRange = function (inputValue) {
        var fromDate = $filter('date')(inputValue, 'yyyy/MM/dd');
        var toDate = $filter('date')(attrs.dateGreaterThan, 'yyyy/MM/dd');
        var isValid = isValidDateRange(fromDate, toDate);
        ctrl.$setValidity('dateGreaterThan', isValid);
        return inputValue;
      };

      ctrl.$parsers.unshift(validateDateRange);
      ctrl.$formatters.push(validateDateRange);
      attrs.$observe('dateGreaterThan', function () {
        validateDateRange(ctrl.$viewValue);

      });
    }
  };
}]);
