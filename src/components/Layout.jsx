import Header from "./Header";
import Footer from "./Footer";

import Router from "./Router";

const Layout = ({ props }) =>
    (
        <div className={"layout-container"}>
            {/* <Header></Header> */}
            <Router/>
            <Footer></Footer>
        </div>
    )

export default Layout