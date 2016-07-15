function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatBirthYear(str) {
	return str.split("BB").join(" BB");
}

function loadingProcess() {
	var loading = document.querySelector("#loading"),
		rotatingCircle = document.querySelector(".rotating-circle");
	if (loading !== null) {
		if (looper) {
			clearTimeout(looper);
			looper = false;
		} else {
			rotateAnimation(rotatingCircle);
		};
		loading.hidden = !loading.hidden;
	} else {
		loading = document.createElement("div");
		loading.classList.add("loading");
		loading.id = "loading";
		rotatingCircle = document.createElement("span");
		rotatingCircle.classList.add("glyphicon");
		rotatingCircle.classList.add("glyphicon-refresh");
		rotatingCircle.classList.add("rotating-circle");
		loading.appendChild(rotatingCircle);
		document.body.appendChild(loading);
		rotateAnimation(rotatingCircle);
	}
}

var looper,
	degrees = 0;
function rotateAnimation(el) {
	if(navigator.userAgent.match("Chrome")){
		el.style.WebkitTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		el.style.MozTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		el.style.msTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		el.style.OTransform = "rotate("+degrees+"deg)";
	} else {
		el.style.transform = "rotate("+degrees+"deg)";
	}
	looper = setTimeout(function(){
		rotateAnimation(el);
	},7);
	degrees++;
	if(degrees > 359){
		degrees = 1;
	}
}


function checkNavButtons(id) {
	var prevBtn = document.getElementById("prev-hero-btn"),
		nextBtn = document.getElementById("next-hero-btn");
	if (id === 1) {
		prevBtn.disabled = true;
	} else if (id === 88) {
		nextBtn.disabled = true;
	} else {
		if (prevBtn.disabled) {prevBtn.disabled = !prevBtn.disabled};
		if (nextBtn.disabled) {nextBtn.disabled = !nextBtn.disabled};
	}
}

function makeHero(id) {
	var currentHeroInfoUl,
		currentHeroFilmsUl,
		heroAvatar;

	loadingProcess();

	checkNavButtons(id);

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
		)
		.then(function(response){
			if(response.ok) {
				var contentType = response.headers.get("content-type");
				if(contentType && contentType.indexOf("application/json") !== -1) {
					return response.json();
				}	else {
					console.log("There is no JSON!");
				};
			} else {
				throw new Error("There is no such hero");
			};
		})
		.then(function(heroObj) {
			currentHeroInfoUl = makeHeroInfoUl(heroObj);
			heroAvatar = makeHeroAvatar(heroObj);
			return heroObj.films;
		})
		.then(function(films) {
			var filmPromises = films.map(film => getFilm(film));
			return Promise.all(filmPromises);
		})
		.then(function(allEpisodObjs){
			allEpisodObjs.sort(function(a,b){
				return a.episodeId > b.episodeId
			});
			var episodNames = allEpisodObjs.map(i => i.name);
			currentHeroFilmsUl = makeFilmsInfoUl(episodNames);
		})
		.then(function(){
			rebuildHeroInfo(currentHeroInfoUl, currentHeroFilmsUl, heroAvatar);
			loadingProcess();
			return id;
		}).catch(function(err) {
			removeHeroInfo();
			loadingProcess();
			alert(err.message);
			console.dir(err);
			return id;
		});
}

function rebuildHeroInfo(currentHeroInfoUl, currentHeroFilmsUl, heroAvatar) {
	removeHeroInfo();
	var forHero = document.querySelector(".wrap-hero-info"),
		forHeroAvatar = document.querySelector(".wrap-avatar"),
		forFilms = document.querySelector(".wrap-films");
	forHero.appendChild(currentHeroInfoUl);
	forHeroAvatar.appendChild(heroAvatar);
	forFilms.appendChild(currentHeroFilmsUl);
}

function removeHeroInfo() {
	var forHero = document.querySelector(".wrap-hero-info"),
		forHeroAvatar = document.querySelector(".wrap-avatar"),
		forFilms = document.querySelector(".wrap-films");
	while (forHero.firstChild) {
		forHero.removeChild(forHero.firstChild);
	};
	while (forHeroAvatar.firstChild) {
		forHeroAvatar.removeChild(forHeroAvatar.firstChild);
	};
	while (forFilms.firstChild) {
		forFilms.removeChild(forFilms.firstChild);
	};
}

function getFilm(url) {
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
				return response.json();
			}	else {
				console.log("There is no JSON!");
			}
		}).then(function(filmObj) {
			return {
				name: "Episode " + filmObj.episode_id + ": " + filmObj.title,
				episodeId: filmObj.episode_id
			};
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
	ul.appendChild(makeLiItem("Hair Color: " + capitalizeFirstLetter(obj.hair_color)));
	ul.appendChild(makeLiItem("Skin Color: " + capitalizeFirstLetter(obj.skin_color)));
	ul.appendChild(makeLiItem("Eye Color: " + capitalizeFirstLetter(obj.eye_color)));
	ul.appendChild(makeLiItem("Birth Year: " + formatBirthYear(obj.birth_year)));
	ul.appendChild(makeLiItem("Gender: " + capitalizeFirstLetter(obj.gender)));
	return ul;
}

function makeHeroAvatar(obj) {
	var img = document.createElement('img');
	if (obj.gender === "male") {
		img.src = "img/male.png";
	} else if (obj.gender === "female") {
		img.src = "img/female.png";
	} else {
		img.src = "img/no_human.png";
	};
	return img;
}

function makeFilmsInfoUl(arrOfFilsm) {
	var ul = document.createElement('ul');
	arrOfFilsm.forEach(function(item) {
		ul.appendChild(makeLiItem(item));
	});
	return ul;
}

var mainPromise = makeHero(1);

var prevBtn = document.getElementById("prev-hero-btn"),
	nextBtn = document.getElementById("next-hero-btn");

nextBtn.addEventListener("mouseup", function(e) {
	mainPromise.then(function(id) {
		mainPromise = makeHero(id + 1);
	})
});

prevBtn.addEventListener("mouseup", function(e) {
	mainPromise.then(function(id) {
		mainPromise = makeHero(id - 1);
	})
});