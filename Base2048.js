
(function($)
{
    $.fn.game2048 = function() 
    {
        var countUp=0;
        var countLeft=0;
        var countRight=0;
        var countDown=0;
        var count = countLeft + countUp + countRight + countDown;
        var score=0;
        var countZero = 0; 
        var countAdd = 0; 
        var generateNewCell = true;

    //////////////////////////////////////////////////////////// F U N C T I O N    G E N E R A T E     G R I D     4 X 4 DE 0 ////////////////////////////////////////////////////////////
        function generateMap() 
        {
            let table = $('<table id="table"></table>');
            for (let y = 0; y < 4; y++)
            {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++)
                {
                    let cell = $('<td class="cell" id="cell'+y+x+'">0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            
            return table;
        }

    //////////////////////////////////////////////////////////// F U N C T I O N    G E N E R A T E      C E L L    C O N T E N T  ////////////////////////////////////////////////////////////
        function generateCell(cells)
        {
            for (let i = 0; i < cells; i++)
            {
                let empty = false;
                let count = 0;

                while ((empty === false)&&(count<=17)) // et tant que le compteur est inf ou = 16 au cas où aucune cell à 0 - 16 car le random va générer de 0 à 3 pour x et pour y et qu'il existe 16 combinaisons diff
                {
  
                        let x = Math.floor((Math.random() * 4));
                        let y = Math.floor((Math.random() * 4));
                        var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');
                        count ++;
                        if (elem[0]){
                            empty = true;
                        }
                }

                let value =  2 * (Math.floor((Math.random() * 2) + 1));
                if (value === 4 && Math.random() > 0.5)
                    value = 2;
               

                elem.attr('nbr', value);
                elem.text(value);
            }           
        }
        

    //////////////////////////////////////////////////////// F U N C T I O N S   L I S T E N   K E Y B O A R D  //////////////////////////////////////////////////
        $('html').keydown(function(event) 
        {
            //for each keydown : 
            // 1- start the associated function
            // 2- generate one new cell if rules allows
            // 3- count each step + add all steps between them
            // 4- send a message to console (for dev)

            switch (event['key']) {
                
                case 'ArrowLeft':
                    moveLeft();
                    if(generateNewCell===true){
                        generateCell(1); 
                    }
                    countLeft++;
                    count = countLeft + countUp + countRight + countDown;             
                    IsNoWay()
                    break;

                case 'ArrowUp':
                    moveUp();
                    if(generateNewCell===true){
                        generateCell(1); 
                    }
                    countUp++;
                    count = countLeft + countUp + countRight + countDown;
                    IsNoWay()
                    break;

                case 'ArrowRight':
                    moveRight();
                    if(generateNewCell===true){
                        generateCell(1); 
                    }
                    countRight++;
                    count = countLeft + countUp + countRight + countDown;
                    IsNoWay()
                    break;

                case 'ArrowDown':
                    moveDown();
                    if(generateNewCell===true){
                        generateCell(1); 
                    }
                    countDown++;
                    count = countLeft + countUp + countRight + countDown;
                    IsNoWay()
                    break; 
            }
           $('#step').text(count);
       
        });

    ///////////////////////////////   F U N C T I O N S     M O O V E   ////////////////////////////////          
        // each function do this :
        // it traverses each cell in an order defined according to the orientation of the chosen move
    
        // 1- it counts the number of boxes to 0 for after (loose function)
        // 2- if the box just after (according to the movement) is at 0 it takes its place and generates a 0 to allow the next loop to place the other boxes and not to duplicate
        // 3- if the box just after (according to the movement) has the same value, they add up and generate a zero etc ...
        // 3bis- it counts the number of additions and move to 0 that have been generated to manage rules of game.
        // loop output : 
        //      if no addition could be generated AND no box is zero then the player has lost
        //      otherwise it generates the mentioned functions: returns the table in the td, generates the score.
                
            function moveLeft(){
                countZero=0;
                countAdd=0;
                countTakeZero=0;
                var game = CreateTab();
                generateNewCell=true;
                $.each( game, function( key, value ) {
                    for (var x=1;x<4; x++){
                        for (var y=0; y<4; y++){
                            if(game[y][x]==0){ 
                                countZero++;
                            }
                            if(game[y][x-1]==0){  
                                if(game[y][x]==0){
                                    continue
                                }
                                game[y][x-1] = game[y][x];
                                game[y][x]=0;
                                countTakeZero++;
                            }
                            if(game[y][x-1]==game[y][x]){
                                    if(game[y][x-1]==0){
                                        continue
                                    }
                                game[y][x-1]=((game[y][x]+game[y][x-1])*(-1));
                                game[y][x]=0;
                                score+=game[y][x-1]*(-1);
                                $('#score').text(score);
                                countAdd++;
                            }
                        }
                    }
                });
                if((countTakeZero==0)&&(countAdd==0)){
                    generateNewCell=false;
                }else{
                    generateNewCell=true;
                }
                PositiveTab(game);
                ReturnTab(game);
                bestSum(game);
            }


            function moveUp(){
                countZero=0;
                countAdd=0;
                countTakeZero=0;
                var game = CreateTab();
                generateNewCell=true;
                $.each( game, function( key, value ) {

                    for (var y=1; y<4; y++){
                        for (var x=0;x<4; x++){
                            if(game[y][x]==0){
                                countZero++;
                            }

                            if(game[y-1][x]==0){  
                                if(game[y][x]==0){
                                    continue
                                }
                                game[y-1][x] = game[y][x];
                                game[y][x]=0;
                                countTakeZero++;
                            }

                            if(game[y-1][x]==game[y][x]){
                                if(game[y-1][x]==0){
                                    continue
                                }
                                game[y-1][x]=((game[y][x]+game[y-1][x])*(-1));
                                game[y][x]=0;
                                score+=game[y-1][x]*(-1);
                                $('#score').text(score);
                                countAdd++;
                            }
                        }                       
                    }
                });
                if((countTakeZero==0)&&(countAdd==0)){
                    generateNewCell=false;
                }else{
                    generateNewCell=true;
                }
                PositiveTab(game);
                ReturnTab(game);
                bestSum(game);
            }

            function moveRight(){
                countZero=0;
                countAdd=0;
                countTakeZero=0;
                generateNewCell=true;
                var game = CreateTab();

                $.each( game, function( key, value ) {
                    for (var x=2;x>=0; x--){
                        for (var y=0; y<4; y++){
                            if(game[y][x]==0){ 
                                countZero++;
                            }

                            if(game[y][x+1]==0){  
                                if(game[y][x]==0){
                                    continue
                                }
                                game[y][x+1] = game[y][x];
                                game[y][x]=0;
                                countTakeZero++;
                            }
                            if(game[y][x+1]==game[y][x]){
                                if(game[y][x+1]==0){
                                    continue
                                }
                                game[y][x+1]=((game[y][x]+game[y][x+1])*(-1));
                                game[y][x]=0;
                                score+=game[y][x+1]*(-1);
                                $('#score').text(score);
                                countAdd++;
                            }
                        }
                    }

                });
                if((countTakeZero==0)&&(countAdd==0)){
                    generateNewCell=false;
                }else{
                    generateNewCell=true;
                }
                PositiveTab(game);
                ReturnTab(game);
                bestSum(game);
            }

            function moveDown(){
                countZero=0;
                countAdd=0;
                countTakeZero=0;
                generateNewCell=true;
                var game = CreateTab();
                $.each( game, function( key, value ) {
                    
                    for (var y=2; y>=0; y--){
                        for (var x=0;x<4; x++){
                            if(game[y][x]==0){ 
                                countZero++;   
                            }
                            if(game[y+1][x]==0){  
                                if(game[y][x]==0){
                                    continue
                                }
                                game[y+1][x] = game[y][x];
                                game[y][x]=0;
                                countTakeZero++;
                            }
                            if(game[y+1][x]==game[y][x]){
                                if(game[y+1][x]==0){
                                    continue
                                }
                                game[y+1][x]=((game[y][x]+game[y+1][x])*(-1));
                                game[y][x]=0;
                                score+=(game[y+1][x])*(-1);
                                $('#score').text(score);
                                countAdd++;
                            }
                        }
                    }
                });
                    if((countTakeZero==0)&&(countAdd==0)){
                        generateNewCell=false;
                    }else{
                        generateNewCell=true;
                    }
                PositiveTab(game); 
                ReturnTab(game); 
                bestSum(game); 
            }

    /////////////////////////////////////////////////////// F O N C T I O N S  N E W   G A M E   &    D I V E R S E S   ////////////////////////////////////////////////////////////// 
        $(document).ready(function() {

            $('#saveUs').delay(800).addClass('wobble');

            $("button").click(function() {
                document.location.reload(true);
            });

            $("#newGame").hover(function() {
                $('#newGame').addClass('wobble');
            });
     

            $("h1").hover(function() {
                $('h1').addClass('zoomInLeft');
            });
            

        });

    /////////////////////////////// F O N C T I O N S      A U T O U R     D U      A R R A Y   /////////////////////////////////////////////
    // to push td values in a array
        function CreateTab(){
            var tabGame=[];
            for (var y=0; y<4; y++){
                tabGame.push([]);
                for (var x=0;x<4; x++){
                    var value=parseInt($('td[x=' + x + '][y=' + y + ']').text());
                    tabGame[y].push(value);

                }
            }
            return(tabGame);
        }

    // to push values from array to td for display game
        function ReturnTab(tab){
            for (var y=0; y<4; y++){
                for (var x=0;x<4; x++){
                    var value = tab[y][x];
                    $('td[x=' + x + '][y=' + y + ']').attr('nbr', value);
                    $('td[x=' + x + '][y=' + y + ']').text(value);
                }
            }
            return(tab);
        }
    
    //to manage each box is added only once per turn I use negatives number, then it have to put all the numbers in the positive before returning the values in td

        function PositiveTab(tab){
            for (var y=0; y<4; y++){
                for (var x=0;x<4; x++){
                    var value = tab[y][x];
                    if (value<0){
                        tab[y][x] = (-value);
                    }
                }
            }
            return(tab);
        }

        
    // detect ifimpossible merges --> loose

        function IsNoWay(){
        var ActualTab = CreateTab();
        var PlayIsPossible = 0;
            
            for (var y=0; y<4; y++){
                for (var x=0;x<3; x++){
                    var studiedValue = ActualTab[y][x];
                    if(studiedValue == ActualTab[y][x+1]) {
                        PlayIsPossible++;
                    }
                    
                }
            }

            for (var y=0; y<3; y++){
                for (var x=0;x<4; x++){
                    var studiedValue = ActualTab[y][x];
                    if(studiedValue == ActualTab[y+1][x]){
                        PlayIsPossible++;
                    }
                }
            }

            for (var y=0; y<4; y++){
                for (var x=0;x<4; x++){
                    var studiedValue = ActualTab[y][x];
                    if(studiedValue==0){
                        PlayIsPossible++;
                    }
                }
            }

            if(PlayIsPossible == 0){
                console.log ("No more play possible, you loose !");
                loose();
            }else{
                return PlayIsPossible;  
            }
        }
    
    // to find the max in a multidim array (max) 
        function max(tab){
            var Uniqtab = [];
            for (var y=0; y<4; y++){
                for (var x=0;x<4; x++){
                    var value = tab[y][x];
                Uniqtab.push(value);
                }
            }

            var temp =0;
            for(i=0; i<Uniqtab.length; i++){
                if(Uniqtab[i]>Uniqtab[0]){
                    temp=Uniqtab[0];
                    Uniqtab[0]=Uniqtab[i];
                    Uniqtab[i]=temp;
                }
            }
            var max = Uniqtab[0];
            return max;
        }


    // to manage the 2048 score     ********* R E M E T T R E      A    2 0 4 8 ********

        function bestSum(tab){
            var ActualBestSum = document.getElementById('bestSum').textContent;

            if(ActualBestSum == null){
                ActualBestSum.text(2);
                ActualBestSum = 2;
                document.cookie = "bestSum= "+ActualBestSum+"; expires=Thu, 31 Dec 2020 23:59:59 UTC";
            }else{
                document.cookie = "bestSum= "+ActualBestSum+"; expires=Thu, 31 Dec 2020 23:59:59 UTC";
            }
        
            var scoreSum = max(tab);
            $('#bestsum').text(scoreSum);

            if(scoreSum>ActualBestSum){
                document.cookie = "bestSum= "+scoreSum+"; expires=Thu, 31 Dec 2020 23:59:59 UTC";
            }

            if(scoreSum === 2048){ 
                console.log("Y O U     W I N   !!!!  C O V I D 19    I S    D E A D")
                win();
            }
            return scoreSum;
        }
                

    //to manage all scores an return only the best one

        function bestScore(){
            var ActualBestScore = document.getElementById('bestScore').textContent;
            var NewScore = document.getElementById('score').textContent;
            if ( NewScore > ActualBestScore ){
                alert("Wooh ! You just improve your best score !")
            document.cookie = "bestScore="+NewScore+"; expires=Thu, 31 Dec 2020 23:59:59 UTC";
            }
        }
    
    ///////////////////////////////   F O N C T I O N S     L O O S E  &    W I N  ////////////////////////////////

    // if user loose:
        function loose(){
            bestScore();
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            
            modal.style.display = "block";
            span.onclick = function() {
            modal.style.display = "none";
            }
            
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }

    // If user win, making 2048:

        function win(){
            console.log("T H A N K     Y O U ;) ")
            bestScore();
            var modal2 = document.getElementById("myModal2");
            var span2 = document.getElementsByClassName("close2")[0];

            modal2.style.display = "block";
            span2.onclick = function() {
            modal2.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal2) {
                    modal2.style.display = "none";
                }
            }
        }
    ///////////////////////////////   L A N C E M E N T      D U      J E U   ////////////////////////////////
        $(this).append(generateMap());
        generateCell(2);     
    }
})(jQuery); 

//>>>>>>>>>>>>>>>>>>>>>>>>>>>> fin du pluggin <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
