document.addEventListener("deviceready", onDeviceReady, false);

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);

// var projetField = "projet_id, projet_tache, projet_tache_prealable, projet_commentaire, projet_statut, projet_date_debut, projet_date_fin, projet_duree";
var tache;
var prealable;
var commentaire;
var statut;
var debut;
var fin;
var duree;

function onDeviceReady() {
    db.transaction(createdDB, errorCB, successCB);
    db.transaction(selectTable, errorCB, successCB);
}

function createdDB(tx)
{
   
    tx.executeSql("CREATE TABLE IF NOT EXISTS projet (projet_tache, projet_tache_prealable, projet_commentaire, projet_statut, projet_date_debut, projet_date_fin, projet_duree)");
}

function errorCB(tx, err) {
    console.log(err);
}

function successCB() {
    console.log("success!");
}

function selectTable(tx)
{
   tx.executeSql('SELECT * FROM projet', [], function(tx, result)
   {
        displayProjet = result.rows;
        console.log(result.rows);
        for (i=0; i<displayProjet.length; i++)
        {             
            $("#tableau").append('<tr><td>'+displayProjet[i].projet_tache+'</td><td>'
            +displayProjet[i].projet_tache_prealable+'</td><td>'+displayProjet[i].projet_commentaire+'</td><td>'+displayProjet[i].projet_statut
            +'</td><td>'+displayProjet[i].projet_date_debut+'</td><td>'+displayProjet[i].projet_date_fin+'</td><td>'+displayProjet[i].projet_duree+'</td><td><button class="modif btn btn-warning">Modifier</button></td><td><button class="supprime btn btn-danger">Supprimer</button></td></tr>');             
        }
   })
}


function insert(tx)
{
    sql = 'INSERT INTO projet (projet_tache, projet_tache_prealable, projet_commentaire, projet_statut, projet_date_debut, projet_date_fin, projet_duree) VALUES ("' + tache + '", "'+ prealable + '", "'+ commentaire +'", "'+ statut + '", "'+ debut + '", "'+ fin + '", "'+ duree + '")';
    tx.executeSql(sql);
    console.log(sql);
}

$('#btnValider').click(function()
{  
    tache = $("#inputTache").val();
    prealable = $("#inputPrealable").val();
    commentaire = $("#inputCommentaire").val();
    statut = $("#inputStatut").val();
    debut = $("#inputDebut").val();
    fin = $("#inputFin").val();
    duree = $("#inputDuree").val();
    db.transaction(insert, errorCB, successCB);
    location.href="index.html";
});    

