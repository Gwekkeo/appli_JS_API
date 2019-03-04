class SearchForm{
	constructor(root, affichage, cache){
		this.root = root
		this.affichage = affichage
		this.cache = cache

		this.searchData = this.searchData.bind(this)
		this.onInit()
	}
	
	onInit(){
		this.root.addEventListener("submit", this.searchData)
	}

	searchData(event){
		event.preventDefault()
		let artiste = this.root.artist.value

		this.affichage.showLoading()
		if(artiste in this.cache){
			console.log("Recherche déjà effectué précédemment (donc utilisation du cache): ")
			console.log(this.cache)
			this.affichage.showData(this.cache[artiste])
		}
		else{
			this.fetchData(artiste)
				.then(data => {
					if(data.error){
						throw new Error(data.error)
					}
					this.cache[artiste] = data
					this.affichage.showData(data)
					console.log("Recherche pas encore effectué :) : ")
					console.log(this.cache)
				})
				.catch(err => this.affichage.showError(err))
		}
	}

	fetchData(artiste){
		const api_key = "58a833a1d0208fa908e42b2e60579d70"
//		const api_key = "e42d86937220b829e3ccc1c366920190"
		const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artiste}&api_key=${api_key}&format=json`
		return fetch(url)
			.then(response => response.json())
	}
}




class ResultArea{
	constructor(root){
		this.root = root

		this.showLoading = this.showLoading.bind(this) 
		this.showError = this.showError.bind(this)
		this.showData = this.showData.bind(this)

		this.createElementArtist = this.createElementArtist.bind(this)
		this.createList = this.createList.bind(this)
		this.createImg = this.createImg.bind(this)
		
		this.code_base = this.code_base.bind(this)
	}

	showLoading(){
		let monBtn = document.querySelector('button[type=submit]')
		monBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>'
	}

	showError(err){
		this.root.innerHTML = "Error : " +err
		let monBtn = document.querySelector('button[type=submit]')
		monBtn.innerHTML = "Rechercher"
	}

	showData(data){
		let monBtn = document.querySelector('button[type=submit]')
		monBtn.innerHTML = "Rechercher"
		/*const rootArtist = this.root.querySelector("#js-result-area-main")
		rootArtist.append(this.createElementArtist(data))*/

		let infoArtist = this.root.querySelector(".js-result-area-main")
		try{
			infoArtist.innerHTML = ""
		}
		catch(error){
			let racine = document.querySelector("#result-area")
			racine.innerHTML = ""
			const tabInfo = this.code_base()

			tabInfo.forEach(function(elmt) {
				racine.append(elmt)
			})
			infoArtist = document.querySelector(".js-result-area-main")
			infoArtist.innerHTML = ""
		}
		infoArtist.append(this.createElementArtist(data))

		const infoSimilaire = this.root.querySelector(".js-result-area-similar")
		infoSimilaire.innerHTML = ""

		let tabAS = data.artist.similar.artist
		
		tabAS.forEach(function(element){
			const base = document.createElement("div")
			base.className = "col-sm"
			const card = document.createElement("div")
			card.className = "card"

			const img = document.createElement("img")
			img.className = "card-img-top"
			img.alt = ""
			img.src = element.image[5]["#text"]

			const cardBody = document.createElement("div")
			cardBody.className = "card-body"

			const title = document.createElement("h5")
			title.className = "card-title"
			title.innerHTML = element.name

			const lien = document.createElement("a")
			lien.href = element.url
			lien.className = "btn btn-primary"
			lien.innerHTML = "Voir sur Last.fm"

			card.append(img)
			cardBody.append(title)
			cardBody.append(lien)

			card.append(cardBody)

			base.append(card)
			infoSimilaire.append(base)
		})
		//infoSimilaire.append(this.createElementSimilaire(data))
	}

	code_base(){
		let racine = document.createElement("div")
		racine.className = "row mt-4"

		let dos = document.createElement("div")
		dos.className = "col-sm js-result-area-main"

		racine.append(dos)

		let similar = document.createElement("div")
		similar.className = "row mt-4 js-result-area-similar"

		return [racine, similar]
	}

	createElementArtist(data){
		const root = document.createElement("div")
		root.className = "media"

		root.append(this.createImg(data.artist.image[5]["#text"]))

		const body = document.createElement("div")
		// const body = document.createElement("media-body")
		body.className = "media-body"
		const title = document.createElement("h2")
		title.className = "mt-0"
		title.innerHTML = data.artist.name

		const bio = document.createElement("p")
		bio.className = "mt-4"
		bio.innerHTML = data.artist.bio.summary
		
		body.append(title)
		body.append(this.createList(data))
		body.append(bio)

		root.append(body)
		return root
	}

	



	createList(data){
		const sousBody = document.createElement("div")
		sousBody.className = "mt-2 mb-2"
		let tabTag = data.artist.tags.tag
		
		tabTag.forEach(function(elmt) {
			const a = document.createElement("a")
			a.className = "badge badge-pill badge-info mr-1"
			a.href = elmt.url
			a.innerHTML = elmt.name
			sousBody.append(a)
		})
		return sousBody
	}

	createImg(urlImg){
		const img = document.createElement("img")
		img.className = "mr-3"
		img.src = urlImg
		img.alt = ""

		return img
	}
}
var cache = {};

const affichage = new ResultArea(document.querySelector("#result-area"))
const info = new SearchForm(document.querySelector("#search-form"), affichage, cache)

/**/
//https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=jason derulo&api_key=58a833a1d0208fa908e42b2e60579d70&format=json
