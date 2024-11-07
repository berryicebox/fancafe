import { useParams } from 'react-router-dom';
import instance from './axios.jsx';
import { useEffect, useState } from 'react';

export default function HeartButton({props}){
    const { post_id } = useParams();
    const [isHeart, setIsHeart] = useState(true);

    // useEffect(() => {
    //     if(!isHeart){
    //         console.log("확인 코드: ", isHeart)

    //         instance({
    //             method: "GET",
    //             url: `/heart/add/${post_id}`
    //         })
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    //             .catch(error => console.error(error));
    //     }
    //     else {
    //         console.log("확인 코드: ", isHeart)

    //         instance({
    //             method: "GET",
    //             url: `/heart/delete/${post_id}`
    //         })
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    //             .catch(error => console.error(error));
    //     }
    // }, [isHeart, post_id])

    return (
        <>
            <button onClick={() => setIsHeart(prevIsHeart => !prevIsHeart)}>추천</button>
            <p>테스트: {isHeart ? '추천 취소' : '추천'}</p>
        </>
    )
}