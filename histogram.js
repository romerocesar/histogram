angular.module('histogram', [])
    .controller(
        'histogramCtrl',
        function($http, $log, $scope) {
            $log.debug('fetching data for histogram.');
            $http.get('data.json').success(function(data){
                $log.debug('got data ' + angular.toJson(data));
                $scope.data = data;
            });
        })
    .directive(
        'histogram',
        function($log) {

            // Define the chart that will be used to render the data.
            var _barChart = nv.models.discreteBarChart()
                .x(function(d) { return d.label})
                .y(function(d) { return d.value})
                .tooltips(true)
                .showValues(true);

            // renders the bars of the histogram by binding the given
            // data as the values of a single data series and calling
            // the _barChart defined above.
            function renderBars(data) {
                var chartData = [
                    {
                        key: 'residues',
                        values: data
                    },
                ];
                d3.select('#chart svg')
                    .datum(chartData)
                    .call(_barChart);
            }

            return {
                link: function(scope, elem, attrs, ctrl) {
                    $log.info('entering histogram link function');
                    scope.$watch('data', renderBars);
                },
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'histogram.html'
            }
        });
