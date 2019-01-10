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


var x = null;
var y = null;
// var val = null;
var mathAction;





// $('body').append('<div class="calculator"></div>');
var $calculator = $('.calculator');
var $input = $('input', $calculator);




//добавление кнопок


//
$input.on('focus', function () {
    // $input.val('');

});

//фильтрация ввода с клавиатуры
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
// $('#clear-input').click(clearInput);
//
// function clearInput(){
//     $input.val('0');
// }







console.log(actions);
console.log('val', val);



//при нажатии на кнопку парного действия, сохранить первое число
$(window).on('pair-calculation', rememberX);

$(window).on('value-change', showValue);

function rememberX(){
    x = +$input.val();
    console.log('X', x);
    $input.val('');
}

function showValue() {
    $input.val(val);
}

// function result() {
//     if( $input.val() !== ''){
//
//         y = +$input.val();
//     }
//     console.log('Y:result', y);
//     console.log(mathAction(x, y));
//
//     $input.val(roundPlus( +mathAction(x, y) , config.history_length - 1));
//
// }



//______________________________________________
//x - число, n - количество знаков






function strCamelCase(str){
    var strArr = [];
    strArr = str.split('-');

    for(var i = 1; i < strArr.length; i++){
        strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1);

    }

    return strArr.join('');
}
















