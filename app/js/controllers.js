angular.module('starter.controllers', ['starter.services'])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })


    .controller('UpdateCtrl', function ($scope, $stateParams, UpdateService, $ionicPopup) {
        $scope.checkUpdate = function () {
            UpdateService.check().then(function (result) {
                    if (result === true) {
                        var download = UpdateService.download();
                        download.then(
                            function (manifest) {
                                console.log('manifest.....:');
                                console.log(JSON.stringify(manifest));

                                var confirmPopup = $ionicPopup.confirm({
                                    title: 'Confirm Update',
                                    template: 'Are you sure you want to update now?'
                                });
                                confirmPopup.then(function (res) {
                                    if (res) {
                                        UpdateService.update();
                                    }
                                });


                            },
                            function (error) {
                                console.log('error....: ');
                                console.log(JSON.stringify(error));
                            }
                        );
                    } else {
                        console.log('not update available');
                    }
                },
                function (error) {
                    console.log('no update available');
                    console.log(JSON.stringify(error));
                });

        }
    })
;
