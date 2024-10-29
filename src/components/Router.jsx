import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Test from "./Test";
import Best from "../pages/Best";
import New from "../pages/New";

const Router = ({ props }) => {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} /> {/*라우터 사용 예시*/}
                    <Route path="/best" element={<Best />} />
                    <Route path="/new" element={<New />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router