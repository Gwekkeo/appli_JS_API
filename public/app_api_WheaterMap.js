class searchData{
	constructor(root, affichage){
		this.root = root
		this.affichage = affichage

		this.search = this.search.bind(this)
		this.onInit()
	}

	onInit(){
		this.root.addEventListener("submit", this.search)
	}

	search(event){
		event.preventDefault()
		let city = this.root.city.value
		console.log("Ville = " +city)
		this.affichage.loadingMsg()

		this.fetchData(city)
			.then(data => {
				if(data.cod && data.message){
					this.affichage.showError("city not found")
				}
				console.log(data)
				this.affichage.info(data)
			})
			.catch(err => {
				this.affichage.showError("city not found")
			})
	}

	fetchData(city){
		const api_key = "ee59b4f3f11d1acd5d78b3ad25672c45"
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&mode=json&units=metric&appid=${api_key}`
		return fetch(url)
			.then(response => response.json())
	}
}

class showData{
	constructor(root){
		this.root = root
		this.loadingMsg = this.loadingMsg.bind(this)
		this.showError = this.showError.bind(this)
		this.info = this.info.bind(this)
		this.createCard = this.createCard.bind(this) 
	}
	showError(error){
		this.root.innerHTML = "<b>Problème avec la ville entré :</b> (que France)<br>"+error
	}
	loadingMsg(){
		this.root.innerHTML = "Loading ..."
	}
	info(data){
		this.root.innerHTML = ""
		let info = this.createCard(data)
		this.root.append(info)
	}
	createCard(data){
		const classInfo = "p-3 mb-2 bg-info text-white"

		let root = document.createElement("div")
		root.className = "p-5 mb-2 bg-primary text-white"

		let title = document.createElement("h2")
		title.innerHTML = "A : <b>"+ data.name+"</b> ("+data.sys.country+")" 
		title.className = "p-3 mb-2 bg-dark text-white"

		let temp = document.createElement("p")
		temp.innerHTML = "<b>Température</b> : "+data.main.temp+"°C"
		temp.className = classInfo

		let min = document.createElement("p")
		min.innerHTML = "<b>MIN</b> : "+data.main.temp_min+"°C"
		min.className = classInfo

		let max = document.createElement("p")
		max.innerHTML = "<b>MAX</b> : "+data.main.temp_max+"°C"
		max.className = "p-3 mb-2 bg-danger text-white"

		let humidity = document.createElement("p")
		humidity.innerHTML = "<b>Humidite</b> : "+data.main.humidity+"%"
		humidity.className = classInfo

		let vent = document.createElement("p")
		vent.innerHTML = "<b>Vent</b> : "+data.wind.speed+"km/h"
		vent.className = classInfo

		let description = document.createElement("p")
		description.innerHTML = data.weather["0"].description
		description.className = classInfo

		let img = document.createElement("img")
		img.src = "http://openweathermap.org/img/w/"+data.weather["0"].icon+".png"
		img.alt = "Icon Wheater Map"

		root.append(title)
		root.append(temp)
		root.append(min)
		root.append(max)
		root.append(humidity)
		root.append(vent)
		description.append(img)
		root.append(description)

		return root
	}
}

const affichage = new showData(document.querySelector("#result"))
const info = new searchData(document.querySelector("#formulaire"), affichage)
