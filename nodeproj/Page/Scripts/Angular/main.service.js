(function () {
    'use strict';

    angular
        .module('mengerApp')
        .service('MengerService', MengerService);

    MengerService.$inject = ['$http', '$httpParamSerializer', '$q','$rootScope'];

    function MengerService($http, $httpParamSerializer, $q,$rootScope) {
       var _this = this;
	    
		_this.socket = io.connect('http://localhost:1337');

	   // public fields
        _this.infoRows =  [];
		
        _this.notifications =  [];

		_this.siloState = {};
		
		_this.menger = {
			mengerStroom : 40,
			charge : 40,
			correctieKg : 5,
			stand : 4
		}
		
		_this.SiloSetup = {};
		
        // public functions
        _this.setMengerStroom = setMengerStroom;
		_this.setCharge = setCharge;
		_this.setCorrectieKg = setCorrectieKg;
		_this.setStand = setStand;
		_this.addNotification = addNotification;
		_this.addInfoRow = addInfoRow;
		_this.addInfoRow = addInfoRow;
		_this.getSiloSetup = getSiloSetup;
		
		function setMengerStroom(newVal){
			_this.menger.mengerStroom = newVal;
		}
		
		function setCharge(newVal){
			_this.menger.charge = newVal;
		}
		
		function setCorrectieKg(newVal){
			_this.menger.correctieKg = newVal;
		}
		
		function setStand(newVal){
			_this.menger.stand = newVal;
		}
		
		function addNotification(newNote){
			_this.notifications.push(newNote);
		}
		
		function addInfoRow(newInfo){
			_this.infoRows.push(newInfo);
		}
		
		function getSiloSetup(){
			$http.get('http://localhost:1337/getSiloConfiguration')
			.then(function(response) {
				_this.SiloSetup = response.data;
			});
		}
		
		//needed to trigger the updating of values in the view because we update those in a non-standard way
		function triggerView(){
			if($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest'){
			   $rootScope.$apply();
			 }
		}
		
		_this.socket.on('addNotification', function (data) {
			_this.notifications.push(JSON.parse(data));
			triggerView();
		});
		
		_this.socket.on('addInfoRow', function (data) {
			_this.infoRows.push(JSON.parse(data));
			triggerView();
		});
		
		_this.socket.on('updateSiloInfo', function (data) {
			_this.siloState = JSON.parse(data);
			triggerView();
		});
    }
})();
