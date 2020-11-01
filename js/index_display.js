
/*Création du HTML de chaque produit de index.html
**********************************************/

	//Construction de la liste des produits en vente sur la page index
async function allProductsList(){
	const produits = await getProduits();

	//Création de la section accueillant la liste des produits
	let listProduct = document.createElement("ul");
	listProduct.setAttribute("class", "card-deck");
	//Ajout de la section dans le HTML
	let displayProduct = document.getElementById("displayProduct");
	displayProduct.appendChild(listProduct);

	//Pour chaque produit de l'API on créé l'encadré HTML du produit
	produits.forEach((produit) => { 
		
      	//création des élements de la structure de la liste des produits en vente
      	//Une ul conteneur/une li /une image(img)/ un block texte(div)/le nom(h2)/le prix(p)/le lien(a)
		let produitBlock = document.createElement("li");
		let produitLien = document.createElement("a");
		let produitImage = document.createElement("img");
	  	let produitText = document.createElement("div");
      	let produitNom = document.createElement("h2");
      	let produitPrix = document.createElement("p");
      	let produitDecouvrir = document.createElement("p");

      	//Ajout des attributs au balise pour la création du style via bootstrap "card"
      	produitBlock.setAttribute("class", "card mb-3 zoom");
      	produitText.setAttribute("class", "card-body ");
      	produitImage.setAttribute("src", produit.imageUrl);
        produitImage.setAttribute("alt", "image du produit"); 
        produitImage.setAttribute("class", "card-img-top");
        produitNom.setAttribute("class", "card-title");
		produitDecouvrir.setAttribute("class", "text-info");
		//Création du lien pour ouvrir le produit concerné
		produitLien.setAttribute("href", "product.html?id=" + produit._id);
		produitLien.setAttribute("class", "text-decoration-none text-dark h-100");


		//Block conteneur (ul) reçois un élément de liste (li) 
		//Chaque liste comprend l'image du produit et un block pour le texte
      	//Block texte comprend le nom, prix et lien du produit
		listProduct.appendChild(produitBlock);
		produitBlock.appendChild(produitLien);
		produitLien.appendChild(produitImage);
     	produitLien.appendChild(produitText);
     	produitText.appendChild(produitNom);
     	produitText.appendChild(produitPrix);
     	produitText.appendChild(produitDecouvrir);

      	//Remplissage des balises
      	produitNom.textContent = produit.name;
      	produitPrix.textContent = produit.price / 100 + " €";
      	produitDecouvrir.textContent = "Découvrir ce produit";
	});
};

