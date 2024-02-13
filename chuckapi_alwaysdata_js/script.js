// L'URL de base de l'API
const baseUrl = ' https://chuckapi.alwaysdata.net';
const resource = '/chuckapi/v2'


// Méthode pour effectuer un appel API GET pour récupérer toutes les phrases
function getAllPhrases() {
    fetch(baseUrl + resource)
        .then(response => response.json())
        .then(data => {
            // Afficher les informations de réponse
            let infoReponse = {
                status: data.status,
                status_code: data.status_code,
                status_message: data.status_message
            };
            displayInfoResponse(document.getElementById('infoGetAllPhrases'), infoReponse);

            displayData(data.data);
        })
        .catch(error => console.error('Erreur:', error));

}

// Méthode pour effectuer un appel API GET pour récupérer une seule phrase
function getPhrase() {
    /*TODO : Remplacer/Adapter le code ci-dessous par votre code de récupération d'une phrase avec la méthode GET*/
    // Récupérer la valeur d'une balise <input> identifiée avec l'id 'phraseID' : <input type="text" id="phraseID">
    var valeurDeLaBalise = document.getElementById('phraseID').value;
    //Construire le message à afficher
    var message = 'Le contenu de la balise est : ' + valeurDeLaBalise;


    fetch(baseUrl + resource + '/' + valeurDeLaBalise)
        .then(response => response.json())
        .then(data => {
            // Afficher les informations de réponse
            let infoReponse = {
                status: data.status,
                status_code: data.status_code,
                status_message: data.status_message
            };
            displayInfoResponse(document.getElementById('infoGetPhrase'), infoReponse);

            displayData(data.data);
        })
        .catch(error => console.error('Erreur:', error));


}

// Méthode pour créer une nouvelle phrase
function addPhrase() {
    /*TODO : Remplacer/Adapter le code ci-dessous par votre code d'envoi d'une phrase avec la méthode POST*/
    // Afficher un message dans une boîte de dialogue pour l'exemple
    var valeurDeLaBalise = document.getElementById('newPhrase').value;
    // executer la requete POST 
    fetch(baseUrl + resource, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phrase: valeurDeLaBalise }),
    })
        .then(response => response.json())
        .then(data => {
            // Afficher les informations de réponse
            let infoReponse = {
                status: data.status,
                status_code: data.status_code,
                status_message: data.status_message
            };
            displayInfoResponse(document.getElementById('infoAddPhrase'), infoReponse);

            displayData(data.data);
        })
        .catch(error => console.error('Erreur:', error));
}

// Méthode pour mettre à jour une phrase
function updatePhrase() {
    /*TODO : Remplacer/Adapter le code ci-dessous par votre code de mise à jour d'une phrase avec la méthode PATCH puis PUT*/
    var idPhrase = document.getElementById('updatePhraseID').value;
    var updateContent = document.getElementById('updateContent').value;
    if (document.getElementById('methodPut').checked) {
        var method = 'PUT';
    } else if (document.getElementById('methodPatch').checked) {
        var method = 'PATCH';
    }
    var vote = document.getElementById('updateVote').value;
    var faute = document.getElementById('updateFaute').checked ? 1 : 0;
    var signalement = document.getElementById('updateSignalement').checked ? 1 : 0;
    // executer la requete PATCH si le radio button methodPatch est coché

    fetch(baseUrl + resource + '/' + idPhrase, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phrase: updateContent,
            id: idPhrase,
            vote: vote,
            faute: faute,
            signalement: signalement
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Afficher les informations de réponse
            let infoReponse = {
                status: data.status,
                status_code: data.status_code,
                status_message: data.status_message
            };
            displayInfoResponse(document.getElementById('infoUpdatePhrase'), infoReponse);

            displayData(data.data);
        })
        .catch(error => console.error('Erreur:', error));


}

// Méthode pour supprimer une phrase
function deletePhrase() {
    let idPhrase = document.getElementById('deletePhraseID').value;
    fetch(baseUrl + resource + '/' + idPhrase, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idPhrase,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Afficher les informations de réponse
            let infoReponse = {
                status: data.status,
                status_code: data.status_code,
                status_message: data.status_message
            };
            displayInfoResponse(document.getElementById('infoUpdatePhrase'), infoReponse);

            displayData(data.data);
        })
        .catch(error => console.error('Erreur:', error));
}

// Méthode pour afficher les données dans le tableau HTML
function displayData(phrases) {
    const tableBody = document.getElementById('responseTableBody');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponse');
    apiResponse.style.display = phrases.length > 0 ? 'block' : 'none';

    phrases.forEach(phrase => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = phrase.id;
        row.insertCell(1).textContent = phrase.phrase;
        row.insertCell(2).textContent = phrase.date_ajout;
        row.insertCell(3).textContent = phrase.date_modif;
        row.insertCell(4).textContent = phrase.vote;
        row.insertCell(5).textContent = phrase.faute;
        row.insertCell(6).textContent = phrase.signalement;
    });
}

// Mise à jour de la fonction pour afficher les informations de réponse
function displayInfoResponse(baliseInfo, info) {
    if (info) {
        baliseInfo.textContent = `Statut: ${info.status}, Code: ${info.status_code}, Message: ${info.status_message}`;
        baliseInfo.style.display = 'block';
    } else {
        baliseInfo.style.display = 'none';
    }
}

// Attacher les événements aux boutons
document.getElementById('getAllPhrases').addEventListener('click', getAllPhrases);
document.getElementById('getPhrase').addEventListener('click', getPhrase);
document.getElementById('addPhrase').addEventListener('click', addPhrase);
document.getElementById('deletePhrase').addEventListener('click', deletePhrase);
document.getElementById('updatePhrase').addEventListener('click', updatePhrase);
