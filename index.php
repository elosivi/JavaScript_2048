<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Rush 2048</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="responsive.css">
    <link href="https://fonts.googleapis.com/css?family=Baloo+2:700|Clicker+Script|Fredericka+the+Great|Kranky|La+Belle+Aurore&display=swap" rel="stylesheet">
</head>
<body>
    <div id="body"></div>



<!-------------- F R A M E     P L A Y  ---------------------- -------------------> 
        <div id="play"> 

    <!-------------- header---------------------- -------------------> 
            <h1><img id="poing" src="img/poing.png"><span class="topSecret">2048</span> against <span class="topSecret">Covid19 </span> <img src="img/virus.png"></h1>
            <p><span id="saveUs">Save us ! Stay at home and make a 2048 to kill coronavirus !</span></p>
            <br>

    <!-------------- >>>>>  loose pop up  -------------  H I D E --------------------------->
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h1>Arrrghhhhh too late ! <br> Somebody just dead </h1> 
                        <img src="img/loose.png" alt="personne qui éternue entourée de virus"> 
                        <h2><br>...and we have to stay at home one more day ... <br> Pleeeaaasse... try again !</h2>
                    </div>
                </div>

    <!-------------- >>>>>  win pop up  -------------  H I D E --------------------------->
                <div id="myModal2" class="modal2">
                    <div class="modal-content2">
                        <span class="close2">&times;</span>
                        <h1>2 0 4 8 !!!! <br> Yeeaahhh you win ! Wooouuhhh !!! </h1> 
                        <img src="img/win.png" alt="personne qui asperge et tue un virus"> 
                        <h2> <br>You're so strong...! <br> Pleeeeease, kill another Covid19 !</h2>
                    </div>
                </div>


    <!-------------- T H E    G A M E      +      C O N S O L E--------------------------------------->            
            
            <div class="flex playerPlace">


        <!-------------- the game --------------------------------------->

                <div class="Games">
                        <!--  2048 plugin here -->
                </div>

        

                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
                <script type="text/javascript" src="Base2048.js"></script>
                <script type="text/javascript">
                    $(function()
                    {
                        $('.Games').game2048(); // appel de la fonction 'game2048' du pluggin appliquée à la div de class 'Games'
                    });
                </script>

            
    <!-------------- console score & buttons --------------------------------------->

                <div id="console">
                    <div  class="infoGame flex space-between">      <div class="left">step: </div>         <div><span id="step"></span></div>                        </div>
                    <div  class="infoGame flex space-between">      <div class="left">max: </div>          <div><span name="bestsum" id="bestsum"></span></div>      </div>
                    <div class="infoGame flex space-between">       <div class="left">score: </div>        <div><span id="score" ></span></div>                      </div>
                    
                    <div  class="infoGame flex space-between">      <div class="left">high scores: </div>  
                    <div class="right"><span id="bestSum"><?php echo $_COOKIE['bestSum']?> </span> / <span id="bestScore"><?php echo $_COOKIE['bestScore']?> </span></div>                                                                       </div>

                    <div id="space"></div>

                    <div class="buttonsGame">
                        <!-- <button id="undo"><i class="fas fa-undo-alt"></i></button> -->
                        <button id="newGame">Kill a new virus ?</button>
                    </div>
                
                </div>
        


            </div><!--end of div.flex-->
        </div>  <!--end of div#play-->


<!-------------- FRAME FOOTER - RULES --------------------------------------->
        
        <div id="legend"> 
            <p> <span id="rules">RULES :</span> </p>
            <p>Use keyboard arrows to move cells, add identical cells together until you get a 2048 score  </p>
            <ul>
                <li><i class="fas fa-caret-up"></i> Go up</li>
                <li><i class="fas fa-caret-left"></i>Go left</li>
                <li><i class="fas fa-caret-down"></i>Go dowm</li>
                <li><i class="fas fa-caret-right"></i>Go right</li>
            </ul>
        </div>



    </div><!--end of div#body-->
</body>
</html>
