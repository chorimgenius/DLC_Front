window.onload = async function loadArticles(){
    const response = await fetch('http://127.0.0.1:8000/music/',{
        method:'GET',
        headers:{
            "Authorization": localStorage.getItem("access")
        }
    })

    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const username = document.getElementById("username")
    username.innerText = payload_parse.username

    const username2 = document.getElementById("username2")
    username2.innerText = payload_parse.username

    response_json = await response.json()

    top100_json = response_json[0]
    my_music_json = response_json[1]
    recommend_music_json = response_json[2]

    const top100_container = document.getElementById('content-top100')
    const my_music_container = document.getElementById('content-my')
    const recommend_container = document.getElementById('content-recommend')

    add_music(top100_json,top100_container)
    add_music(my_music_json,my_music_container)
    add_music(recommend_music_json,recommend_container)
    
    
    
    
    function add_music(json_data_list,container){
        json_data_list.forEach(element => {
            const new_music = `<div id="music-item">
                                    <div>
                                    <img
                                        class="item"
                                        src="${element.music_image}" onclick="music_detail(${element.id})"
                                    />
                                    </div>
                                    <div>
                                    <p style="color:white">${element.name}</p>
                                    </div>
                                
                                </div>`
            container.insertAdjacentHTML("beforeend",new_music)
        });
    }

}

function music_detail(id){
    location.href = "music_detail.html?id="+id;
}


function index(){
    location.href="index.html"
  }