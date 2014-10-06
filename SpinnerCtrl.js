/// <reference path="../_all.d.ts" />
var Common;
(function (Common) {
    'use strict';

    var SpinnerCtrl = (function () {
        function SpinnerCtrl($scope) {
            this.$scope = $scope;
            this.$scope.vm = this;
        }
        SpinnerCtrl.GetDirective = function () {
            return {
                scope: {
                    value: '=',
                    step: '&?',
                    min: '&?',
                    max: '&?',
                    onChange: '&?',
                    canIncrease: '&?',
                    canDecrease: '&?'
                },
                restrict: 'AE',
                templateUrl: Common.Templates.Spinner,
                controller: SpinnerCtrl
            };
        };

        SpinnerCtrl.prototype.GetMin = function () {
            return this.$scope.min() || 0;
        };

        SpinnerCtrl.prototype.GetMax = function () {
            return this.$scope.max() || Number.MAX_VALUE;
        };

        SpinnerCtrl.prototype.GetStep = function () {
            return this.$scope.step() || 1;
        };

        SpinnerCtrl.prototype.Increase = function () {
            this.ChangeValue(1);
        };

        SpinnerCtrl.prototype.Decrease = function () {
            this.ChangeValue(-1);
        };

        SpinnerCtrl.prototype.ChangeValue = function (direction) {
            this.$scope.value += direction * this.GetStep();
            this.$scope.onChange({ newValue: this.$scope.value });
        };

        SpinnerCtrl.prototype.CanDecrease = function () {
            var canDecrease = this.$scope.canDecrease();
            if (typeof (canDecrease) === "boolean") {
                return canDecrease;
            }
            return this.$scope.value - this.GetStep() >= this.GetMin();
        };

        SpinnerCtrl.prototype.CanIncrease = function () {
            var canIncrease = this.$scope.canIncrease();
            if (typeof (canIncrease) === "boolean") {
                return canIncrease;
            }
            return this.$scope.value + this.GetStep() <= this.GetMax();
        };
        SpinnerCtrl.$inject = ['$scope'];
        return SpinnerCtrl;
    })();
    Common.SpinnerCtrl = SpinnerCtrl;
})(Common || (Common = {}));
//# sourceMappingURL=SpinnerCtrl.js.map
