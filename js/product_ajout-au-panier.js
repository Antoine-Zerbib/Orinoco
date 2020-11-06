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
		// Si le message d'accueil est affiché => false
		if(option == "Faites votre choix"){
			console.log("option incorrecte");	
			console.log(`optionSelect = ${optionSelect.options[choix].text }`)	
			errorOption.setAttribute("class", "d-block text-danger text-right")
		} else {
			errorOption.setAttribute("class", "d-none")
			optionValide = true
			console.log("option correcte")
			console.log(`optionSelect = ${optionSelect.options[choix].text }`)
		}
		if(optionValide == true) {

		//Récupération du panier dans le localStorage et ajout du produit dans le panier avant renvoit dans le localStorage
		userPanier.push(produits);
		localStorage.setItem("userPanier", JSON.stringify(userPanier));
		console.log("Administration : le produit a été ajouté au panier");
		alert(`Vous avez ajouté un produit dans votre panier`)
		}
	});
};
