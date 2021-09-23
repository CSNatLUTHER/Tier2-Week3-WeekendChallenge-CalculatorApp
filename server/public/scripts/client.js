$( document ).ready ( onReady );

function onReady(){
    console.log( 'I am JQuery ready!' );
    getPastCalculations();
}

function getPastCalculations(){
    console.log('in getPastCalculations');
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ) {
        console.log('Back from server with:', response );
        let el = $("#listOfPastCalculations")
        for (let i = 0; i < response.length; i++) {
            el.append(`<li>${response[i].numOne} ${response[i].operation} ${response[i].numTwo} = <b>${response[i].answer}</b></li>`)
            
        }; // end for loop
    })
}