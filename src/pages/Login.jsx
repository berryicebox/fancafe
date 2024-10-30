import "../assets/styles/login.scss";
import {Link} from "react-router-dom";
import {useState} from "react";

const Login = ({ props }) => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Login");
        getLogin();
    }

    const getLogin = async () => {
        // fetch("https://koreandummyjson.site/api/auth/login", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         "id": "test",
        //         "password": "1234",
        //         "ATExp": 600,
        //         "RTExp": 3600
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error('Error fetching data:', error));
    }




    return (
        <div className={"container"}>
            <div className={"box"}>
                <form className={"login-form"} onSubmit={handleLogin}>
                    <label htmlFor="id">아이디</label>
                    <input
                        onChange={e => setUserId(e.target.value)}
                        type="text" name="id" id="id"/>

                    <label htmlFor="password1">비밀번호</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        type="password" name="password1" id="password1"/>

                    <button className={"main-button"} onClick={handleLogin}>로그인</button>

                    <Link to="/join">
                        <button>회원가입</button>
                    </Link>


                </form>
            </div>
        </div>
    )
}

export default Login;