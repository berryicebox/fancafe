import { useParams } from 'react-router-dom';
import instance from './axios.jsx';
import { useState } from 'react';

export default function HeartButton({heartStatus}){
    const { post_id } = useParams();
    const haveToken = localStorage.getItem('accessToken')
    // heart success가 아니면 추천 맞으면 추천취소

    function handleAlertLogin() {
        if (haveToken === null)
            alert('로그인 하세요');
        else if (heartStatus === true)
            alert('이미 추천 했습니다');
    }

    function handleUpDownHeart(){
        if(heartStatus === false){
            if (haveToken !== null) {
                instance({
                    method: "GET",
                    url: `/heart/add/${post_id}`
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => console.error(error));
            }
        }
        else {
            instance({
                method: "GET",
                url: `/heart/delete/${post_id}`
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.error(error));
        }
    }

    // 두 함수를 바로 넣으면 에러가 뜨므로 따로 묶은 후 사용
    const handleButtonClick = () => {
        handleAlertLogin();
        handleUpDownHeart();
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