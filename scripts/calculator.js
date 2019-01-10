class Calculator{

    constructor( data, $container ){

        if( !data ){
            console.warn('Calculator: Config data is required!');
            return;
        }

        this.data = data;

        this.$container = $container;

        // this.show_history = data.show_history || true;
        // this.history_length = data.history_length;

        this.columns = data.columns;
        this.column_width = data.column_width || 5;
        this.column_height = data.column_height;

        this.x = null;
        this.y = null;
        this.mathFunction = null;

        this.actions = {};
        this.mathFunc = {};

        this.addFunction();
        this.visualCalculator();
        this.updateValue();
        this.rememberValue();
        // this.column_offset = data.column_offset;
        // this.row_offset = data.row_offset;

    };


    addFunction(){
        //функции активностей

        var scope =this;
        this.actions['invert-sign'] = function(){
            console.log('invert-sign');
             scope.y = -scope.y;
            $(window).trigger('value-change');
            // return -val;

        };

        this.actions['percent'] = function(){
            console.log('percent');
            scope.y = scope.roundPlus(+scope.y/100, scope.data.history_length - 1);
            $(window).trigger('value-change');
        };

        this.actions['remove-last'] = function(){
            if( scope.y !==null){

                let value =   scope.y + '' ;
                let valArr = value.split('');

                valArr.pop();

                if( valArr.length === 0 ){

                    scope.y = null;

                } else {
                    scope.y = valArr.join('');
                }
                console.log("remove-last");
                $(window).trigger('value-change');
            }

            // return val;
        };


        this.actions['square'] = function(){
            var value = +scope.y;
            if( value >= 0 ){

                let square = Math.sqrt(value);
                value = ( scope.roundPlus(square , scope.data.history_length - 1) );
            } else {
                let square = Math.sqrt(value * -1);
                value = (   scope.roundPlus(square , scope.data.history_length - 1) + 'i' );
            }
            scope.y = value;
            $(window).trigger('value-change');


        };

        this.actions['clear-input'] = function(){
            // $input.val('0');
            // val = 0;
            $(window).trigger('value-change');
            scope.y = null;
            // return 0;

        };

        this.actions['reciprocal'] = function(){
            scope.y = ( scope.roundPlus( 1/scope.y, scope.data.history_length - 1) );

            $(window).trigger('value-change');
        };

        this.actions['set-float-point'] = function(){
            let value =   scope.y + '' ;
            let inputArr = value.split('');

            if( inputArr.indexOf('.') !== -1 ){
                // val = val;
            } else {
                scope.y = scope.y + '.';

            }
            $(window).trigger('value-change');

            // return val;
        };

        this.actions['devide'] = function(x, y){
            scope.mathFunction = 'dev';
            $(window).trigger('pair-calculation', 'dev');
            // $(window).trigger('value-change');
        };

        this.actions['multiply'] = function(x, y){
            scope.mathFunction = 'mul';
            $(window).trigger('pair-calculation');
            // $(window).trigger('value-change');
        };

        this.actions['subtraction'] = function (x, y) {
            scope.mathFunction = 'sub';
            $(window).trigger('pair-calculation');
            // $(window).trigger('value-change');
        };

        this.actions['addition'] = function (x, y) {
            scope.mathFunction = 'add';
            $(window).trigger('pair-calculation');
        };

        this.actions['result'] = function (y) {
            $(window).trigger('value-change');
            // if( y !== null){

            // y = +y;
            // }
            // console.log('Y:result', y);
            // console.log('x and y', mathAction(x, y));

            // return (roundPlus( +mathAction(x, y) , scope.data.history_length - 1));
        };

        //математические функции
        this.mathFunc['add'] = function () {
            scope.y = +scope.y + +scope.x;
        };

        this.mathFunc['sub'] = function () {
            scope.y = +scope.x - +scope.y;
        };

        this.mathFunc['mul'] = function () {
            scope.y = +scope.y * +scope.x;
        };

        this.mathFunc['dev'] = function () {
            scope.y = +scope.x / +scope.y;
        }
    };

    visualCalculator(){
        var $calculator = $('.calculator');
        var scope = this;

        $calculator.html('<input type="text">');

        this.data.buttons.forEach( function( button_data, i ){
            console.log(button_data.action);
            var action = scope.actions[button_data.action];
            var label = button_data.label;
            var value = button_data.value;


            var $button = $('<div class="button">' + label +'</div>');

            $button.appendTo( $calculator );
            $button.click(action);
            $button.click(function() {
                if (action) action();
                else {
                    scope.addDigit( value );
                }
            });

            //цвет
            $('.button').eq(i).css('background-color', button_data.background );

        });
    };

    addDigit( digit ){
        // val = $input.val();
        if( this.y === null){
            console.log('digit: ',digit);
            this.y = digit + '';
            console.log('Y: ',this.y);

        }
        else if( (this.y + '').length >= this.data.history_length){
            // $input.val( val);
        } else {
            this.y = this.y + digit + '';
        }

        $(window).trigger('value-change');
        console.log('value-change');
    };

    updateValue(){

        var scope = this;
        $(window).on('value-change', function(){
            var $input = $('input', scope.$container);
            if( scope.y === 0){

                $input.val('');

            } else {
                $input.val(scope.y);
            }
            console.log('changeValue', scope.y);
        });
        // console.log('listenWindow');
    };

    rememberValue(){


        var scope = this;
        $(window).on('pair-calculation', function(){
            scope.x = +scope.y;
            scope.y = null;
            console.log('X', scope.x);
            console.log('Y', scope.y);
            $(window).trigger('value-change');
        });
    }

    //_____________________________________________________

    roundPlus(x, n) {

        if(isNaN(x) || isNaN(n)) return false;

        let m = Math.pow(10,n);
        return Math.round(x*m)/m;
    };
}