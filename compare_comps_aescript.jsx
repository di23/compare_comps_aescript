/*
    compare_comps_aescript
    Author: Yahor Hayeuski
    version: 0.1.0

    After Effects script. Compare two comps and return the difference in text format.
*/
( function (){

// ---------------------------------
// Functions
// ---------------------------------

// Find all indexes that have the same value in array.
function getAllIndexes( arr, val ){
    var indexes = [];
    for ( var i = 0; i < arr.length; i++ ){
        if ( arr[ i ] === val ){
            indexes.push( i );
        }
    }
    return indexes;
}

// Check if array includes value
function include( arr, val ){
    for( var i = 0; i < arr.length; i++ ){
        if ( arr[ i ] === val ){
            return true;
        };
    }
    return false;
}

// Window that can show long text
function textWindow( title, text ) {
    var win = new Window( "palette", title, [ 0, 0, 490, 600 ]);
    var textPanel = win.add( "edittext", [ 10, 10, 480, 590 ], text, { multiline: true });

    var invisBtn = win.add("button", undefined, "Ok"); // this prevents to close window
    invisBtn.onClick = function() {
        win.close();
    };

    win.center();
    win.show();
}

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

// Log mismatched layers
comparison_log += "\
MISMATCHED LAYERS\
-------------------------------------------------\
comp : " + comp_1.name + "\n";

var mis_ids = getAllIndexes( same_name_arr, 0 );
for ( var i = 0; i < mis_ids.length; i++ ){

    id = mis_ids[ i ] + 1;
    comparison_log += "    " + id + " : " + comp_1.layer( id ).name + "\n";
}

comparison_log += "\
comp : " + comp_2.name + "\n";

for ( var i = 1; i <= comp_2.layers.length; i++ ){

    if ( !include( same_name_arr, i )){
        comparison_log += "    " + i + " : " + comp_2.layer( i ).name + "\n";
    }
}


textWindow( "Comparison Results", comparison_log );

})(); // end