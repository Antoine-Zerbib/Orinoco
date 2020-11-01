/*Affichage des informations sur la page de confirmation
**********************************************/

    resultOrder = () =>{
	if(sessionStorage.getItem("order") != null) {

        console.log("Administration : L'objet 'order' contient des informations")
        //Si l'objet 'order' est dans le local storage supprime le message 
        document.getElementById("commandeVide").remove();

        //Parse du session storage
        let order = JSON.parse(sessionStorage.getItem("order"));
        //Implatation de prénom et de id de commande dans le html sur la page de confirmation
        document.getElementById("firstName").innerHTML = order.contact.firstName;
        document.getElementById("orderId").innerHTML = order.orderId;

        //Affichage des produits de la commande
        let i = 0;  
        let prixTotal= 0;         
        order.products.forEach(()=>{
        //Création de la ligne produit
            
            let produitCommande = document.createElement("li");
            let detail = document.createElement("p");
            //Ajout des attributs
            produitCommande.setAttribute("class","list-group-item pb-0");
            //Insertion dans le HTML
            detailCommande.appendChild(produitCommande);
            produitCommande.appendChild(detail);
            //création id
            detail.setAttribute("id", "product"+[i]);
            //Insertion du nom et du prix
            document.getElementById("product"+[i]).innerHTML =  order.products[i].name + " : " + order.products[i].price / 100 +" €";
            console.log("Administration : "+ order.products[0].name + "a été affichée sur le résumé de commande à " + + order.products[i].price + " €");
            //Total de l'addition
            prixTotal += order.products[i].price / 100;
            console.log(order.products[i].price / 100 + " € ont été ajouté au prix total ")
            i++;
        });
        document.getElementById("prixTotal").innerHTML = prixTotal;
        console.log("Administration : Prix total = " + prixTotal + " €");
        console.log("Administration : Chargement des infos OK");
        
        //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
        sessionStorage.removeItem("order");
        console.log("Administration : clef de la session strorage 'order' supprimée")
    
    } else {
        //Avertissement et redirection vers l'accueil
        //On enlève le contenu de la page confirmation
        document.getElementById("commandeOk").remove();
        
        console.log("Echec chargement du local storage " + "infos = nom :" + order.contact.lastName + "id :" + order.orderId);
    }
}

