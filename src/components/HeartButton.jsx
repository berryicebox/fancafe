import { useParams } from 'react-router-dom';
import instance from './axios.jsx';

export default function HeartButton({ heartStatus, setHeartStatus, setCountHeart, countHeart }) {
    const { post_id } = useParams();
    const haveToken = localStorage.getItem('accessToken');

    function handleAlertLogin() {
        if (haveToken === null) {
            alert('로그인 하세요');
        }
    }

    function handleUpDownHeart(){
        if (haveToken === null) return;

        const url = heartStatus ? `/heart/delete/${post_id}` : `/heart/add/${post_id}`;
        const successMessage = heartStatus ? '추천 취소 했습니다' : '추천 했습니다';

        instance({
            method: "GET",
            url: url
        })
        .then(response => {
            setHeartStatus(!heartStatus);
            setCountHeart(countHeart + (heartStatus ? -1 : 1));
            alert(successMessage);
        })
        .catch(error => console.error(error));
    }

    const handleButtonClick = () => {
        handleAlertLogin();
        handleUpDownHeart();
    };

    return (
        <button onClick={handleButtonClick}>
            {heartStatus ? '추천취소' : '추천'}
        </button>
    );
}