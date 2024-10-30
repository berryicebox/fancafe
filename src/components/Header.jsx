import "../assets/styles/header.scss";
// import "../assets/styles/setting.css";
import { Link } from "react-router-dom";

const Header = ({ props }) => {

    return (
            <div className="headerContainer">
                <div className="headerLnCContainer">
                <Link to="/"><h1>FanCafe</h1></Link>
                    <ul className="headerCatecoryContainer">
                        <Link to="/best"><li>인기글</li></Link>
                        <Link to="/new"><li>전체글</li></Link>
                    </ul>
                </div>
                <div className="headerRegisterContainer">
                    <Link to="/join">회원가입</Link>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
    )
}

export default Header;