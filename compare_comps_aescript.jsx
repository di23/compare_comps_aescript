/*
    compare_comps_aescript
    Author: Yahor Hayeuski
    version: 0.1.0

    After Effects script. Compare two comps and return the difference in text format.
*/
( function (){

// ---------------------------------
// Checks
// ---------------------------------

// check if two items selected
if ( app.project.selection.length != 2 ){

    alert( "Select 2 comps in the Project panel." );
    return; // Exit
}

alert( "HURAY!" );

})(); // end