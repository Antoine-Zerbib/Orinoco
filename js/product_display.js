
/*Build de la page du produit sélectionné
**********************************************/

async function detailProduit(){
    //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
    idProduit = location.search.substring(4);
    const produitSelected = await getProduits();
    console.log("Administration : Vous regardez la page du produit id_"+produitSelected._id);

    //Faire apparaitre la fiche produit initialement en display none
    let section = document.getElementById("section");
    section.style.display = "block";
    
    //Remplissage de la fiche produit
    document.getElementById("imgProduct").setAttribute("src", produitSelected.imageUrl);
    document.getElementById("nameProduct").innerHTML = produitSelected.name;
    document.getElementById("descriptionProduct").innerHTML = produitSelected.description;
    document.getElementById("priceProduct").innerHTML = produitSelected.price / 100 + " euros";
    
    //Selon le type de produit (ligne 3 de API.js) création des options
    switch(produitSell){
    	case "cameras":
    	produitSelected.lenses.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "furniture":
    	produitSelected.varnish.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "teddies":
    	produitSelected.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	default:
    	console.log("Administration : Veuillez bien renseigner la variable produitSell ligne 2 du fichier script.js");
    }
};