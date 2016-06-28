(function () {
    'use strict';

    angular
        .module('mengerApp')
        .controller('MengerController', MengerController);

    MengerController.$inject = ['$scope','MengerService'];

    function MengerController($scope,mengerService) {
        // private fields
        var _this = this;
        // public fields
        _this.service = mengerService;
        _this.getSiloConfiguration = {};

        // public functions
        //_this.approveInvoices = approveInvoices;
       

	   
		
        // initialize
        activate();

        // private functions
        function activate() {
            _this.getSiloConfiguration =  mengerService.getSiloSetup();
            //invoiceService.getInvoiceHeaders(_this.filter);
        }

        
		 
    }

})();