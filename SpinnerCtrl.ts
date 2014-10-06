/// <reference path="../_all.d.ts" />

module Common {
    'use strict';

    export class SpinnerCtrl {

        public static $inject = ['$scope'];

        public static GetDirective() {
            return {
                scope: {
                    value: '=',
                    step: '&?',
                    min: '&?',
                    max: '&?',
                    onChange: '&?',
                    canIncrease: '&?',
                    canDecrease: '&?',
                },
                restrict: 'AE',
                templateUrl: Templates.Spinner,
                controller: SpinnerCtrl,
            }
        }

        constructor(private $scope: ISpinnerScope) {
            this.$scope.vm = this;
        }

        private GetMin(): number {
            return this.$scope.min() || 0;
        }

        private GetMax(): number {
            return this.$scope.max() || Number.MAX_VALUE;
        }

        private GetStep(): number {
            return this.$scope.step() || 1;
        }

        public Increase() {
            this.ChangeValue(1);
        }

        public Decrease() {
            this.ChangeValue(-1);
        }

        private ChangeValue(direction: number) {
            this.$scope.value += direction * this.GetStep();
            this.$scope.onChange({ newValue: this.$scope.value});
        }

        public CanDecrease(): boolean {
            var canDecrease = this.$scope.canDecrease();
            if (typeof (canDecrease) === "boolean") {
                return canDecrease;
            }
            return this.$scope.value - this.GetStep() >= this.GetMin();
        }

        public CanIncrease(): boolean {
            var canIncrease = this.$scope.canIncrease();
            if (typeof(canIncrease) === "boolean") {
                return canIncrease;
            }
            return this.$scope.value + this.GetStep() <= this.GetMax();
        }
    }
}