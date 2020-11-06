/*Page panier
**********************************************/

addition = () =>{

    //récupération du block info panier vide
    let panierVide = document.getElementById("panierVide")
    
    //Vérifie si il y a un produit dans le panier
    if(JSON.parse(localStorage.getItem("userPanier")).length > 0){

        //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
        panierVide.setAttribute("class", "d-none")
        
        //Création de la structure principale du tableau  
        let facture = document.createElement("ul");
        let ligneTableau = document.createElement("li");
        let colonneNom = document.createElement("h2");
        let ligneTotal = document.createElement("li");
        let colonneRefTotal = document.createElement("p");
        let colonnePrixPaye = document.createElement("p");

        //Placement de la structure dans la page et du contenu des entetes
        let factureSection = document.getElementById("panier-resume");
        factureSection.appendChild(facture);
        facture.appendChild(colonneNom);
        colonneNom.textContent = "Votre panier";
        
        //Pour chaque produit du panier, on créé une ligne avec le nom, le prix
        //Init de l'incrémentation de l'id des lignes pour chaque produit
        let i = 0;
        const userPanier = JSON.parse(localStorage.getItem("userPanier"));
        userPanier.forEach((produit)=>{

            //Création de la ligne
            let listeProduit = document.createElement("li");
            let ligneProduit = document.createElement("div");
            let produitImage = document.createElement("img");
            let nomProduit = document.createElement("p");

            //div pour aligner les prix à droite
            let droite =  document.createElement("div");
            let prixUnitProduit = document.createElement("p");
            let removeProduit = document.createElement("i");

            //Ajout des attributs aux balises pour la création du style via bootstrap "card style"
            //Zone facture
            factureSection.setAttribute("class","card-deck col-12 mb-3 py-3");  
            facture.setAttribute("class","card d-flex align-items-center py-3"); 
            
            //Titre facture
            colonneNom.setAttribute("class"," card-title text-center");  
            
            //Zone produit (li)
            listeProduit.setAttribute("class","card d-flex col-10  col-sm-8 col-md-7 col-lg-6 col-xl-5");
            ligneProduit.setAttribute("class","card-body d-flex align-items-center justify-content-between p-2");
            
            //Info produit
            produitImage.setAttribute("src", produit.imageUrl);
            produitImage.setAttribute("alt", "image du produit"); 
            produitImage.setAttribute("class", "card-img pr-3");
            nomProduit.setAttribute("class","card-text pr-3 mb-0");
            droite.setAttribute("class","d-flex align-items-center justify-content-between");
            prixUnitProduit.setAttribute("class","card-text pr-3 mb-0");
            
            //Zone total
            ligneTotal.setAttribute("class","list-group-item d-flex  ");
            colonneRefTotal.setAttribute("class","pr-2");

            //Supprimer un seul produit (création élément L.41)
            ligneProduit.setAttribute("id", "produit"+i);
            removeProduit.setAttribute("id", "remove"+i);
            removeProduit.setAttribute('class', "fas fa-trash-alt annulerProduit btn btn-outline-dark");
            
            //Pour chaque produit on crée un event sur l'icone de la corbeille pour annuler ce produit
            //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
            //annulerProduit L117
            removeProduit.addEventListener('click', annulerProduit.bind(i));
            i++;

            //Insertion dans le HTML
            facture.appendChild(listeProduit);
            listeProduit.appendChild(ligneProduit);
            ligneProduit.appendChild(produitImage);
            ligneProduit.appendChild(nomProduit);
            ligneProduit.appendChild(droite);
            droite.appendChild(prixUnitProduit);
            droite.appendChild(removeProduit);

            //Contenu des lignes
            nomProduit.innerHTML = produit.name;
            prixUnitProduit.textContent = produit.price / 100 + " €";

            console.log("Administration : Le produit "+ produit.name + " est dans le panier")
        });

        //Dernière ligne du tableau : Total
        facture.appendChild(ligneTotal);
        ligneTotal.appendChild(colonneRefTotal);
        colonneRefTotal.innerHTML = "<strong>Total à payer :</strong>"
        ligneTotal.appendChild(colonnePrixPaye);
        colonnePrixPaye.setAttribute("id", "sommeTotal")

        //Calcule de l'addition total
        let totalPaye = 0;
        JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
            totalPaye += produit.price / 100;
        });

        //Affichage du prix total à payer dans l'addition
        console.log("Administration : prix total " + totalPaye + "€");
        document.getElementById("sommeTotal").textContent = totalPaye + " €";
    } else {
        panierVide.setAttribute("class", "d-block")
        console.log("Administration : panier vide");
    };
}

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



