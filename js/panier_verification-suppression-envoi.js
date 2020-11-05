/*Formulaire et vérif etat panier
**********************************************/

//vérifie les inputs du formulaire
checkInput = () =>{

    //Controle Regex
    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;

    //Source pour vérification email => emailregex.com
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    //Récupération des inputs
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let formMail = document.getElementById("formMail").value;
    let formAdresse = document.getElementById("formAdresse").value;
    let formVille = document.getElementById("formVille").value;


    //tests des différents input du formulaire
    //Variable pour confirmer chaque saisie
    let contactValide = true; 

    //variables pour afficher les messages d'erreurs
    let errorFirstName = document.getElementById("errorFirstName");
    let errorLastName = document.getElementById("errorLastName");
    let errorMail = document.getElementById("errorMail");
    let errorAddress = document.getElementById("errorAddress");
    let errorTown = document.getElementById("errorTown");

    //Test du prénom => aucun chiffre ou charactère spécial permis
    if(checkNumber.test(firstName) == true || checkSpecialCharacter.test(firstName) == true || firstName == "") {
        contactValide = false; 
        errorFirstName.setAttribute("class", "d-block text-danger");
    } else {
        console.log("Administration : Prénom ok");
        errorFirstName.setAttribute("class", "d-none");
    };

    //Test du nom => aucun chiffre ou charactère spécial permis
    if(checkNumber.test(lastName) == true || checkSpecialCharacter.test(lastName) == true || lastName == "") {
        contactValide = false;
        errorLastName.setAttribute("class", "d-block text-danger");
    } else {
        console.log("Administration : Nom ok");
        errorLastName.setAttribute("class", "d-none");
    };

    //Test du mail selon le regex de la source L256
    if(checkMail.test(formMail) == false){
        contactValide = false;
        errorMail.setAttribute("class", "d-block text-danger");
    } else {
        console.log("Administration : Adresse e-mail ok");
        errorMail.setAttribute("class", "d-none");
    };
    
    //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
    if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == "") {
        contactValide = false;
        errorAddress.setAttribute("class", "d-block text-danger");
    } else {
        console.log("Administration : Adresse ok");
        errorAddress.setAttribute("class", "d-none");
    };
    //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
    if(checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == ""){
        contactValide = false;
        errorTown.setAttribute("class", "d-block text-danger");
    } else {
        console.log("Administration : Ville ok");
        errorTown.setAttribute("class", "d-none");
    };

    //Si un des champs n'est pas bon => message d'alerte 
    if(contactValide == false) {
        alert("Votre fiche Contact contient une erreur");
    } else {

    //Si tout est ok construction du array contact 
        contact = {
            firstName : firstName,
            lastName : lastName,
            address : formAdresse,
            city : formVille,
            email : formMail
        };
        return contact;
    };
};

//Vérification du panier
//Création de 'products' une liste d' "_id" pour l'objet du formulaire L.185
let products = [];
checkPanier = () =>{

    //Vérifier qu'il y ai au moins un produit dans le panier
    let etatPanier = JSON.parse(localStorage.getItem("userPanier"));

    //Si le panier est vide ou null (suppression localStorage par)=>alerte
     if (etatPanier.length < 1 || etatPanier == null) {
        console.log("Administration: ERROR =>le localStorage ne contient pas de panier");
        alert("Votre panier est vide");
        return false;
    } else {
        console.log("Administration : Le panier n'est pas vide");

        //Si le panier n'est pas vide on rempli le products envoyé à l'API
        etatPanier.forEach((produit) => {
            products.push(produit._id);
        });
        console.log("Administration : Ce tableau 'products' sera envoyé dans à l'API : " + products);
        return true;
    }
};


//Supprimer un produit du panier L.67 de "panier_diplay.js"
let userPanier = JSON.parse(localStorage.getItem("userPanier"));
annulerProduit = (i) =>{
    console.log("Administration : Enlever le produit à l'index " + i);
      
    //recupérer le array
    userPanier.splice(i, 1); 
    console.log("Administration : " + userPanier);

    //vide le localstorage
    localStorage.clear();
    console.log("Administration : localStorage vidé");

    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log("Administration : localStorage mis à jour");

    //relancer la création de l'addition
    window.location.reload();
};

/*Envoi du formulaire
**********************************************/

//Fonction requet post de l'API
envoiDonnees = (objetRequest) => {
     return new Promise((resolve)=> {
         let request = new XMLHttpRequest();

         //L'ERREUR ETAIT LA !!!!! ce n'était pas onreadystatechange, mais onload !!!! 
         request.onload = function () {
             if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                
                 //Sauvegarde du retour de l'API dans sessionStorage pour affichage dans order-confirm.html
                 sessionStorage.setItem("order", this.responseText);
                 window.location.href="./order-confirm.html";
                 resolve(JSON.parse(this.responseText));
                 console.log("Administration : status : " + this.status);
                 console.log("Administration : objet 'order' envoyé au session storage")
             }
         };
         request.open("POST", APIURL + "order");
         request.setRequestHeader("Content-Type", "application/json");
         request.send(objetRequest);
    console.log(objetRequest)
    });
};

//Au click sur le btn de validation du formulaire
validForm = () => {

    //Ecoute de l'event click du formulaire
    let btnForm = document.getElementById("envoiPost");

    //pas besoin de .preventDefault vu que le bouton n'est pas un submit
    btnForm.addEventListener("click", function () {

        //Lancement des verifications du panier et du form => si Ok envoi
        if (checkPanier() == true && checkInput() != null) {
            console.log("Administration : L'envoi peut etre fait");
            
            //Création de l'objet à envoyer
            let objet = {
                contact,
                products
            };

            //Conversion en JSON
            let objetRequest = JSON.stringify(objet);
            console.log("Administration : Création de l'objet : " + objetRequest);

            //Envoi de l'objet via la function L.122
            let test = envoiDonnees(objetRequest);
            test;
            console.log(test);
            console.log("Administration : Envoi de l'objet en POST" );

            //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
            contact = {};
            products = [];
            localStorage.clear();
            console.log("Administration : Local storage vidé");
            
            //Chargement de la page de confirmation
        } else {
        console.log("Administration : ERROR");
        };
    });
};

