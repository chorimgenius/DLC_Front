const backend_base_url = "http://127.0.0.1:8000"

// 회원가입
async function handleSignup(){
    const username = document.getElementById("floatingId").value //document == html
    const email = document.getElementById("floatingEmail").value
    const password = document.getElementById("floatingPassword").value
    const password2 = document.getElementById("floatingPassword2").value

    if (username == '') {
        alert("아이디를 입력해주세요!");
        return 0;
    }
    else if (email == '') {
        alert("이메일을 입력해주세요!");
        return 0;
    }
    else if (password == '' || password2 == '') {
        alert("비밀번호를 입력해주세요!");
        return 0;
    }
    else if (password != password2) {
        alert("비밀번호를 확인해주세요!");
        return 0;
    }

    const response = await fetch(`${backend_base_url}/user/signup/`, {
        headers: {
            'Content-Type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password,
            "email":email
        })
    })
    location.href = "signin.html";
}

// 로그인
async function handleSignin(){
    const username = document.getElementById("floatingId").value
    const password = document.getElementById("floatingPassword").value

    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        })
    })

    const response_json = await response.json()

    localStorage.setItem("access", "Bearer "+response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    location.href = "index.html";
}

// 로그아웃
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.href = "signin.html";
}

// 프로필 유저 정보 가져오기
async function Profile() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id

    const response = await fetch(`${backend_base_url}/user/${user_id}/`, {
        method: 'GET',
    })
    const data = await response.json();

    const username = document.getElementById("username")
    username.innerText = data[0].username

    const followers = document.getElementById("followers")
    followers.innerText = data[0].followers.length

    const followings = document.getElementById("followings")
    followings.innerText = data[0].followings.length

    const email = document.getElementById("email")
    email.innerText = data[0].email

    const bio = document.getElementById("bio")
    bio.innerText = data[0].bio

    musics = data[1]

    const my_container = document.getElementById('my-content-list')


    musics.forEach(element => {
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
        my_container.insertAdjacentHTML("beforeend",new_music)
    });

}

function music_detail(id){
    location.href = "music_detail.html?id="+id;
}

// 프로필 유저 정보 업데이트
async function ProfileUpdate() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id
    const username = payload_parse.username
    const email = document.getElementById("recipient-name").value
    const bio = document.getElementById("message-text").value

    const response = await fetch(`${backend_base_url}/user/${user_id}/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "username":username,
            "email":email,
            "bio":bio
        })
    })
    alert("수정이 완료되었습니다.");
    location.href = "profile.html";
}
