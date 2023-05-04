const key1 = "8776cae989msh";
const key2 = "3c8d35a1d3def30p";
const key3 = "139d33jsn89d481789073";
const fullkey = key1 + key2 + key3;
const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");

const api = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		const album = JSON.parse(this.responseText);
		showAlbum(album);
	}
});

xhr.open("GET", api + albumId);
xhr.setRequestHeader("X-RapidAPI-Key", fullkey);
xhr.setRequestHeader("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");
xhr.send();

function showAlbum(album) {
	const title = document.querySelector("#title");
	const artist = document.querySelector("#artist");
	const cover = document.querySelector("#cover");
	const releaseDate = document.querySelector("#data");
	const musicas = document.querySelector("#musicas");
	const duracao = document.querySelector("#duracao");
	const gravadora = document.querySelector("#gravadora");
	const dz = document.querySelector("#dz-link");
	const page = document.querySelector("#album-page");
	const listaMusicas = document.querySelector("#lista-musicas");

	page.textContent = album.title;
	title.textContent = album.title;
	artist.textContent = album.artist.name;
	cover.src = album.cover_xl;
	releaseDate.textContent = "Lançamento: " + album.release_date.slice(0, 4);
	musicas.textContent = "Músicas: " + album.nb_tracks;
	duracao.textContent =
		"Duração: " + Math.floor(album.duration / 60) + " min";
	gravadora.textContent = "Gravadora: " + album.label;
	dz.href = album.link;

	let container = document.getElementById("list");
	const track = album.tracks.data;

	// Crie um objeto 'tracksData' para armazenar as informações de cada faixa
	const tracksData = track.map((track) => ({
		url: track.preview,
		title: track.title,
		isPlaying: false,
		audio: new Audio(track.preview),
	}));

	// Crie a lista de faixas com os botões de reprodução correspondentes
	const listItems = tracksData
		.map(
			(trackData, index) => `
						<li class="lista">
							<img
							class="play-btn"
							data-track-index="${index}"
							width="20px"
							src="./assets/play.png"
							alt=""
							/>
							<h4>${trackData.title}</h4>
						</li>
						`
		)
		.join("");
	container.innerHTML = listItems;

	// Seleciona todos os botões de reprodução
	const playButtons = document.querySelectorAll(".play-btn");

	// Adiciona um ouvinte de eventos de clique a cada botão de reprodução
	playButtons.forEach((playButton) => {
		playButton.addEventListener("click", () => {
			const trackIndex = playButton.getAttribute("data-track-index");
			const trackData = tracksData[trackIndex];
			const audio = trackData.audio;

			if (audio.paused) {
				// Pausa todos os áudios antes de tocar a nova faixa
				tracksData.forEach((trackData) => {
					if (trackData.isPlaying) {
						trackData.audio.pause();
						trackData.isPlaying = false;
					}
				});

				// Toca a faixa selecionada
				audio.play();
				trackData.isPlaying = true;
				playButton.src = "./assets/pause.png";
			} else {
				// Pausa a faixa selecionada
				audio.pause();
				trackData.isPlaying = false;
				playButton.src = "./assets/play.png";
			}
		});
	});
}
