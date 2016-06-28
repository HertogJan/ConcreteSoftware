(function () {
    'use strict';

    angular
        .module('mengerApp')
        .service('ConnectorService', ConnectorService);

	ConnectorService.$inject = ['$http'];
		
    function ConnectorService($http) {
        // private fields
        var _this = this;
        
		_this.mainService = {};
		
        // public functions
        _this.getSiloSetup = getSiloSetup;
       

		var socket = io.connect('http://localhost:1337');
			
		socket.on('notification', function (data) {
			
		});
	   
        // initialize
        activate();

        // private functions
        function activate() {
            //invoiceService.getInvoicesSettings();
            //invoiceService.getInvoiceHeaders(_this.filter);
        }

		function getSiloSetup(){
			$http.get('http://localhost:1337/getSiloConfiguration')
			.then(function(response) {
				mainService.SiloSetup = response.data;
				return response.data;
			});
		}
		
		
        
    }

})();