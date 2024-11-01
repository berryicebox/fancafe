import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080",
});
let isInvalidToken = false;

// 요청 인터셉터
instance.interceptors.request.use(function (config) {

    console.log(isInvalidToken);
    // 스토리지에서 토큰을 가져온다.
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (accessToken && !isInvalidToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (accessToken && refreshToken && isInvalidToken) {
        config.data = {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
    }

    console.log("엑시오스 세팅값");
    console.log(config);
    return config;
}, function (error) {
    console.log("--요청 실패--");
    console.log(error);
});


// 응답 인터셉터
instance.interceptors.response.use(async function (response) {

    console.log("요청성공");

    return response;
}, async function (error) {

    const dataResponse = (data) => {
        console.log("토큰 재발급 성공");
        localStorage.setItem("accessToken", data.accessToken);
        isInvalidToken = false;
        // todo isInvalidToken 이 false 인 경우에도 true 인것 처럼 동작하고 있어서 처리가 안됨
    }

    const errorResponse = (error) => {
        console.log("error response")
        console.log(error);
    }

    console.log(error);
    const {config, response: {status, data}} = error;

    if (status === 401 && data.error === "InvalidTokenException") {
        isInvalidToken = true;

        console.log("--토큰 이상함--");
    }

    if (status === 401 && data.error === "Unauthorized") {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        isInvalidToken = true;

        try {
            console.log("--토큰 만료--");

            const response = await instance({
                method: "POST",
                url: "/auth/token",
                data: {refreshToken} // refreshToken을 요청에 포함시킵니다.
            });

            dataResponse(response.data);
            // 원래 요청을 재전송합니다.
            config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            return instance(config); // 재전송

        } catch (e) {
            console.log("토큰 재발급 실패");
        }
    } else {
        isInvalidToken = true;

        console.log("401 외 다른 에러");
    }

    // return Promise.reject(error);
});

export default instance;
