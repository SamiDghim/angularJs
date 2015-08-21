var applicationController=angular.module('applicationController',[]);

applicationController.controller('applicationCtrl',['Login','$scope','Application','$location','$rootScope',
	function(Login,$scope,Application,$location,$rootScope)
	{
		Login.requireAuth();


		$rootScope.pagename="partials.index.application";
		var authUser=Login.getLoggedUser();
		var currentdate=new Date();
		$scope.startdate=currentdate.getFullYear()+"-01-"+"01";
		var callbackfunc=function(listAbs){
			$scope.absences=listAbs;
		};
		Application.getAbsences(authUser.id,$scope.startdate,callbackfunc);
		$scope.remove=function(item){
			var index=$scope.absences.indexOf(item);
			$scope.absences.splice(index,1);
		}
		$scope.updateList=function(){

			Application.getAbsences(authUser.id,$scope.startdate,callbackfunc);
		}
		$scope.AddAbsence=function(absid)
		{
			if(absid===undefined)
				$location.path("/addabsence/"+"-1");
			else
				$location.path("/addabsence/"+absid);

		}

	}
	]);
applicationController.controller("AddTimeRecCtrl",['Login','$scope','$location','$routeParams','Application',
	function(Login,$scope,$location,$routeParams,Application)
	{
		Login.requireAuth();
		var authUser=Login.getLoggedUser();
		var reqId=$routeParams.reqId;

		var setTimeRec=function(obj){
			$scope.selectedTo=obj.NAME;
			$scope.type=obj.SUBTYTEXT;
			$scope.begdate=obj.BEGDA;
			$scope.beghour=obj.BEGTI;

			$scope.not=obj.CURR_NOTICE
			$scope.approval=obj.PAST_NOTICE;
		};
		if(reqId!=-1){
			absence=Application.getTimeRecById(authUser.id,reqId,setTimeRec);

		}
		else
			$scope.approval="written Text only shown at response";
	}
	]);
applicationController.controller("CertifCtrl",["Login","$rootScope",
	function(Login,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="partials.index.certification";
	}
	]);
applicationController.controller("PaymentCtrl",['Login','$location','$rootScope','$scope',
	function(Login,$location,$rootScope,$scope)
	{
		Login.requireAuth();
		$rootScope.pagename="partials.index.payment";
		$scope.openTimeStatus=function(date)
		{
			$location.path('/viewer/payment/'+date);
		}
		$scope.search=function(){
			$scope.openTimeStatus($scope.searchdate);

		}
	}
	]);
applicationController.controller("AccountCtrl",['Login',"$location","$rootScope","$scope","Application",
	function(Login,$location,$rootScope,$scope,Application){
		Login.requireAuth();
		$rootScope.pagename="partials.index.account";
		var authUser =Login.getLoggedUser();
		func=function(data){
			$scope.account=data;
		}
		Application.getUserAccount(authUser.id,func);

    $scope.editAddress=function(){
			$location.path("addaddress/"+authUser.id);
		}
		$scope.editBank=function(){
			$location.path("addbank/"+authUser.id);
		}
    $scope.editProfile=function(){
      $location.path("editprofile/"+authUser.id);
    }

	}
	]);
applicationController.controller("AddAddressCtrl",['Application','Login','$scope','$routeParams','$rootScope',
  function(Application,Login,$scope,$routeParams,$rootScope){
    Login.requireAuth();
    $rootScope.pagename="partials.index.account";
    var id=$routeParams.id;
    if(id!=-1){
      var func=function(data){
        $scope.startdate=data.Address.BEGDA
        $scope.country=data.Address.PAD_CONAM
        $scope.street=data.Address.PAD_STRAS
        $scope.postcode=data.Address.PSTLZ_HR
        $scope.city=data.Address.PAD_ORT01
        $scope.phone=data.Address.TELNR
        $scope.contry=data.Address.PAD_CONAM
      }
      Application.getUserAccount(id,func);
    }
  }]);
applicationController.controller("EditprofileCtrl",['Application','Login','$scope','$routeParams','$rootScope',
  function(Application,Login,$scope,$routeParams,$rootScope) {
    Login.requireAuth();
    $rootScope.pagename = "partials.index.account";
    var id = $routeParams.id;
    if (id != -1) {
      var func = function (data) {
        $scope.firstName = data.Profile.FIRST_NAME
        $scope.lastName = data.Profile.LAST_NAME
        $scope.dob = data.Profile.DOB
        $scope.emailUser = data.Profile.E_MAIL
        $scope.postUser = data.Profile.POST
        $scope.rib = data.Profile.RIB
        $scope.situation = data.Profile.SITUATION
      }
      Application.getUserAccount(id,func);
    }
  }]);
applicationController.controller('ServiceCtrl',['Login','$rootScope',function(Login,$rootScope){
	Login.requireAuth();
	$rootScope.pagename="partials.mainmenus.service"
}]);
applicationController.controller('SearchCtrl',['Login','restService','$scope','$rootScope',function(Login,restService,$scope,$rootScope){
  Login.requireAuth();
  $rootScope.pagename="partials.index.search";
  $scope.employees = restService.employees.query();


}]);
applicationController.controller('MailCtrl',['Login','$rootScope','$location', '$scope',function(Login,$location,$rootScope,$scope){
	Login.requireAuth();
	$rootScope.pagename="partials.index.mailbox";

  $scope.outboxs= [{id: '1',maildate:'5.1.2012',mailto:'John',mailsubject:'1',mailText:'1'},
                   {id: '2',maildate:'4.2.2013',mailto:'sami',mailsubject:'2',mailText:'2'},
                   {id:'3',maildate:'3.3.2014',mailto:'ali',mailsubject:'3',mailText:'3'},
                   {id:'4',maildate:'2.4.2015',mailto:'bilel',mailsubject:'4',mailText:'4'},
                   {id:'5',maildate:'1.5.2016',mailto:'John',mailsubject:'5',mailText:'5'}
  ];
    $scope.inboxs=[{id:'6',maildate:'1.1.2001',mailfrom:'John',mailsubject:'6',mailText:'6'},
                   {id: '7' ,maildate:'2.2.2013',mailfrom:'sami',mailsubject:'7',mailText:'7'},
                   {id:'8',maildate:'3.3.2014',mailfrom:'ali',mailsubject:'8',mailText:'8'},
                   {id:'9',maildate:'4.4.2015',mailfrom:'bilel',mailsubject:'9',mailText:'9'},
                   {id:'10',maildate:'5.5.2016',mailfrom:'John',mailsubject:'10',mailText:'10'}
  ];

 // var mail_id = $routeParams.mailId;


      // $scope.selected = $filter('getById')($scope.inboxs, '7');

 /*
  $scope.openmail = function(mailid) {
    $scope.selected = $filter('getById')($scope.inboxs, mailid);
      $location.path("/openmail/" + mailid);

  }

*/

}]);
applicationController.controller('NotifCtrl',['Login','$rootScope',function(Login,$rootScope){
  Login.requireAuth();
  $rootScope.pagename="partials.index.notif";
}]);
applicationController.controller('advanceSalaryCtrl', [ 'Login', '$scope',
	'restService', "$location", '$rootScope',
	function(Login, $scope, restService, $location, $rootScope) {
		Login.requireAuth();
		$rootScope.pagename = "Advance Salary";
		var authUser = Login.getLoggedUser();
		var currentdate = new Date();
		$scope.startdate = currentdate.getFullYear() + "-01-" + "01";
		$scope.advanceSalarys = restService.advanceSalary.query();


		$scope.AdvanceSalaryFilter = function(AdvanceSalary) {
			if (AdvanceSalary.idemp.id == 17)
				return AdvanceSalary;
		};
	} ]);
applicationController.controller('paymentCtrl', [ 'Login', '$scope',
	'restService', "$location", '$rootScope',
	function(Login, $scope, restService, $location, $rootScope) {
		Login.requireAuth();
		$rootScope.pagename = "Payment";
		var authUser = Login.getLoggedUser();
		var currentdate = new Date();
		$scope.startdate = currentdate.getFullYear() + "-01-" + "01";
		$scope.payments = restService.payments.query();


		$scope.paymentFiche = function () {
			$location.path("/")
		};


		$scope.PaymentFilter = function(payment) {
			if (payment.idemp.id == 17)
				return payment;
		};
	} ]);
applicationController.controller("paymentFicheCtrl", [
	'Login',
	'$scope',
	'$location',
	'$routeParams',
	'restService',
	'$rootScope',
	function(Login, $scope, $location, $routeParams, restService,
			 $rootScope) {
		Login.requireAuth();
		var authUser = Login.getLoggedUser();
		var reqId = $routeParams.reqId;
		$rootScope.pagename = "Payment";
		$scope.payment = restService.payments.get({id:$routeParams.id}, function (payment) {
		});


	} ]);
applicationController.controller('absenceCtrl', [ 'Login', '$scope',
	'restService', "$location", '$rootScope',
	function(Login, $scope, restService, $location, $rootScope) {
		Login.requireAuth();
		$rootScope.pagename = "Absence";
		var authUser = Login.getLoggedUser();
		var currentdate = new Date();
		$scope.startdate = currentdate.getFullYear() + "-01-" + "01";
		$scope.absenceRequests = restService.absenceRequest.query();
		$scope.gotoAbsenceRequestNewPage = function() {
			$location.path("/absenceRequest/new")
		};
		$scope.deleteAbsenceRequest = function(absenceRequest) {
			absenceRequest.$delete({
				'id' : absenceRequest.id
			}, function() {
				$location.path('/absenceRequest/list/');
			});
		};

		$scope.AbsenceFilter = function(absence) {
			if (absence.idemp.id == 17)
				return absence;
		};
	} ]);
applicationController.controller("AddabsenceCtrl", [
	'Login',
	'$scope',
	'$location',
	'$routeParams',
	'restService',
	'$rootScope',
	function(Login, $scope, $location, $routeParams, restService,
			 $rootScope) {
		Login.requireAuth();
		var authUser = Login.getLoggedUser();
		var reqId = $routeParams.reqId;
		$rootScope.pagename="partials.index.application";
		$scope.submit = function() {
      restService.absenceRequest.save($scope.absenceRequest, function(
				absenceRequest) {
				$location.path('/absenceRequest/list');
			});
		};
		$scope.gotoAbsenceRequestListPage = function() {
			$location.path("/absenceRequest/list")
		};
	} ]);
applicationController.controller("editAbsenceCtrl", [
	'Login',
	'$scope',
	'$location',
	'$routeParams',
	'restService',
	'$rootScope',
	function(Login, $scope, $location, $routeParams, restService,
			 $rootScope) {
		Login.requireAuth();
		var authUser = Login.getLoggedUser();
		var reqId = $routeParams.reqId;
		$rootScope.pagename = "Absence";
		$scope.absenceRequest = restService.absenceRequest.get({id:$routeParams.id}, function (absenceRequest) {
		});
		$scope.edit = function(absenceRequest) {
			absenceRequest.$update({
				'absenceRequest' : absenceRequest
			}, function() {
				$location.path('/absenceRequest/list/');
			});
		};


	} ]);
applicationController.controller("TimeAccCtrl", [ "Login", "$scope",
	"$location", "Application", "$rootScope",
	function(Login, $scope, $location, Application, $rootScope) {
		Login.requireAuth();
		$rootScope.pagename="partials.index.application";

		var authUser = Login.getLoggedUser();
		var func = function(data) {
			$scope.accounts = data;
		}
		Application.getTimeAccRecords(authUser.id, func);
		$scope.AddAbsence = function() {

			$location.path("/addabsence/" + "-1");

		}
	}

]);
applicationController.controller("TimeRecCtrl", [ "Login", "$scope",
	"$location", "Application",
	function(Login, $scope, $location, Application) {
		Login.requireAuth();
		var authUser = Login.getLoggedUser();
		var d = new Date();
		d.setDate(d.getDate() - (d.getDay() - 1));
		var month = "";
		var days = "";
		if ((d.getMonth() + 1) < 10)
			month = "0" + (d.getMonth() + 1);
		else
			month = d.getMonth() + 1;
		if (d.getDate() < 10)
			days = "0" + d.getDate();
		else
			days = d.getDate();
		$scope.startdate = d.getFullYear() + "-" + month + "-" + days;
		var func = function(data) {
			$scope.records = data
		}
		Application.getTimeRecords(authUser.id, $scope.startdate, func);
		$scope.remove = function(item) {
			var index = $scope.records.indexOf(item);
			$scope.records.splice(index, 1);
		}
		$scope.AddTimeRec = function(absid) {
			if (absid === undefined)
				$location.path("/addtimerecord/" + "-1");
			else
				$location.path("/addtimerecord/" + absid);

		}

	}

]);
applicationController.controller("TimeStatusCtrl", [ 'Login', '$location',
	'$rootScope', '$scope', function(Login, $location, $rootScope, $scope) {
		Login.requireAuth();
		$rootScope.pagename="partials.index.timerecord";
		$scope.openTimeStatus = function(date) {
			$location.path('/viewer/timestatus/' + date);
		}
		$scope.search = function() {
			$scope.openTimeStatus($scope.searchdate);
		}
	} ]);
applicationController.controller("PDFViwerCtrl", [
	"Login",
	"$scope",
	"$rootScope",
	"$routeParams",
	function(Login, $scope, $rootScope, $routeParams) {

		Login.requireAuth();
		$scope.date = $routeParams.date;
		if ($routeParams.page == "timestatus") {
			$rootScope.pagename = "Time Records";
			PDFJS.getDocument('DummyPDF/time-record.pdf').then(
				function(pdf) {
					pdf.getPage(1).then(
						function(page) {
							var scale = 1.5;
							var viewport = page.getViewport(scale);
							var canvas = document
								.getElementById('the-canvas');
							var context = canvas.getContext('2d');
							canvas.height = viewport.height;
							canvas.width = viewport.width;
							var renderContext = {
								canvasContext : context,
								viewport : viewport
							};
							page.render(renderContext);
						});
				});
		} else if ($routeParams.page == "payment") {
			$rootScope.pagename = "Payment";
			PDFJS.getDocument('DummyPDF/payment.pdf').then(function(pdf) {
				pdf.getPage(1).then(function(page) {
					var scale = 1.5;
					var viewport = page.getViewport(scale);
					var canvas = document.getElementById('the-canvas');
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;
					var renderContext = {
						canvasContext : context,
						viewport : viewport
					};
					page.render(renderContext);
				});
			});
		}

	} ]);
applicationController.controller("AddBankCtrl", [ 'Application', 'Login',
	'$scope', '$routeParams', '$rootScope',
	function(Application, Login, $scope, $routeParams, $rootScope) {
		Login.requireAuth();
		$rootScope.pagename="partials.index.account";
		var id = $routeParams.id;
		if (id != -1) {
			var func = function(data) {
				$scope.startdate = data.BankAccount.BEGDA;
				$scope.rec = data.BankAccount.EMFTX
				$scope.iban = data.BankAccount.HRPAD_IBAN00
				$scope.bic = data.BankAccount.BANKK
			}
			Application.getUserAccount(id, func);
		}
	} ]);
