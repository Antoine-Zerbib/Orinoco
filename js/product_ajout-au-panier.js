 /*Fonction ajouter le produit au panier de l'utilisateur
 **********************************************/

addPanier = () =>{

	//Au clic de l'user pour mettre le produit dans le panier
	let inputBuy = document.getElementById("ajouterProduitPanier");
	
	inputBuy.addEventListener("click", async function() {
		const produits = await getProduits();

		// On récupère le choix de l'option du produit
		let optionSelect = document.getElementById("optionSelect");
		let choix = optionSelect.selectedIndex;
		let option = optionSelect.options[choix].text;
		

		//récupération de la balise errorOption
		let errorOption = document.getElementById("errorOption")
		let optionValide = false;
		
		// Si le message d'accueil est affiché => Erreur
		if(option == "Faites votre choix"){
			console.log(`Administration : choix de l'option incorrecte =>  ${optionSelect.options[choix].text }`);	
			errorOption.setAttribute("class", "d-block text-danger text-right")
		} else {
			errorOption.setAttribute("class", "d-none")
			optionValide = true
		}

		// On récupère le choix de le nombre de produits
		let nombreProduits = document.getElementById("nombreProduits");
		let choixNombre = nombreProduits.selectedIndex;
		let optionNombre = nombreProduits.options[choixNombre].text;
	
		if(optionValide == true) {
			
			//Répétition du push selon le nombre de produits sélectionné
			while(optionNombre > 0 ) {

				//Récupération du panier dans le localStorage et ajout du produit dans le panier avant renvoit dans le localStorage
				userPanier.push(produits);
				localStorage.setItem("userPanier", JSON.stringify(userPanier));
				optionNombre --;
			}
			alert(`Vous avez fait un ajout dans votre panier`)
		} 
	});
};
