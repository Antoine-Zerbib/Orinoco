 /*Fonction ajouter le produit au panier de l'utilisateur
 **********************************************/

addPanier = () =>{

	//Au clic de l'user pour mettre le produit dans le panier
	let inputBuy = document.getElementById("ajouterProduitPanier");
	inputBuy.addEventListener("click", async function() {
		const produits = await getProduits();

		//Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
		userPanier.push(produits);
		localStorage.setItem("userPanier", JSON.stringify(userPanier));
		console.log("Administration : le produit a été ajouté au panier");
		alert("Vous avez ajouté ce produit dans votre panier")
	});
};
