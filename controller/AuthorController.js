window.AuthorController = function($scope, $http, $routeParams, $location) {

    let authorURL = `http://localhost:3000/authors`;
    $scope.getAuthor = function() {
        $http.get(authorURL)
        .then(function(response) {
            if (response.status == 200) {
                $scope.listAuthor = response.data;
            }
        })
    }
    $scope.getAuthor();

    $scope.onClose = function() {
        $scope.inputValue = {
            name: '',
            gender: '',
            age: '',
            address: ''
        }
    };

    $scope.formSubmit = function() {
        if($routeParams.id) {
            let id = $routeParams.id;
            $http.put(
                `${authorURL}/${id}`,
                $scope.inputValue
            ).then(function(response) {
                if(response.status == 200) {
                    $location.path('/tac-gia');
                }
            })
            $scope.onClose();
            return;
        }

        console.log($scope.inputValue);
        if($scope.formAuthor.$valid) {
            console.log(123);
            $http.post(
                authorURL,
                $scope.inputValue
            )
            .then(function(response) {
                if (response.status == 201) {
                    alert('Thành công');
                    $location.path('/tac-gia');
                }
            })


        }else {
            $scope.formAuthor.$submitted = true;
        }
    }

    $scope.onEdit = function(id) {
        if(id) {
            $location.path(`/tac-gia/${id}/edit`);
        }
    }

    if($routeParams.id) {
        $http.get(`${authorURL}/${$routeParams.id}`)
        .then(function(response) {
            console.log(response);
            if (response.status == 200) {
                $scope.inputValue = response.data;
            }
        })
    }

    $scope.onDelte = function(id) {
        let checkDel = confirm('Bạn có chắc muốn xóa không ?');
        if(checkDel) {
            $http.delete(`${authorURL}/${id}`);
        }
    }
}