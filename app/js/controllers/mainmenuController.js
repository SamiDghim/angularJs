var mainmenuController =angular.module('mainmenuController',[]);
mainmenuController.controller('MainMenuCtrl',['$location','Login','$scope','$rootScope', '$route', '$translate',

	function MainMenuCtrl($location,Login,$scope,$rootScope){
		Login.requireAuth();

		   $rootScope.pagename="partials.index.home";

	}
	]);
