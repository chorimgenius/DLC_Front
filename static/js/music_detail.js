let liked = false

window.onload = async function loadMusic(){

    

    const urlStr = window.location.href;

    const url = new URL(urlStr);

    const urlParams = url.searchParams;

    const id = urlParams.get('id')

    const response = await fetch('http://127.0.0.1:8000/music/'+parseInt(id), {
        method:'GET',
        headers:{
            "Authorization": localStorage.getItem("access")
        }
    })

    response_json = await response.json()
    if(response_json[1] == 1){
        const likeButton = document.querySelector('.like-button');
        likeButton.classList.toggle('selected');
    }

    const music_image = document.getElementById('music_image')

    music_image.src=response_json[0].music_image

    const music_name = document.getElementById('music_name')

    music_name.innerText = response_json[0].name

    const music_year = document.getElementById('music_year')

    music_year.innerText = response_json[0].year

    const artist_name = document.getElementById('artist_name')

    artist_name.innerText = response_json[0].artists

    const music_album = document.getElementById('music_album')

    music_album.innerText = response_json[0].album

    review_list = response_json[2]

    const comments = document.getElementById('comment_list');
    
    review_list.forEach(element => { 
        const review = `<div class="comment-post">
                                <div class="comment-img"><img src="http://127.0.0.1:8000/media/default_profile.png"></div>
                                <div class="comment-details">
                                    <p><span class="comment-author">${element.review_user}</span><span class="comment-time"></span></p>
                                <div>
                                    <p class="comment-content">${element.content}</p>
                                </div>
                            </div>`
        comments.insertAdjacentHTML("beforeend",review)
    });

}

// 좋아요 function
async function likeMusic() {
    const urlStr = window.location.href;

    const url = new URL(urlStr);

    const urlParams = url.searchParams;

    const id = urlParams.get('id')

    const likeMusic = document.getElementById('like_button')
    likeMusic.classList.toggle("fa-thumbs-down");


    if(!liked){
        const response = await postLike(id)
        console.log("좋아요 실행")
        liked = true
        
    }else{
        console.log("좋아요 취소")
        liked = false
    }
}
async function review_write(){
    const urlStr = window.location.href;)

    const url = new URL(urlStr);

    const urlParams = url.searchParams;

    const id = urlParams.get('id')

    const content_review = document.getElementById('review_content').value

    const response = await fetch('http://127.0.0.1:8000/review/'+parseInt(id)+'/review/', {
        method:'POST',
        headers:{
            "Authorization": localStorage.getItem("access"),
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "content": content_review
        })
    })

    response_json = await response.json()
    
    user = response_json.review_user
    content = response_json.content  
    image = response_json.image

    const comments = document.getElementById('comment_list');

    const comment = `<div class="comment-post">
                        <div class="comment-img"><img src="http://127.0.0.1:8000/media/default_profile.png/"></div>
                        <div class="comment-details">
                            <p><span class="comment-author">${user}</span><span class="comment-time"></span></p>
                        <div>
                            <p class="comment-content">${content}</p>
                        </div>
                    </div>`

    comments.insertAdjacentHTML("beforeend",comment) 
}




$('html').click(function(e) {   
    if(!$(e.target).hasClass("area")) {
        $('#nav-search').hide()
        $('#nav-main').show()
    }
});  
document.addEventListener('DOMContentLoaded', function() {

    const urlStr = window.location.href;

    const url = new URL(urlStr);

    const urlParams = url.searchParams;

    const id = urlParams.get('id')

    const likeButton = document.querySelector('.like-button');
    likeButton.addEventListener('click', () => { 
        fetch('http://127.0.0.1:8000/music/' +parseInt(id) +'/like/',{
            headers:{
                'Authorization':localStorage.getItem("access")},
            method :'POST',
        })   
        likeButton.classList.toggle('selected');
    });
});

function profile(){
    location.href="profile.html"
  }

function index(){
    location.href="index.html"
  }

handleLogout()