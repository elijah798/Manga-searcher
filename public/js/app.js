function fetchData(url) {
  return fetch(url)
      .then(checkStatus)
      .then(res => res.json())
      .catch(error => console.log(error))
}
//function to check status of the request
function checkStatus(response) {
  if (response.ok) {
      return Promise.resolve(response);
  } else {
      return Promise.reject(new Error(response.statusText));
  }
}

const cards = document.getElementById('container');
console.log(cards);

const search = document.getElementById("search-txt");
search.addEventListener('change', (e) => {
  const input = search.value;
  fetchData(`https://api.jikan.moe/v3/search/manga?q=${input}&page=1`)
    .then(data => {
      console.log(data.results[0]);
    
        for (var i = 0; i < data.results.length; i++) {
            
            const item = data.results[i];
            const picture = item.image_url;
            const desc = item.synopsis;
            const id = item.mal_id;
            const title = item.title;
            let chapters;
            const rating = item.score;
            const url = item.url;
            let running;
            if(item.publishing == true){
              running = "Not Finished";
            } else {
              running = "Completed";
            }

            if(item.chapters == 0){
              chapters = "N/A";
            }else {
              chapters = item.chapters;
            }
              
    
            const html = `
            <a href="${url}">
            <div class="card">
            <div class="card-img">
                <img src="${picture}" alt="">
            </div>
            <div class="content"><div class="title">
                <h1>${title}</h1>

            </div>
            <div class="desc">
                <p>${desc}</p>
            </div>
            <div class="anime-data">
            <div class="episodes">
                <p>Chapters</p> <span>: ${chapters}</span>
            </div>
            <div class="rating"><p>${rating}</p></div>
            <div class="completed"><p>${running}</p></div>
           
        </div>
            
            </div>
            
        </div>
    
            </a>
            
    `;
    //adds the modals and cards to index.html
            cards.innerHTML += html;
            
        }
    })
    cards.innerHTML = "";
})
