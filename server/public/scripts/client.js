$( document ).ready ( onReady );

function onReady(){
    console.log( 'I am JQuery ready!' );
    $( '#calculateAnswer' ).on ( 'click', performCalculation );
    $( '.operationType' ).on ( 'click', setOperation );
    getPastCalculations();
}

let operationType = '';

function clearData(){
    $( "#numOneIn" ).val('')
    $( "#numTwoIn" ).val('')
    $( ".operationType" ).removeAttr('style')
    operationType = '';
}
function getPastCalculations(){
    console.log('in getPastCalculations');
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ) {
        console.log('Back from server with:', response );
        let el = $("#listOfPastCalculations")
        el.empty()
        for (let i = 0; i < response.length; i++) {
            el.append(`<li>${response[i].numOne} 
            ${response[i].operation} 
            ${response[i].numTwo} = 
            <b>${response[i].answer}</b></li>`) 
        }; // end for loop
    }).catch( function( err ){
        alert('There was an error');
        console.log('The error was:', err );
    })
} // end getPastCalculations function

function performCalculation(){
    console.log( 'in performCalculation' );
    let objectToSend = {
        numOne: $( "#numOneIn" ).val(),
        operation: operationType,
        numTwo: $( "#numTwoIn" ).val(),
    }
    console.log( objectToSend );
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: objectToSend
    }).then( function (response ) {
        console.log( 'back from POST', objectToSend );
        getPastCalculations();
    }).catch( function ( err ) {
        alert( 'There was a caluation error')
        console.log('Error with caluation:', err );
    })
    clearData();
}

function setOperation() {
    console.log( 'in setOperation with operation type:', $( this ).data( 'id' ) );
    operationType = $( this ).data( 'id' )
    $( '.operationType').removeAttr('style');
    $( this ).css ('background-color', 'blue');
    $( this ).css ('color', 'white');
    console.log('operation is set to:', operationType );
} // end setOperation