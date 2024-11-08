import { useParams } from 'react-router-dom';
import instance from './axios.jsx';
import { useState } from 'react';

export default function HeartButton({heartStatus}){
    const { post_id } = useParams();
    const haveToken = localStorage.getItem('accessToken')
    const [count, setCount] = useState(0);

    function handleAlertLogin() {
        if (haveToken === null)
            alert('로그인 하세요');
        else if (heartStatus === true)
            setCount(0);
    }

    function handleUpDownHeart(){
        if((heartStatus === false) && (count < 1)){
            if (haveToken !== null) {
                instance({
                    method: "GET",
                    url: `/heart/add/${post_id}`
                })
                    .then(response => {
                        console.log(response.data);
                        setCount(1);
                    })
                    .catch(error => console.error(error));
                
                alert('추천 했습니다');
            }
        }
        else {
            instance({
                method: "GET",
                url: `/heart/delete/${post_id}`
            })
                .then(response => {
                    console.log(response.data);
                    setCount(0);
                })
                .catch(error => console.error(error));
            
            alert('추천 취소 했습니다');
        }
    }

    // 두 함수를 바로 넣으면 에러가 발생하므로 따로 묶은 후 사용
    const handleButtonClick = () => {
        handleAlertLogin();
        handleUpDownHeart();
    };

    return (
        <>
            <button onClick={handleButtonClick}>
                추천
            </button>
        </>
    )
}