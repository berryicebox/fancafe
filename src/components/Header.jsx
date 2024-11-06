import "../assets/styles/header.scss";
// import "../assets/styles/setting.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = (props) => {

    const [isAuth, setIsAuth] = useState(false)
    const [keyword, setKeyword] = useState()
    const navigate = useNavigate();

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

    const searchHandler = (e) => {
        e.preventDefault()
        console.log("search");
        // props.setReload(!(props.reload));
        navigate("/search?keyword=" + keyword)
        props.setReload(!(props.reload));


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

                <form className="searchBar" action="/search"
                      onSubmit={(e) => {
                          searchHandler(e)
                      }}>
                    <input id="searchInput" type="text"
                           name="keyword" maxLength="50"
                           placeholder="글 제목, 본문 검색"
                           onChange={(e) => {
                               setKeyword(e.target.value)
                           }}/>
                    {/*<button onClick={searchHandler}></button>*/}
                </form>

                <div className="headerRegisterContainer">
                    {isAuth ? <>
                            <Link to="/mypage">마이페이지</Link>
                            <Link onClick={handleLogout}>로그아웃</Link></>
                        : <><Link to="/join">회원가입</Link>
                            <Link to="/login">로그인</Link></>}

                </div>
            </div>
        </div>
    )
}

export default Header;