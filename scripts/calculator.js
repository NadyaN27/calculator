class Calculator{

    constructor( data, $container ){

        if( !data ){
            console.warn('Calculator: Config data is required!');
            return;
        }

        this.data = data;

        this.$container = $container;

        // this.show_history = data.show_history || true;
        this.input_length = 14;

        this.columns = data.columns;
        this.column_width = data.column_width || 5;
        this.column_height = data.column_height;

        this.x = null;
        this.y = null;
        this.mathFunction = null;

        this.actions = {};
        this.mathFunc = {};
        this.actionsForKey = {};

        this.addFunction();
        this.visualCalculator();
        this.addActionForKey();

        this.updateValue();
        this.rememberValue();
        this.checkInput();
        // this.column_offset = data.column_offset;
        // this.row_offset = data.row_offset;

    };


    addFunction(){
        //математические функции
        this.mathFunc['add'] = function () {
            scope.y = +scope.y + +scope.x;
            console.log( +scope.y + +scope.x );
        };

        this.mathFunc['sub'] = function () {
            scope.y = +scope.x - +scope.y;
        };

        this.mathFunc['mul'] = function () {
            scope.y = +scope.y * +scope.x;
        };

        this.mathFunc['dev'] = function () {
            scope.y = +scope.x / +scope.y;
        };

        //функции активностей
        var scope =this;
        this.actions['invert-sign'] = function(){
            console.log('invert-sign');
             scope.y = -scope.y;
            $(window).trigger('value-change');
        };

        this.actions['percent'] = function(){
            console.log('percent');
            scope.y = scope.roundPlus(+scope.y/100, scope.data.input_length - 1);
            $(window).trigger('value-change');
        };

        this.actions['remove-last'] = function(){
            if( !isFinite(scope.y)){
                console.log('infinity');
                scope.y = null;
            } else if( scope.y !==null){

                let value =   scope.y + '' ;
                let valArr = value.split('');

                valArr.pop();

                if( valArr.length === 0 ){

                    scope.y = null;

                } else {
                    scope.y = valArr.join('');
                }
                console.log("remove-last");
            }
            $(window).trigger('value-change');
        };


        this.actions['square'] = function(){
            var value = +scope.y;
            if( value >= 0 ){

                let square = Math.sqrt(value);
                value = ( scope.roundPlus(square , scope.data.input_length - 1) );
            } else {
                let square = Math.sqrt(value * -1);
                value = (   scope.roundPlus(square , scope.data.input_length - 1) + 'i' );
            }
            scope.y = value;
            $(window).trigger('value-change');


        };

        this.actions['clear-input'] = function(){

            scope.y = null;
            scope.mathFunction = null;
            $(window).trigger('value-change');

        };

        this.actions['reciprocal'] = function(){
            scope.y = ( scope.roundPlus( 1/scope.y, scope.data.input_length - 1) );

            $(window).trigger('value-change');
        };

        this.actions['set-float-point'] = function(){
            let value =   scope.y + '' ;
            let inputArr = value.split('');

            if( inputArr.indexOf('.') !== -1 ){
            } else {
                scope.y = scope.y + '.';

            }
            $(window).trigger('value-change');

        };

        this.actions['devide'] = function(){
            scope.mathFunction = 'dev';
            $(window).trigger('pair-calculation', 'dev');
        };

        this.actions['multiply'] = function(){
            scope.mathFunction = 'mul';
            $(window).trigger('pair-calculation');
        };

        this.actions['subtraction'] = function () {
            scope.mathFunction = 'sub';
            $(window).trigger('pair-calculation');
        };

        this.actions['addition'] = function () {
            scope.mathFunction = 'add';
            $(window).trigger('pair-calculation');
        };

        this.actions['result'] = function () {
            if(scope.mathFunction !== null){

                scope.mathFunc[scope.mathFunction]();
            }

            console.log("mathFunc",scope.mathFunction);
            $(window).trigger('value-change');
            scope.mathFunction = null;
            // console.log(scope.mathFunction);
        };


    };

    visualCalculator(){
        var $calculator = $('.calculator');
        var scope = this;

        $calculator.html('<input type="text">');
        var $input = $('input', $calculator);
        $input.css({
            'width': '100%',
            'box-sizing': 'border-box'
        });

        var $buttonsContainer = $('<div class="button-container"></div>');

        $buttonsContainer.css({
            'display': 'grid',
            'grid-template-columns': 'repeat(' + this.columns + ', 1fr)',
            'grid-gap': '2px',
            'width': '100%',
            'height': '300px'
        });

        $calculator.css({
            'display':'inline-block',
            'width': 'auto',
            'height': 'auto',
            'background': '#939393'
        });

        $calculator.append($buttonsContainer);
        this.data.buttons.forEach( function( button_data, i ){


            var action = scope.actions[button_data.action];
            var label = button_data.label;
            var value = button_data.value;

            var $button = $('<div class="button">' + label +'</div>');
            $button.appendTo( $buttonsContainer );
            $button.click(function() {
                if (action) action();
                else {
                    scope.addDigit( value );
                }
            });



            if(button_data.keys){
                for(let i = 0; i < button_data.keys.length; i++ ){
                    if(action) {

                        scope.actionsForKey[button_data.keys[i]] = action;
                    } else {
                        scope.actionsForKey[button_data.keys[i]] = scope.addDigit;

                    }
                }
            }

            $button.css({
                'width': 'auto',
                'height': 'auto',
                'justify-self': 'stretch',
                'align-self': 'stretch',
                'text-align': 'center',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'cursor': 'pointer',
                'user-select': 'none'
            });
            //цвет
            $('.button').eq(i).css('background-color', button_data.background );
            //ширина
            if (button_data.width  ){

                $('.button').eq(i).css('grid-column-end', 'span ' + button_data.width  );
            }
            if (button_data.height ){

                $('.button').eq(i).css('grid-row-end', 'span ' + button_data.height  );
            }
        });
    };

    addActionForKey(){
        var scope = this;
        $('input').keyup(function(e){
            if( !scope.checkInput() && scope.actionsForKey[e.keyCode + ''] !== undefined){
                console.log(e.keyCode);

                // scope.actionsForKey[e.keyCode];
                if (e.keyCode >= 48 && e.keyCode <= 57){
                    console.log("digit",String.fromCharCode(e.keyCode) );

                    scope.addDigit( String.fromCharCode(e.keyCode)  );
                } else {


                    console.log("funcForKey:", scope.actionsForKey[e.keyCode + '']);
                    scope.actionsForKey[e.keyCode + '']();
                }
            }
        });
    };



    addDigit( digit ){
        if( this.y === null){
            this.y = digit + '';
            console.log('Y: ',this.y);

        }
        else if( (this.y + '').length >= this.input_length){
        } else {
            this.y = this.y + digit + '';
        }

        $(window).trigger('value-change');
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

        console.log('pair-calculation');
    };
    
    checkInput(){
        var scope = this;
        var $input = $('input', scope.$container);
        $input.keypress(function(e){
            e = e || window.e;
            let inputArr = $input.val().split('');
            if( ( inputArr.indexOf('.') !== -1 ) && e.charCode==46 ){
                return false;
            }
            if (e.charCode && e.charCode!=0 && e.charCode!=46 && (e.charCode < 48 || e.charCode > 57) )
                return false;
        });
    };

    //_____________________________________________________

    roundPlus(x, n) {

        if(isNaN(x) || isNaN(n)) return false;

        let m = Math.pow(10,n);
        return Math.round(x*m)/m;
    };
}