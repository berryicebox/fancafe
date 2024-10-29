import "../assets/styles/header.scss";
import "../assets/styles/setting.css";
import { Link } from "react-router-dom";

const Header = ({ props }) => {

    return (
            <div className="headerContainer">
                <div className="headerLnCContainer">
                    <h2>FanCafe</h2>
                    <ul className="headerCatecoryContainer">
                        <Link to="/best"><li>인기글</li></Link>
                        <Link to="/new"><li>전체글</li></Link>
                    </ul>
                </div>
                <div className="headerRegisterContainer">
                    <p>회원가입</p>
                    <p>로그인</p>
                </div>
            </div>
    )
}

export default Header;