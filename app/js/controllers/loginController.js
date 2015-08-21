var loginController = angular.module('loginController',[]);
loginController.controller('LoginCtrl',['$scope','$http','Login','$location',"$rootScope",

	function LoginCtrl($scope,$http,Login,$location,$rootScope)
	{
		$rootScope.pagename="partials.index.title";
		$scope.loginfunction=function()
		{

			var login =$scope.login;
			var password=$scope.password;

			if(login!=undefined && password!=undefined)
			{
				var callbackfunc=function(result){
					if(result)
					{
						$location.path('/menu');

						$scope.errors="";
						$scope.$on('$locationChangeSuccess',function(e,next,current){
			 			window.location.reload();
			 			});
			 				//window.location.reload();

					}
					else
						$scope.errors="partials.error.verif";
				};

				Login.dologin(login,password,callbackfunc)
			}
			else if(login===undefined && password!=undefined)
			{

				$scope.errors="partials.error.blank";
			}
			else if(password=="" && login!="")
			{
				$scope.errors="partials.error.blank";
			}
			else if(password===undefined && login===undefined)
				$scope.errors="partials.error.allblank";



		}


	}]);
