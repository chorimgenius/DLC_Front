window.onload = async function loadArticles(){
    const response = await fetch('http://127.0.0.1:8000/music/',{
        method:'GET',
        headers:{
            "Authorization": localStorage.getItem("access")
        }
    })

    response_json = await response.json()

    top100_json = response_json[0]
    my_music_json = response_json[1]
    recommend_music_json = response_json[2]

    const top100_container = document.getElementById('content-top100')
    const my_music_container = document.getElementById('content-my')
    const recommend_container = document.getElementById('content-recommend')

    add_music(top100_json,top100_container)
    add_music(my_music_json,my_muic_container)
    add_music(recommend_music_json,recommend_container)
    
    
    
    
    function add_music(json_data_list,container){
        json_data_list.forEach(element => {
            console.log(element.name)
            console.log(element)
            const new_music = `<div id="music-item">
                                    <div>
                                    <img
                                        class="item"
                                        src="${element.image}"
                                    />
                                    </div>
                                    <div>
                                    <p style="color:white">${element.name}</p>
                                    </div>
                                
                                </div>`
            // newArticle.innerText = element.title
            container.insertAdjacentHTML("beforeend",new_music)
        });
    }
}