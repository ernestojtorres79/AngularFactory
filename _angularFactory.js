var app = angular.module("carModule", []);

app.controller('carController', function ($scope, $http) {

    $scope.carArray = [];
    $scope.records = 2;
    $scope.limits = [
        {
            num: 2,
            text: "Show 2 records"
        },
        {
            num: 3,
            text: "Show 3 records"
        },
        {
            num: 4,
            text: "Show 4 records"
        },
        {
            num: 10,
            text: "Show 10 records"
        },
        {
            num: 20,
            text: "Show 20 records"
        }
    ];

    var carContructor = function (modelIn, makeIn, valueIn) {
        this.Model = modelIn;
        this.Make = makeIn;
        this.Value = valueIn;
    }

    $scope.carCollector = function () {
        var newCar = new carContructor($scope.make, $scope.model, $scope.value);
        $scope.postVehicles(newCar);
    }

    $scope.getFireBase = function () {
        $http.get("https://angularfactory1014.firebaseio.com/.json").success(
            function (data, status, header, config) {
                for (var x in data) {
                    var getDBDump = data[x];
                    getDBDump.key = x;
                    $scope.carArray.push(getDBDump);
                }

            }
            ).error(
                function (data, status, header, config) {
                    console.log(data + " " + status);
                }
            );
    }

    $scope.postVehicles = function (newCar) {
        $http.post("https://angularfactory1014.firebaseio.com/.json", newCar).success(
            function (data, status, header, config) {
                newCar.key = data.name;
                $scope.carArray.push(newCar);
            }
            ).error(
                function (data, status, header, config) {
                    console.log(data + " " + status);
                });
    }

    $scope.delVehicles = function (key) {
        $http.delete("https://angularfactory1014.firebaseio.com/" + key + ".json").success(
                function (data, status, header, config) {
                    for (var i in $scope.carArray) {
                        if ($scope.carArray[i].key === key) {
                            $scope.carArray.splice(i, 1);
                            break;
                        }
                    }
                }
            ).error(
            function (data, status, header, config) {
                consolo.log(data + " " + status);
            });
    }

    $scope.editVehicles = function (i) {
        var keyUrl = $scope.carArray[i].key;
        console.log(keyUrl);
        $scope.carArray[i].Model = $scope.model;
        $scope.carArray[i].Make = $scope.make;
        $scope.carArray[i].Value = $scope.value;
        $scope.carArray[i].key = keyUrl;
        $http.put("https://angularfactory1014.firebaseio.com/" + keyUrl + ".json", $scope.carArray[i]).success(
            function (data, status, header) {
                
            }).error(function (data, status, header, config) {
                consolo.log(data + " " + status);
            });
    }

    $scope.getFireBase();

});

