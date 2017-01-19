'use strict';

function footerCtrl( $timeout ) {
    var view = this;
    // $timeout( function() {
    //     view.showFooter = true;
    // }, 30 );
    view.year = new Date().getFullYear();
    
    // view.showContact = function() {
    //     view.contact = true;
    // }
}

footerCtrl.$inject = [ '$timeout' ];

angular.module( 'TreasuredRecipesApp.footer', [
    'TreasuredRecipesApp.templates'
] )

.component( 'footerComponent', {
    templateUrl : 'footer/footer.html',
    css : [ { 
        href : 'assets/css/footer/footer.css',
        preload : true,
        persist : true 
    } ],
    controller : footerCtrl,
    bindings : {
        info : '='
    }
});