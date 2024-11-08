import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from './axios.jsx'
import { Viewer } from '@toast-ui/react-editor';
import HeartButton from './HeartButton.jsx';
import Comments from "./Comments";
import { useModifyTime } from '../utils/useModifyTime.jsx';


const ContentsViewer = ({props}) => {
    const { category, post_id } = useParams();
    
    const [contentInfo, setContentInfo] = useState(null);
    const [heartStatus, setHeartStatus] = useState(contentInfo?.heart);
    const [countHeart, setCountHeart] = useState(contentInfo?.count_heart);
    
    const modifiedTime = useModifyTime(contentInfo?.createdDate);

    // let heartStatus = contentInfo?.heart;

    useEffect(() => {
        instance({
            method: "GET",
            url: `/${category}/${post_id}`
        })
            .then(response => {
                setContentInfo(response.data)
                setHeartStatus(response.data.heart)
                setCountHeart(response.data.count_heart)
            })
            .catch(error => console.error(error));
    }, [category, post_id]);

    if(!contentInfo){
        return (<p>데이터가 없습니다</p>)
    }

  return (
    <div>
        <div>
            <h2>카테고리: {contentInfo.category}</h2>
            <h1>글 제목: {contentInfo.title}</h1>
            <div>
                <p>작성자: {contentInfo.nickname}</p>
                <p>시간: {modifiedTime} </p>
                <p>조회수: {contentInfo.hits}</p>
                <p>추천수: {countHeart} </p>
            </div>
        </div>
        
        <hr/>
        
        <div>
            <Viewer
                initialValue={contentInfo.contents}
            />
        </div>

        <HeartButton
            heartStatus={heartStatus}
            setHeartStatus={setHeartStatus}
            setCountHeart={setCountHeart}
            countHeart={countHeart}
        />

        <Comments />
    </div>
  );
};

export default ContentsViewer;