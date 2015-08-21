'use strict';
var kioskapp =angular.module("kioskapp",[
	'ngRoute',
	'loginController',
	'mainmenuController',
	'AccessServices',
	'applicationController',
	'restService',
 	'applicationService',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'pascalprecht.translate',
	'tmh.dynamicLocale'

	]).constant('LOCALES', {
	'locales': {
		'fr_FR': 'Français',
		'us_US': 'English',
		'ar_AR':'العربيه'
	},
	'preferredLocale': 'fr_FR'
})

	// Angular Translate
	.config(function ($translateProvider,   LOCALES) {

		$translateProvider.useStaticFilesLoader({
			prefix: 'resource/locale-',
			suffix: '.json'
		});

		$translateProvider.preferredLanguage(LOCALES.preferredLocale);
		$translateProvider.useLocalStorage();
	})
	// Angular Dynamic Locale
	.config(function (tmhDynamicLocaleProvider) {
		tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
	});

kioskapp.config(["$routeProvider",
	function($routeProvider){
		$routeProvider.
			when('/login',{
				templateUrl:'partials/Login.html',
				controller:'LoginCtrl'
			}).
      when('/menu',{
        templateUrl:'partials/mainmenus.html',
        controller:'MainMenuCtrl'
      }).
			when('/profile',{
				templateUrl:'partials/profile.html',
				controller:'AccountCtrl'
			}).
      when('/editprofile/:id',{
        templateUrl:'partials/editprofile.html',
        controller:'EditprofileCtrl'
      }).
			when('/absenceRequest/list',{
				templateUrl:'partials/absencelist.html',
				controller:'absenceCtrl'
			}).
			when('/absenceRequest/edit/:id',{
				templateUrl:'partials/editabsence.html',
				controller:'editAbsenceCtrl'
			}).
			when('/absenceRequest/new',{
				templateUrl:'partials/addabsence.html',
				controller:'AddabsenceCtrl'
			}).
			when('/advanceSalary',{
				templateUrl:'partials/timeaccount.html',
				controller:'advanceSalaryCtrl'
			}).
			when('/timerecords',{
				templateUrl:'partials/timerecord.html',
				controller:'TimeRecCtrl'
			}).
			when('/addtimerecord/:reqId',{
				templateUrl:'partials/addnewtimerec.html',
				controller:'AddTimeRecCtrl'
			}).
			when('/timestatus',{
				templateUrl:'partials/timestatus.html',
				controller:"TimeStatusCtrl"
			}).
			when("/viewer/:page/:date",{
				templateUrl:'partials/pdfviewer.html',
				controller:'PDFViwerCtrl'
			}).
			when("/certification",{
				templateUrl:'partials/certification.html',
				controller:'CertifCtrl'
			}).
			when("/payment",{
				templateUrl:"partials/payment.html",
				controller:"paymentCtrl"
			}).
			when("/payment/:id",{
				templateUrl:"partials/paymentFiche.html",
				controller:"paymentFicheCtrl"
			}).
			when("/accountaddress",{
				templateUrl:"partials/accountaddress.html",
				controller:"AccountCtrl"
			}).
			when("/accountbank",{
				templateUrl:"partials/accountbank.html",
				controller:"AccountCtrl"
			}).
			when("/addaddress/:id",{
				templateUrl:"partials/addadress.html",
				controller:"AddAddressCtrl"
			}).
			when("/addbank/:id",{
				templateUrl:"partials/addnewbank.html",
				controller:"AddBankCtrl"
			}).
			when("/services",{
				templateUrl:"partials/services.html",
				controller:"ServiceCtrl"
			}).
			when("/search",{
				templateUrl:"partials/search.html",
				controller:"SearchCtrl"
			}).
			when("/inbox",{
				templateUrl:"partials/mailinbox.html",
				controller:"MailCtrl"
			}).
			when("/outbox",{
				templateUrl:"partials/mailoutbox.html",
				controller:"MailCtrl"
			}).
			when("/sendmail",{
				templateUrl:"partials/sendmail.html",
				controller:"MailCtrl"
			}).
			when("/openmail",{
				templateUrl:"partials/openmail.html",
				controller:"MailCtrl"
			}).
      when("/notification1",{
				templateUrl:"partials/notification1.html",
				controller:"NotifCtrl"
			}).
      when("/notification2",{
				templateUrl:"partials/notification2.html",
				controller:"NotifCtrl"
			}).
			otherwise({
        		redirectTo: '/login'
      		});

	}
	]);
kioskapp.controller("NavController",["$scope","Login","$route",
	function($scope,Login,$route){
		var authUser=Login.getLoggedUser();
		$scope.loggedin=false;
		if(authUser!=null)
		{
			$scope.userFirstName=authUser.FirstName;
			$scope.userLastName=authUser.Name;
			$scope.userID=authUser.id;
			$scope.loggedin=true;
		}
		$scope.loggout=function(){
			 Login.logout();
			 $scope.$on('$locationChangeSuccess',function(e,next,current){
			 	window.location.reload();
			 });
		}
	}
	]);
kioskapp.filter('filterMultiple',['$filter',function ($filter) {
  return function (items, keyObj) {
    var filterObj = {
      data:items,
      filteredData:[],
      applyFilter : function(obj,key){
        var fData = [];
        if (this.filteredData.length == 0)
          this.filteredData = this.data;
        if (obj){
          var fObj = {};
          if (!angular.isArray(obj)){
            fObj[key] = obj;
            fData = fData.concat($filter('filter')(this.filteredData,fObj));
          } else if (angular.isArray(obj)){
            if (obj.length > 0){
              for (var i=0;i<obj.length;i++){
                if (angular.isDefined(obj[i])){
                  fObj[key] = obj[i];
                  fData = fData.concat($filter('filter')(this.filteredData,fObj));
                }
              }

            }
          }
          if (fData.length > 0){
            this.filteredData = fData;
          }
        }
      }
    };
    if (keyObj){
      angular.forEach(keyObj,function(obj,key){
        filterObj.applyFilter(obj,key);
      });
    }
    return filterObj.filteredData;
  }
}]);

/*
kioskapp.filter('getById', function() {
  return function(input, id) {
    for (var d = 0, len = input.length; d < len; d += 1) {
      if (input[d].id === id) {
        return input[d];
      }
    }
  }

});

*/
