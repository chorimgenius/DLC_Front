const backend_base_url = "http://127.0.0.1:8000"

window.onload = ()=>{
    console.log("로딩되었음")
}


// 회원가입
async function handleSignup(){
    const username = document.getElementById("floatingId").value //document == html
    const email = document.getElementById("floatingEmail").value
    const password = document.getElementById("floatingPassword").value
    const password2 = document.getElementById("floatingPassword2").value

    // const REGEX_EMAIL = '([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
    // const REGEX_PASSWORD = '^(?=.*[\d])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,16}$'

    // if (username == '') {
    //     alert("아이디를 입력해주세요!");
    //     return 0;
    // }
    // else if (email == '') {
    //     alert("이메일을 입력해주세요!");
    //     return 0;
    // }
    // else if (password == '' || password2 == '') {
    //     alert("비밀번호를 입력해주세요!");
    //     return 0;
    // }
    // else if (password != password2) {
    //     alert("비밀번호를 확인해주세요!");
    //     return 0;
    // }

    const response = await fetch(`${backend_base_url}/user/signup`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "emal":email,
            "password":password
        })
    })
    // location.href = "signin.html";
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

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    // const base64Url = response_json.access.split('.')[1];
    // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    // }).join(''));

    // localStorage.setItem("payload", jsonPayload);
    location.href = "index.html";
}

// 로그아웃
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.reload()
}