/*Génération de l'URL de l'API selon le choix de catégorie à vendre
**********************************************/

const produitSell = "teddies"  //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

//id du produit pour permettre un tri dans l'API
let idProduit = "";


/*Appel de l'API
**********************************************/

getProduits = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			let error = document.getElementById("error");
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
				resolve(JSON.parse(this.responseText));
				console.log("Administration : connection API ok");

				//L'appel est réussi => suppression du message d'erreur
				
				if(error == null){
					console.log("Administration : pas de message ERROR connection API à supprimer");
				} else {
					error.setAttribute("class", "d-none")
					console.log("Administration : message ERROR connection API supprimé");
				}
			} else {
				error.setAttribute("class", "d-block")
				console.log("Administration : status : " + this.status);
				console.log("Administration : ERROR connection API");
			}
		}
		//Appel des produits avec APIURL selon la catégorie L.4
		request.open("GET", APIURL + idProduit);
		request.send();
	});
};

