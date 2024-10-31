import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Test from "./Test";
import ItemDetail from "./ItemDetail";
import Best from "../pages/Best";
import New from "../pages/New";
import Join from "../pages/Join";
import Login from "../pages/Login";
import WriteButton from "./WriteButton";
import PostWrite from "../pages/PostWrite";
import JoinSuccess from "../pages/JoinSuccess";
import "../assets/styles/router.scss";

const Router = (props) => {
    console.log(props);
    return (
        <BrowserRouter>

            <div className="outer-container">
                <Header/>
                <div className="inner-container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/item/:itemId" element={<ItemDetail/>}/>
                        <Route path="/test" element={<Test/>}/> {/*라우터 사용 예시*/}
                        <Route path="/best" element={<Best/>}/>
                        <Route path="/new" element={<New/>}/>
                        <Route path="/join" element={<Join/>}/>
                        <Route path="/login" element={<Login reload={props.reload} setReload={props.setReload}/>}/>
                        <Route path="/post/write" element={<PostWrite/>}/>
                        <Route path="/join/success" element={<JoinSuccess/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>

                <WriteButton/>
                <Footer/>

            </div>
        </BrowserRouter>

    )
}

export default Router