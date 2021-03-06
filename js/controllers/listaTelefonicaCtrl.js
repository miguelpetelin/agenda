

angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $auth, $http, contatosAPI, operadorasAPI, serialGenerator) {
      $scope.app = "Lista Telefônica";
      $scope.contatos = [];

      $scope.operadoras = [];

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
      };

      var carregarContatos = function () {
       contatosAPI.getContatos().success(function (data, status) {
          $scope.contatos = data;
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      }

      var carregarOperadoras = function () {
       operadorasAPI.getOperadoras().success(function (data, status) {
          $scope.operadoras = data;
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };
      $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContatos(contato).success(function (data) {
          delete $scope.contato;
          $scope.contatoForm.$setPristine();
          carregarContatos();
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };

      $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
          if(!contato.selecionado) return contato;
        }); 
      };

      $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
          return contato.selecionado;
        });
      };
      $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
      };
      carregarContatos();
      carregarOperadoras();
    });