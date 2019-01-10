$(function(){

    var $element = $('.calculator');
    if( !$element.length ) return;

    var config_url = $element.data("calc-config");
    if( !config_url ) return;

    $.getJSON(config_url, function(data){
        var calc = new Calculator( data, $element );
        console.log(calc);
    }, function(){

    });
});