import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Test from "./Test";

const Router = ({ props }) => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} /> {/*라우터 사용 예시*/}
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router