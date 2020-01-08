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
if (( app.project.selection.length != 2 ) || ( app.project.activeItem != null )){

    alert( "Select 2 comps in the Project panel." );
    return; // Exit
}

// Check if selected items are comps
var comp_1 = app.project.selection[ 0 ];
var comp_2 = app.project.selection[ 1 ];

if ( !( comp_1 instanceof CompItem ) || !( comp_2 instanceof CompItem )){

    alert( "One or two selected items are not comps." );
    return; // Exit
}

// ---------------------------------
// Compare
// ---------------------------------

var comparison_log = "";

// Compare layers names
var same_name_arr = new Array( comp_1.layers.length );

for ( var i1 = 1; i1 <= comp_1.layers.length; i1++ ){

    same_name_arr[ i1 - 1 ] = 0;

    for ( var i2 = 1; i2 <= comp_2.layers.length; i2++ ){

        if ( comp_1.layer( i1 ).name == comp_2.layer( i2 ).name ){
            same_name_arr[ i1 - 1 ] = i2;
        }
    }
}

alert( same_name_arr );

})(); // end