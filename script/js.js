
$(document).ready(function(){


    var executed = false;  // pour pas creer de tableau a l'infini

    var numeroDeTile = 1;



//test avec une nouveau url pour pas avoir a toujours chercher sur google
    $("#test").click(function(){
        $('#imgGame').attr("src","http://mespremiereslectures.com/IMG/Dofus.jpg");
        $("#urlImg").val("http://mespremiereslectures.com/IMG/Dofus.jpg");
    });
    //test


    $("#startGame").click(function(){ //fonction qui debute la partie qui trigger le bouton : start game

        var nbDeplacement = 0; // initialiser les deplacements

        var newUrl = $("#urlImg").val(); //avoir le nouveau url

        var image = $("#imgGame"); //avoir l'image
        if(executed === true){ // si deja executer, doit refress TODO : trouver une alternative
            alert("Refresh the website, and enter a new url :)");
            return;
        }
        var colonne = $("#nbColonne").val(); //nb de colonne/ligne
        var ligne = $("#nbLigne").val();
        if(colonne === "" ){ //si nul on initialise a 2
            colonne = 2;
            $("#nbColonne").val("2");
        }
        if(ligne === ""){
            ligne = 2;
            $("#nbLigne").val("2");
        }

        //Le jeu
        var imgWidth = image.width();
        var imgHeigth = image.height();
        var tileHeight = Math.floor(imgHeigth/ligne);
        var tileWidth = Math.floor(imgWidth/colonne);

        var tableWidth = parseInt(imgWidth) + parseInt(colonne) - 1; // il y a des border de 1px entre chaque case donc
        var tableHeight =  parseInt(imgHeigth) + parseInt(ligne) - 1; // jaugmente la taille pour eviter les debordements

        //TODO : quand on va pouvoir bouger, faire les deplacement
        $("#nbDeplacement").text("TableWidth = " + tableWidth + " TableHeight = " + tableHeight); // juste de l'info
        nbDeplacement++;

        //Creation de la table DOM
        var table = document.createElement("TABLE"); //create table
        table.setAttribute("id", "myTableGame"); // add an id
        table.style.width = tableWidth + "px"; // set width and height
        table.style.height = tableHeight +"px";
        document.getElementById("game").appendChild(table); //append the table to the div <<game>>

        for(var i=0; i < ligne;i++){ //set the TR and TDs
            var y = document.createElement("TR");
            y.setAttribute("id", "myTr" +i);
            document.getElementById("myTableGame").appendChild(y);
            for(var j=0; j < colonne;j++){ // each tr get<s his number od TDs
                var z = document.createElement("TD");
                z.setAttribute("id", "T" + numeroDeTile);
                var t = document.createElement("p"); // add an element p with the tile number
                t.innerHTML = "" + numeroDeTile;
                numeroDeTile++;
                z.style.width = tileWidth + "px"; //size of TD
                z.style.height = tileHeight + "px";
                if((j+1)*(i+1) === colonne*ligne){ // the last tile is grey
                    z.style.background = "grey"
                }
                else{
                    z.style.background = "url('"+newUrl+"')"; // set the background of TDs
                }
                z.style.backgroundPositionX = j/(colonne-1) * 100 + "%"; // cut the image so each TD get<s the right cut
                z.style.backgroundPositionY = i/(ligne-1) * 100 + "%";
                z.appendChild(t); // append the tile numbers to TDs
                document.getElementById("myTr" + i).appendChild(z); // append the TD to the TR
            }
        }


        $('#succes').css("display","none"); // cache l,image veritable

        alert("Image = " + imgWidth + " x " + imgHeigth + ". Tiles = " + tileWidth + " x " + tileHeight); // juste pour avoir les dimensions
        numeroDeTile --; //il y aura tjrs une tuile fictive, pour garder le bon nombre on decremente
        executed = true;
    });

    $("#brasser").click(function(){ //TODO:
        if(executed === false){
            $("#affichage").trigger('click');
        }
    });

    $('#affichage').click(function(){  // affiche l<image sans start le jeu
        $('#imgGame').attr("src",newUrl); //change l'image
    });

    $('#affichageDeNum').click(function () { //TODO : marche pas vraiment
        if($(this).is(':checked')){
            $('td p').css("display","auto");
        }
        else{
            ($('td p').css("display","none"));
        }

    });

    $("tr").click(function(){
        alert("hely");
        /*tmpx = $(this).backgroundPositionX;
        console.log("tmpx: " + tmpx);
        $(this).backgroundPositionX = tmpx.slice(0, -1) + 50 + "%";
        */
        $("tr").style.background = "none";
    });

});
