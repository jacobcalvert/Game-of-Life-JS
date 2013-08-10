jQuery(document).ready(function(){

function updateMatrix(matrix){
    var blank_matrix = buildBlank(matrix.length);
    for (i=0;i<matrix.length;i++ ){
        for(j=0;j<matrix.length;j++){
            // setting some variables. l:left r:right u:up d:down


            var neighbors = 0;

            var curCell = matrix[i][j];
            // logic for neighbors checking
            if(!(i+1>matrix.length - 1)){
                if(matrix[i+1][j]==1){neighbors++;}
            }
            if(!(j+1>matrix.length - 1)){
                if(matrix[i][j+1]==1){neighbors++;}
            }
            if(!(i-1<0)){
                if(matrix[i-1][j]==1){neighbors++;}
            }
            if(!(j-1<0)){
                if(matrix[i][j-1]==1){neighbors++;}
            }
            if(!(j-1<0) && !(i-1<0)){
                if(matrix[i-1][j-1]==1){neighbors++;}
            }
            if(!(j-1<0) && !(i+1>matrix.length - 1)){
                if(matrix[i+1][j-1]==1){neighbors++;}
            }
            if(!(j+1>matrix.length - 1) && !(i+1>matrix.length - 1)){
                if(matrix[i+1][j+1]==1){neighbors++;}
            }
            if(!(i-1<0) && !(j+1>matrix.length - 1)){
            if(matrix[i-1][j+1]==1){neighbors++;}
            }

            // i-1ogic making changes basej+1 on neighbors
            if(curCell==1){
                console.log("CELL:"+[i,j]+" N:"+neighbors)
                if((neighbors==3) || (neighbors==2)){blank_matrix[i][j]=1;}
                if(neighbors<2){blank_matrix[i][j]=0;}
                if(neighbors>3){blank_matrix[i][j]=0;}

            }
            else{
                if(neighbors==3){blank_matrix[i][j]=1;}
            }
              //console.log("Cell: " +[i,j] + " -> "+neighbors);




        }

    }
return blank_matrix;

}
function updateBoard(matrix){
for (i=0;i<matrix.length;i++ ){
    for (j=0;j<matrix[i].length ;j++ ){
        if(matrix[i][j]==0){$("#game_board").append("<div id='game_square' class='dead'></div>");}
        else{$("#game_board").append("<div id='game_square' class='alive'></div>");}
    }
    $("#game_board").append("<br class='break'>");
}
if (edit==1){

$("body").attr("bgcolor","black");
$(".alive").css("background","#FFFFFF");
$(".dead").css("background","#000000");
}
else{

$("body").attr("bgcolor","white");
$(".alive").css("background","#00FF00");
$(".dead").css("background","#FF0000");
}
updateHandlers();
}
function buildBlank(n){
    m = [];
    for (i=0;i<n ;i++ )
    {
        inner = [];
        for(j=0;j<n;j++){
            inner.push(0);
        }
        m.push(inner);
    }
    return m;
}
function buildFromGrid(){
var squares = $("#game_square").length;
var row_col = $(".break").length;
inner=[];
outer=[];
var count = 1;
$("div#game_square").each(function(index){
if((((index+1)/row_col)/count)==1){
if($(this).attr("class")=="alive"){inner.push(1);}
else{inner.push(0);}
outer.push(inner);
inner=[];
count++;
}
else{
if($(this).attr("class")=="alive"){inner.push(1);}
else{inner.push(0);}
}
});
return outer;
}
var step = 0;
var edit = 0;
var newMatrix;
$("#step").click(function(){
matrix = buildFromGrid();


if(step==0){
$("#game_board").empty();
newMatrix = updateMatrix(matrix);
updateBoard(newMatrix);
step++;
}
else{
$("#game_board").empty();
newMatrix = updateMatrix(newMatrix);
updateBoard(newMatrix);

buildFromGrid();
}

});
 function updateHandlers(){
$("div#game_square").unbind('click').click(function(){

if($(this).attr("class")=="alive"){
$(this).attr("class","dead");
updateHandlers();
}
else{
$(this).attr("class","alive");
updateHandlers();
}




});
 }
$("#edit").click(function(){
if (edit==0){
edit=1;
$("body").attr("bgcolor","black");
$(".alive").css("background","#FFFFFF");
$(".dead").css("background","#000000");
}
else{
edit=0;
$("body").attr("bgcolor","white");
$(".alive").css("background","#00FF00");
$(".dead").css("background","#FF0000");
}
updateHandlers();

});
updateHandlers();
});
