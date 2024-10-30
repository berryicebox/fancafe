import "../assets/styles/login.scss";
import {useState} from "react";
import {Link} from "react-router-dom";

const Join = ({ props }) => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");


    const handleLogin = (event) => {
        event.preventDefault();
        console.log("회원가입");

        passwordChecker();
        emailChecker();
        userIdChecker();
    }

    const passwordChecker = ()=>{
        let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/

        if (password === password2) {
            console.log("비밀번호 일치");
            if (regPass.test(password)) {
                console.log("비밀번호 유효");
            }else{
                console.log("비밀번호 무효");
            }
        }else{
            console.log("비밀번호 불일치");
        }


    }

    const emailChecker = ()=>{
        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

        if (regEmail.test(email)) {
            console.log("이메일 유효");
        }else{
            console.log("이메일 무효");

        }
    }
    const userIdChecker = ()=>{
        const regId = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (regId.test(userId)) {
            console.log("아이디 유효");
        }else{
            console.log("아이디 무효");

        }
    }


    return (
        <div className={"container"}>
            <div className={"box"}>
                <form className={"login-form"} onSubmit={handleLogin}>
                    <label htmlFor="id">아이디</label>
                    <input
                        onChange={e => setUserId(e.target.value) }
                        type="text" name="id" id="id"/>

                    <label htmlFor="password1">비밀번호</label>
                    <input
                        onChange={e => setPassword(e.target.value) }
                        type="password" name="password1" id="password1"/>

                    <label htmlFor="password2">비밀번호 확인</label>
                    <input
                        onChange={e => setPassword2(e.target.value) }
                        type="password" name="password2" id="password2"/>

                    <label htmlFor="email">이메일</label>
                    <input
                        onChange={e => setEmail(e.target.value) }
                        type="email" name="email" id="email"/>
                    <label htmlFor="name">이름</label>
                    <input
                        onChange={e => setName(e.target.value)}
                        type="text" name="name" id="name"/>

                    <button className={"main-button"} onClick={handleLogin}>회원가입</button>

                    <Link to="/login">
                        <button>로그인</button>
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default Join;