class SearchData{
	constructor(root, affichage){
		this.root = root
		this.affichage = affichage
		this.onSubmit = this.onSubmit.bind(this)

		this.goInit()
	}
	goInit(){
		this.root.addEventListener("submit", this.onSubmit)
	}

	onSubmit(event){
		event.preventDefault()

		let pseudo = this.root.pseudo.value
		this.affichage.showLoadingMsg()

		this.fetchData(pseudo)
			.then(data => {
				if(data.login == undefined){
					this.affichage.showError(data.message)
				}
				else{
					this.affichage.showData(data)
				}
			})
			.catch(err => console.log(err))
	}

	fetchData(pseudo){
		const url = "https://api.github.com/users/"
		return fetch(url+pseudo)
			.then(response => response.json())
	}

}

class ResultArea{
	constructor(root){
		this.root = root
		this.showLoadingMsg = this.showLoadingMsg.bind(this)
		this.showError = this.showError.bind(this)
		this.showData = this.showData.bind(this)
	}

	showLoadingMsg(){
		this.root.innerHTML = "Loading [ ... ]"
	}
	showError(err){
		this.root.innerHTML = "<h2>Pseudo "+err+"</h2>"
	}
	showData(data){
		this.root.innerHTML = ""
		let racine = document.createElement("div")
		racine.className = "media"
		
		let img = document.createElement("img")
		img.src = data.avatar_url


		let mediaBody = document.createElement("div")
		mediaBody.className = "media-body"

		let pseudo = document.createElement("h2")
		pseudo.className = "mt-0"
		pseudo.innerHTML = "<br><b>Pseudo :</b> "+data.login


		let sousDiv = document.createElement("div")
		sousDiv.className = "card"

		let name = document.createElement("p")
		name.innerHTML = "<b>Name :</b> "+data.name
		name.className = "list-group-item"

		let compagny = document.createElement("p")
		compagny.innerHTML = "<b>Compagnie :</b> "+data.company
		compagny.className = "list-group-item"

		let bio = document.createElement("p")
		bio.innerHTML = "<b>Bio :</b> "+data.bio
		bio.className = "list-group-item"

		let repoPublic = document.createElement("p")
		repoPublic.innerHTML = "<b>Nombre de Repo Public :</b> "+data.public_repos
		repoPublic.className = "list-group-item"

		let nbFollower = document.createElement("p")
		nbFollower.innerHTML = "<b>Nombre de followers :</b> "+data.followers
		nbFollower.className = "list-group-item"

		racine.append(img)
		mediaBody.append(pseudo)
		
		sousDiv.append(name)
		sousDiv.append(compagny)
		sousDiv.append(bio)
		sousDiv.append(repoPublic)
		sousDiv.append(nbFollower)

		mediaBody.append(sousDiv)
		racine.append(mediaBody)
		this.root.append(racine)
		console.log(this.root)
	}
}

let affichage = new ResultArea(document.querySelector("#result"))
let info = new SearchData(document.querySelector("#formulaire"), affichage)
