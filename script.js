var ALB_ID = [12047958, 300356, 119899, 120869, 71057352, 8145768,90402,12047948,10339562,8449307,71057852,153415352,71059302,90094972,90094962,71059082,687027];
let api = "https://deezerdevs-deezer.p.rapidapi.com/album/";
let container = document.getElementById('discos'); // elemento pai onde os cards serão adicionados
const key1 = "8776cae989msh"
const key2 = "3c8d35a1d3def30p"
const key3 = "139d33jsn89d481789073"
const fullkey = key1 + key2 + key3

for (let i = 0; i < ALB_ID.length; i++) {
	const card = createCard(ALB_ID[i]);
	container.appendChild(card); // adiciona o card ao elemento pai
}

function createCard(id) {
    const card = document.createElement('div');

	const data = null;
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			let json = JSON.parse(this.responseText);
			resposta(json);
		}
	});
	xhr.open("GET", api + id);
	xhr.setRequestHeader(
		"X-RapidAPI-Key",
		fullkey
	);
	xhr.setRequestHeader("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");

    function resposta(json){
        console.log(json)
        card.innerHTML = `
            <div class="card">
                <img src="${json.cover_xl}" alt="capa do álbum '${json.title}'">
                <h4>${json.title}</h4>
                <h5>${json.artist.name}</h5>
            </div>
        `;
        card.addEventListener('click', function() {
            window.location.href = `album.html?id=${json.id}`; // redireciona para a página modelo com o ID do álbum como parâmetro
        });
    }

	xhr.send(data);
	
    return card; // retorna o card criado
}