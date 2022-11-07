const backend_base_url = "http://127.0.0.1:8000"

// 회원가입
async function handleSignup(){
    const username = document.getElementById("floatingId").value //document == html
    const email = document.getElementById("floatingEmail").value
    const password = document.getElementById("floatingPassword").value
    const password2 = document.getElementById("floatingPassword2").value

    // const REGEX_EMAIL = '([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
    // const REGEX_PASSWORD = '^(?=.*[\d])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,16}$'

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

    console.log(response)

    const response_json = await response.json()

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    location.href = "profile.html";
}

// 로그아웃
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.reload()
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
    console.log(data)

    const username = document.getElementById("username")
    username.innerText = payload_parse.username

    const username2 = document.getElementById("username2")
    username2.innerText = payload_parse.username

    const followers = document.getElementById("followers")
    followers.innerText = data.followers.length

    const followings = document.getElementById("followings")
    followings.innerText = data.followings.length

    const email = document.getElementById("email")
    email.innerText = data.email

    const bio = document.getElementById("bio")
    bio.innerText = data.bio
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
