/*Préparation des requis pour le script
**********************************************/

/*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

if(localStorage.getItem("userPanier")) {
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
} else {
	console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
	  
	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
};

//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem("userPanier"));