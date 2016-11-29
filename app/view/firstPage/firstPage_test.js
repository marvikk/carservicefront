/**
 * Created by Liza on 9/12/2016.
 */
'use strict';

describe('myApp.firstPage module', function() {

    beforeEach(module('myApp.firstPage'));

    describe('firstPage controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var FirstPageCtrl = $controller('FirstPageCtrl');
            expect(FirstPageCtrl).toBeDefined();
        }));

    });
});