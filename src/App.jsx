import "../src/assets/styles/setting.css";
import "../src/assets/styles/reset.css";
import {QueryClient, QueryClientProvider} from "react-query";
import Auth from "./components/axios";
import Router from "./components/Router";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    // const [nickName, setNickName] = useState('');
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        token ? console.log('axios 토큰 유효 여부확인') : console.log('로그인안됨');
    }, [reload]);

    const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
            <div className="App">
                <Router reload = {reload} setReload={setReload} />
            </div>
      </QueryClientProvider>
  );
}

export default App;
