async function search_music(){

    const search_name = document.getElementById("search-music").value
    const response = await fetch('http://127.0.0.1:8000/music/search',{
        method:'POST',
        headers:{
            "Authorization": localStorage.getItem("access")
        },
        body: search_name
    })
    response_json = response.json()

    location.href="music_detail.html?id="+response_json.id
}