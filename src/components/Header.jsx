import "../assets/styles/header.scss";
// import "../assets/styles/setting.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = ({props}) => {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setIsAuth(true)
        }
    })
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        props.setReload(!(props.reload));
        setIsAuth(false)
    }

    return (
        <div className="headerContainer">
            <div className="headerContentsContainer">
                <div className="headerLnCContainer">
                    <Link to="/"><h1>FanCafe</h1></Link>
                    <ul className="headerCatecoryContainer">
                        <Link to="/best">
                            <li>인기글</li>
                        </Link>
                        <Link to="/new">
                            <li>전체글</li>
                        </Link>
                    </ul>
                </div>
                <div className="headerRegisterContainer">
                    {isAuth ?
                        <Link onClick={handleLogout}>로그아웃</Link>
                        : <><Link to="/join">회원가입</Link>
                            <Link to="/login">로그인</Link></>}

                </div>
            </div>
        </div>
    )
}

export default Header;