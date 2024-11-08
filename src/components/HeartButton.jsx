import { useParams } from 'react-router-dom';
import instance from './axios.jsx';
import { useEffect, useState } from 'react';

export default function HeartButton({heartStatus}){
    const { post_id } = useParams();
    const haveToken = localStorage.getItem('accessToken')
    console.log("token: ", localStorage.getItem('accessToken'));
    // 토큰 없으면 null

    function handleAlertLogin() {
        if (haveToken === null)
            alert('로그인 하세요');
        else if (heartStatus === true)
            alert('이미 추천 했습니다');
    }

    function handleUpHeart(){
        if(heartStatus === false){
            console.log("**************************heart: ", heartStatus)
    
            if (haveToken !== null) {
                instance({
                    method: "GET",
                    url: `/heart/add/${post_id}`
                })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    // 두 함수를 바로 넣으면 에러가 뜨므로 따로 묶은 후 사용
    const handleButtonClick = () => {
        handleAlertLogin();
        handleUpHeart();
    };

    // heart 값에 따라 컴포넌트 변경 (부모? 자식?)
    return (
        <>
            <button onClick={handleButtonClick}>
                추천
            </button>
        </>
    )
}