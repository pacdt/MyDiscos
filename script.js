var ALB_ID = [
	12047958, 300356, 119899, 120869, 71057352, 8145768, 90402, 12047948,
	10339562, 8449307, 71057852, 153415352, 71059302, 90094972, 90094962,
	71059082, 687027, 15485516, 15485508, 15485162, 162121, 5242651, 302642,
	326086, 115879, 7824595, 125197012, 1213303, 15318317, 8098858, 356227,
	86977, 8437570, 692638, 660828, 71057662, 84994162, 71058292, 8145774,
	1215606, 1430635, 91258032, 65757562, 5425031, 113503112, 14089058,
	64883672, 10504842, 75293582, 11304406, 290080672, 270755492, 128116922,
	60108672, 41776101, 178649202, 1424499, 65757552, 1384810, 41768551,
	167964782, 12047944, 119834302, 124486, 43715301, 287836892, 57680922,
	1598575655, 73846382, 9344800, 387885, 677606, 103027612, 12047960, 6768969,
	6776451, 7820515, 7056415, 1376448, 381640, 59865752, 56293072, 708670,
	41771571, 1213914, 6997123, 46525872, 114715, 248574432, 233928872, 244050,
];
let api = "https://deezerdevs-deezer.p.rapidapi.com/album/";
let container = document.getElementById("discos"); // elemento pai onde os cards serão adicionados
const key1 = "8776cae989msh";
const key2 = "3c8d35a1d3def30p";
const key3 = "139d33jsn89d481789073";
const fullkey = key1 + key2 + key3;

for (let i = 0; i < ALB_ID.length; i++) {
	const card = createCard(ALB_ID[i]);
	container.appendChild(card); // adiciona o card ao elemento pai
}
const total = (document.getElementById(
	"total"
).innerHTML = `Acervo com um total de <span style="font-weigth: bold;">${ALB_ID.length + 44}</span> Discos de Vinil`);
function createCard(id) {
	const card = document.createElement("div");

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
	xhr.setRequestHeader("X-RapidAPI-Key", fullkey);
	xhr.setRequestHeader("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");

	function resposta(json) {
		card.innerHTML = `
            <div class="card">
                <img src="${json.cover_xl}" alt="capa do álbum '${json.title}'">
                <h4>${json.title}</h4>
                <h5>${json.artist.name}</h5>
            </div>
        `;
		card.addEventListener("click", function () {
			window.location.href = `album.html?id=${json.id}`; // redireciona para a página modelo com o ID do álbum como parâmetro
		});
	}

	xhr.send(data);

	return card; // retorna o card criado
}
