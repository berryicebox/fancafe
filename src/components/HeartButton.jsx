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

    useEffect(() => {
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
    }, [heartStatus])

    // heart 값에 따라 컴포넌트 변경 (부모? 자식?)
    return (
        <>
            <button onClick={handleAlertLogin}>
                추천
            </button>
        </>
    )
}