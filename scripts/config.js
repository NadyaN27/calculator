var config ={
    "show_history": true,
    "history_length": 10,
    "columns": 5,
    "column_width": 20,
    "column_height": 20,
    "column_offset": 5,
    "row_offset": 5,

    "buttons": [

        {
            "label": "←",
            "action": "remove-last",
            "description": "Remove the last digit",
            "key": "backspace",
            "width": 2,
            "height": 1,
            "background": "gray"
        },

        {
            "label": "C",
            "action": "clear-input",
            "description": "Cliear the input field",
            "key": "delete",
            "width": 1,
            "height": 1,
            "background": "gray"
        },

        {
            "label": "±",
            "action": "invert-sign",
            "description": "Invert Sign",
            "key": "",
            "background": "gray"
        },

        {
            "label": "√",
            "action": "square",
            "description": "Square",
            "key": "",
            "background": "gray"
        },





        {
            "label": "7",
            "value": "7",
            "description": "7",
            "key": "7",
            "background": "white"
        },

        {
            "label": "8",
            "value": "8",
            "description": "8",
            "key": "8",
            "background": "white"
        },

        {
            "label": "9",
            "value": "9",
            "description": "9",
            "key": "9",
            "background": "white"
        },

        {
            "label": "/",
            "action": "devide",
            "description": "Devide",
            "key": "/",
            "background": "gray"
        },

        {
            "label": "%",
            "action": "percent",
            "description": "Percent",
            "key": "%",
            "background": "gray"
        },




        {
            "label": "4",
            "value": "4",
            "description": "4",
            "key": "4",
            "background": "white"
        },

        {
            "label": "5",
            "value": "5",
            "description": "5",
            "key": "5",
            "background": "white"
        },

        {
            "label": "6",
            "value": "6",
            "description": "6",
            "key": "6",
            "background": "white"
        },

        {
            "label": "*",
            "action": "multiply",
            "description": "Multiply",
            "key": "*",
            "background": "gray"
        },

        {
            "label": "1/x",
            "action": "reciprocal",
            "description": "Get the reciprocal of a number",
            "key": "",
            "background": "gray"
        },




        {
            "label": "1",
            "value": "1",
            "description": "1",
            "key": "1",
            "background": "white"
        },

        {
            "label": "2",
            "value": "2",
            "description": "2",
            "key": "2",
            "background": "white"
        },

        {
            "label": "3",
            "value": "3",
            "description": "3",
            "key": "3",
            "background": "white"
        },

        {
            "label": "-",
            "action": "subtraction",
            "description": "Subtraction",
            "key": "-",
            "background": "gray",
            "width": 2
        },





        {
            "label": "0",
            "value": "0",
            "description": "0",
            "key": "0",
            "background": "white",
            "width": 2
        },

        {
            "label": ",",
            "action": "set-float-point",
            "description": "Set the float point",
            "key": ".",
            "background": "white"
        },

        {
            "label": "+",
            "action": "addition",
            "description": "Addition",
            "key": "+",
            "background": "gray"
        },

        {
            "label": "=",
            "action": "result",
            "description": "Show Result",
            "key": "enter",
            "background": "gray"
        }
    ]
};


// $('body').append('<div class="calculator"></div>');
var $calculator = $('.calculator');
var $input = $('input', $calculator);

var x = null;
var y = null;
var mathAction;


//добавление кнопок
config.buttons.forEach( function( button_data, i ){

    // var action = actions[button_data.action];
    var label = button_data.label;
    var value = button_data.value;

//ширина
    /*
    if(button_data.width === 2){
        $calculator.append('<div class="button two" id="' + (action ? action : value) +'">' + label +'</div>');
        // if (action){

            // $('#' + action).click( strCamelCase( action) );
            // console.log( $('#' + action) );
            // console.log( strCamelCase(action ) );
        // }

    } else {

        $calculator.append('<div class="button" id="' + (action ? action : value) +'">' + label +'</div>');
    }
    */

    var $button = $('<div class="button">' + label +'</div>');
    $button.appendTo( $calculator );
    // $button.click(function() {
    //     if (action) action();
    //     else {
    //         addDigit( value );
    //     }
    // });

    //цвет
    $('.button').eq(i).css('background-color', button_data.background );

});

//
$input.on('focus', function () {
    $input.val('');

});
$input.keypress(function(e){
    e = e || window.e;
    let inputArr = $input.val().split('');
    if( ( inputArr.indexOf('.') !== -1 ) && e.charCode==46 ){
        return false;
    }
    if (e.charCode && e.charCode!=0 && e.charCode!=46 && (e.charCode < 48 || e.charCode > 57) )
        return false;
});

//  C
$('#clear-input').click(clearInput);

function clearInput(){
    $input.val('0');
}




// цифры
for (let j = 0; j < 10; j++){
    $('#' + j+ '').click(function(){
        addDigit(j);
    });
}

function addDigit( digit ){
    let value = $input.val();
    if (+value === 0){

        $input.val('' + digit);
    } else if( value.length >= config.history_length){
        $input.val( value);
    } else {
        $input.val( value + digit);
    }
}

// backspace
$('#remove-last').click(removeLast);

function removeLast(){
    var value = $input.val();


    if ( +value !== 0 ){
        let valueArr = value.split('');

        valueArr.pop();

        if( valueArr.length === 0 ){

            value = '0';

        } else {
            value = valueArr.join('');
        }

        $input.val(value);
    }
}



// point

$('#set-float-point').click(setFloatPoint);

function setFloatPoint(){
    let input = $input.val();
    let inputArr = input.split('');
    if (+$input.val() === 0){

        $input.val('0');
    } else if( inputArr.indexOf('.') !== -1 ){
        $input.val( $input.val() );
    } else {
        $input.val( $input.val() + '.');
    }
}


//invert

$('#invert-sign').click(invertSign);

function invertSign() {

    let value = $input.val();

    if( +value !== 0){
        let valueArr = value.split('');

        if (valueArr[0] == '-'){
            valueArr.shift();
        } else {
            valueArr.unshift('-');
        }

        value = valueArr.join('');
        $input.val(value);
    }
}

var actions = {};
actions['invet-actioins'] = function(val){
    return -val;
};

//inverse
$('#reciprocal').click(reciprocal);

function reciprocal() {
    let value = +$input.val();

    let reciprocal = 1/value;
    $input.val( roundPlus(reciprocal, config.history_length - 1) );
}


//percent
$('#percent').click(percent);

function percent(){
    let value = +$input.val();
    let percent = value/100;

    $input.val( roundPlus(percent, config.history_length - 1) );
}

// square

$('#square').click(square);

function square(){

    let value = +$input.val();
    if( value >= 0 ){

        let square = Math.sqrt(value);
        $input.val( roundPlus(square , config.history_length - 1) );
    } else {
        let square = Math.sqrt(value * -1);
        $input.val(   roundPlus(square , config.history_length - 1) + 'i' );
    }
}

//---------------------------------------------------------------------
//addition

$('#addition').click(addition);

function addition() {
    // x = +$input.val();
    // console.log('X:add', x);
    // $input.val('');

    mathAction = add;
    $(window).trigger('pair-calculation');
}

//subtraction
$('#subtraction').click(subtraction);

function subtraction(){
    mathAction = sub;
    $(window).trigger('pair-calculation');
}

//multiply
$('#multiply').click(multiply);

function multiply(){
    mathAction = mul;
    $(window).trigger('pair-calculation');
}


//devide
$('#devide').click(devide);

function devide(){
    mathAction = dev;
    $(window).trigger('pair-calculation');
}

//result
$('#result').click(result);

$(window).on('pair-calculation', rememberX);

function rememberX(){
    x = +$input.val();
    console.log('X', x);
    $input.val('');
}

function result() {
    if( $input.val() !== ''){

        y = +$input.val();
    }
    console.log('Y:result', y);
    console.log(mathAction(x, y));

    $input.val(roundPlus( +mathAction(x, y) , config.history_length - 1));

}



//______________________________________________
//x - число, n - количество знаков

function roundPlus(x, n) {

    if(isNaN(x) || isNaN(n)) return false;

    let m = Math.pow(10,n);
    return Math.round(x*m)/m;
}


function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function dev(a, b) {
    return a / b;

}


function strCamelCase(str){
    var strArr = [];
    strArr = str.split('-');

    for(var i = 1; i < strArr.length; i++){
        strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1);

    }

    return strArr.join('');

}




//__________________________
/*
$(function(){

    var $element = $('.calculator');
    if( !$element.length ) return;

    var config_url = $element.data("calc-config");
    if( !config_url ) return;

    $.getJSON(config_url, function(data){
        var calc = new Calculator( data, $element );
    }, function(){

    });

});
*/















