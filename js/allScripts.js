String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.formatBirthYear = function() {
	return this.split("BB").join(" BB");
}

//'Access-Control-Request-Headers': 'X-Custom-Header',
function getAjaxHero(id) {
	var currentId = id,
		currentHeroInfoUl,
		currentHeroFilmsUl;
	return fetch(
			"http://swapi.co/api/people/" + id + "/",
			{
				method: "GET",
				mode: 'cors',
				headers: new Headers({
					'Origin': 'http://swapi.co/api/',
					'Access-Control-Request-Method': 'GET',
					'Content-Type': 'application/json',
					'Connection': 'keep-alive'
				}),
			}
		).then(function(response){
			var contentType = response.headers.get("content-type");
			if(contentType && contentType.indexOf("application/json") !== -1) {
				return response.json().then(function(heroObj) {
					currentHeroInfoUl = makeHeroInfoUl(heroObj);
					return heroObj.films;
				}).then(function(films) {
					var filmPromises = films.map(film => getAjaxFilm(film));
					return Promise.all(filmPromises);
				}).then(function(allEpisodObjs){
					allEpisodObjs.sort(function(a,b){
						return a.episodeId > b.episodeId
					});
					var episodNames = allEpisodObjs.map(i => i.name);
					currentHeroFilmsUl = makeFilmsInfoUl(episodNames);
				}).then(function(){
					//tmp
					var forHero = document.querySelector(".wrap-hero-info");
					forHero.appendChild(currentHeroInfoUl);
					var forFilms = document.querySelector(".wrap-films");
					forFilms.appendChild(currentHeroFilmsUl);
					return currentId;
				});
			}	else {
				console.log("There is no JSON!");
			}
		});
}

function getAjaxFilm(url) {
	console.log(url);
	return fetch(
			url,
			{
				method: "GET",
				mode: 'cors',
				headers: new Headers({
					'Origin': 'http://swapi.co/api/',
					'Access-Control-Request-Method': 'GET',
					'Content-Type': 'application/json',
					'Connection': 'keep-alive'
				}),
			}
		).then(function(response){
			var contentType = response.headers.get("content-type");
			if(contentType && contentType.indexOf("application/json") !== -1) {
				return response.json().then(function(filmObj) {
					var fullFilmNameObj = {
						name: "Episode " + filmObj.episode_id + ": " + filmObj.title,
						episodeId: filmObj.episode_id
					};
					return fullFilmNameObj;
				});
			}	else {
				console.log("There is no JSON!");
			}
		});
}

function makeLiItem(str) {
	var li = document.createElement('li');
	li.textContent = str;
	return li;
}

function makeHeroInfoUl(obj) {
	var ul = document.createElement('ul');
	ul.appendChild(makeLiItem("Name: " + obj.name));
	ul.appendChild(makeLiItem("Height: " + obj.height + " m"));
	ul.appendChild(makeLiItem("Mass: " + obj.mass + " Kg"));
	ul.appendChild(makeLiItem("Hair Color: " + obj.hair_color.capitalizeFirstLetter()));
	ul.appendChild(makeLiItem("Skin Color: " + obj.skin_color.capitalizeFirstLetter()));
	ul.appendChild(makeLiItem("Eye Color: " + obj.eye_color.capitalizeFirstLetter()));
	ul.appendChild(makeLiItem("Birth Year: " + obj.birth_year.formatBirthYear()));
	ul.appendChild(makeLiItem("Gender: " + obj.gender.capitalizeFirstLetter()));
	return ul;
}

function makeFilmsInfoUl(arrOfFilsm) {
	var ul = document.createElement('ul');
	arrOfFilsm.forEach(function(item) {
		ul.appendChild(makeLiItem(item));
	});
	return ul;
}

console.dir(getAjaxHero(1));


