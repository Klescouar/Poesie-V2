var app = angular.module('appPoesie', []);

app.controller('poesieCtrl', ["$scope", "$http", function($scope, $http) {



    $http.get("js/dico.json")
        .success(function(data) {
            $scope.dico = data;
            $scope.error = false;
            var dicolength = $scope.dico.length;

            $scope.myFunct = function(keyEvent, word) {
                var wordFin = word.toLowerCase();;
                if (keyEvent.which === 32) {
                  
                    $scope.wordFinal = [];
                    $scope.syno = [];
                    $scope.ana = [];
                    $scope.rimes = [];
                    $scope.homo = [];
                    $scope.anto = [];

                    // var lastIndex = word.lastIndexOf(" ");
                    wordFin = wordFin.split(" ");
                    wordFin = wordFin[wordFin.length - 1]
                    console.log(wordFin);


                    if ($scope.categories[0].status == false && $scope.categories[1].status == false && $scope.categories[2].status == false && $scope.categories[3].status == false && $scope.categories[4].status == false) {
                        $scope.error = true;
                    }

                    if ($scope.categories[0].status == true) {
                        if ($scope.dico[wordFin].synonymes) {
                            for (var i = 0; i < $scope.dico[wordFin].synonymes.length; i++) {
                                $scope.syno.push($scope.dico[wordFin].synonymes[i]);
                                console.log($scope.syno);
                            }
                        } else {
                            $scope.syno.push("Pas de synonymes disponibles pour ce mot")
                        }
                    }
                    if ($scope.categories[4].status == true) {
                        if ($scope.dico[wordFin].antonymes) {
                            for (var i = 0; i < $scope.dico[wordFin].antonymes.length; i++) {
                                $scope.anto.push($scope.dico[wordFin].antonymes[i]);
                            }
                        } else {
                            $scope.anto.push("Pas d'antonymes disponibles pour ce mot")
                        }
                    }

                    if ($scope.categories[2].status == true) {
                        if ($scope.dico[wordFin].anagrammes) {
                            for (var i = 0; i < $scope.dico[wordFin].anagrammes.length; i++) {
                                $scope.ana.push($scope.dico[wordFin].anagrammes[i]);
                            }
                        } else {
                            $scope.ana.push("Pas d'anagrammes disponibles pour ce mot")
                        }
                    }

                    if ($scope.categories[1].status == true) {
                        var numPoint = $scope.dico[wordFin].phonetique.lastIndexOf(".");
                        var lastSyl = $scope.dico[wordFin].phonetique.slice(numPoint, $scope.dico[wordFin].phonetique.length);
                        if (numPoint !== -1) {
                            for (var mots in $scope.dico) {
                                var numPointDico = $scope.dico[mots].phonetique.lastIndexOf(".");
                                var lastSylDico = $scope.dico[mots].phonetique.slice(numPointDico, $scope.dico[mots].phonetique.length);
                                if (lastSyl === lastSylDico && wordFin !== mots) {
                                    $scope.rimes.push(mots)
                                }
                            }
                        } else {
                            for (var mots in $scope.dico) {
                                var numPointDico = $scope.dico[mots].phonetique.lastIndexOf(".");
                                var lastSylDico = $scope.dico[mots].phonetique.slice(numPointDico, $scope.dico[mots].phonetique.length);
                                if (($scope.dico[wordFin].phonetique === $scope.dico[mots].phonetique || $scope.dico[wordFin].phonetique === lastSylDico) && wordFin !== mots) {
                                    $scope.rimes.push(mots)
                                }
                            }
                        }
                        if ($scope.rimes.length === 0) {
                            $scope.rimes.push("Pas de rimes disponibles pour ce mot  ")
                        }
                    }
                    if ($scope.categories[3].status == true) {
                        for (var mots in $scope.dico) {
                            if ($scope.dico[wordFin].phonetique === $scope.dico[mots].phonetique && wordFin !== mots) {
                                $scope.homo.push(mots)
                            }
                        }
                        if ($scope.homo.length === 0) {
                            $scope.homo.push("Pas d'homophones disponibles pour ce mot")
                        }
                    };
                };
            };
        });


    $scope.categories = [{
        name: "Synonymes",
        status: false,
    }, {
        name: "Rimes",
        status: false,
    }, {
        name: "Anagrammes",
        status: false,
    }, {
        name: "Homophones",
        status: false,
    }, {
        name: "Antonymes",
        status: false,
    }];


    $scope.select = function() {
        if (this.category.status === false) {
            $scope.error = false;
            this.category.status = true;
        } else if (this.category.status === true) {
            this.category.status = false;
        }
    }
}]);
