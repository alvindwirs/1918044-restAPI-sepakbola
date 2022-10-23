const ApiKey = "365997fe7131493fb7e1ebd44f4cdb2d";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
             const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick = (event)=>{
                    showteaminfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function showteaminfo(id){
    let teamdetail = baseUrl+"teams/"+id;
       fetch(teamdetail, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            let name=(resJson.name);
            let crest=(resJson.crestUrl);
            let founded=(resJson.founded);
            let warna=(resJson.clubColors);
            let venue=(resJson.venue);
            let alamat=(resJson.address);
            let website=(resJson.website);

            console.log(resJson.squad);
            let squad="";

            resJson.squad.forEach(skuad=>{
                squad += `
                <tr>
                    <td>${skuad.name}</td>
                    <td>${skuad.position}</td>
                    <td>${skuad.nationality}</td>
                </tr>`
            });
            console.log(resJson.activeCompetitions);
            let activeCompetitions="";

            resJson.activeCompetitions.forEach(kompetisi=>{
                activeCompetitions += `
                    <td>${kompetisi.name}</td>`
            });
    title.innerHTML = `Team `+name;     
   contents.innerHTML = `
   <div class="card">
   <table class="stripped responsive-table">
        <tr>
            <td rowspan="7"><img src=`+crest+` class="rectangle" width="200px" height="200px"></td>
            <td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Nama</td>
            <td>:</td>
            <td>`+name+`</td>
        </tr>
        <tr><td>Warna</td>
            <td>:</td>
            <td>`+warna+`</td>
        </tr>
        <tr>    
            <td>Berdiri</td>
            <td>:</td>
            <td>`+founded+`</td>
        </tr>
        <tr>
        <td>Stadion</td>
            <td>:</td>
            <td>`+venue+`</td>
        </tr>
        <tr><td>Alamat</td>
            <td>:</td>
            <td>`+alamat+`</td>
        </tr>
        <tr><td>Website</td>
            <td>:</td>
            <td>`+website+`</td>
        </tr>
        <tr><td>Kompetisi yang diikuti</td>
            <td>:</td>
            <td>${activeCompetitions}</td>
        </tr>
    </table>
  <table class="highlight responsive-table">
                       <thead>
                            <tr>
                            
                            <th colspan="4" class="center">Daftar Pemain</th></tr>
                           <th>Nama</th>
                           <th>Posisi</th>
                           <th>Kebangsaan</th>
                       </thead>
                       <tbody>
                           ${squad}
                       </tbody>
   </table>
   </div>`;

})
}
function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});