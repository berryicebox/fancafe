import {faUserPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../assets/styles/mypage.scss"
import {useEffect, useState} from "react";
import instance from "../components/axios";

function MyPage(props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [emailInvalid, setEmailInvalid] = useState(false);
    const [invalidRequest, setInvalidRequest] = useState(false);

    const [nameAlreadyExist, setNameAlreadyExist] = useState(false);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance({
                url: "/auth/mypage",
                method: "GET"
            })
            if (response && response.data) {
                setName(response.data.nickname);
                setEmail(response.data.mail);
            }
        }
        fetchData()

    }, [])

    const editUser = (e) => {
        e.preventDefault();
        console.log({email, name});
    }

    const emailChecker = (email) => {
        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        if (regEmail.test(email)) {
            console.log("이메일 유효");
            setEmailInvalid(false);
            setEmail(email)

        } else {
            console.log("이메일 무효");
            setEmailInvalid(true);
        }
    }


    return (
        <div className="container">
            <div className="box">

                <FontAwesomeIcon className={"icon"} icon={faUserPen}/>
                <form action="post">
                    <span>아이디</span>
                    <span>testuser</span>
                    <hr/>
                    <label htmlFor="email">이메일</label>
                    <input
                        onChange={e => emailChecker(e.target.value)}
                        type="text" name="email" id="email" value={email}/>
                    {emailInvalid ? <span className={"warning"}> 이메일이 적합 하지 않습니다</span> : ""}
                    {emailAlreadyExist ? <span className={"warning"}> 이미 존재하는 이메일입니다. </span> : ""}

                    <label htmlFor="name">닉네임</label>
                    <input
                        onChange={e => setName(e.target.value)}
                        type="text" name="name" id="name" value={name}/>
                    {nameAlreadyExist ? <span className={"warning"}> 이미 존재하는 닉네임입니다. </span> : ""}

                    {invalidRequest ? <span className={"warning"}> 입력을 확인해주세요. </span> : ""}

                    <button onClick={editUser}>저장</button>
                </form>
            </div>

        </div>
    )
}

export default MyPage;