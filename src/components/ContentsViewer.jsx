import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from './axios.jsx'
<<<<<<< HEAD
import { Viewer } from '@toast-ui/react-editor';
import HeartButton from './HeartButton.jsx';
=======

import {Viewer} from '@toast-ui/react-editor';

import Comments from "./Comments";

>>>>>>> b8d70a19c06c054c3dce51058c651bf24c654e0d

const ContentsViewer = ({props}) => {
    const { category, post_id } = useParams();
    const [contentInfo, setContentInfo] = useState(null);


    useEffect(() => {
        instance({
            method: "GET",
            url: `/${category}/${post_id}`
        })
            .then(response => {
                setContentInfo(response.data)
            })
            .catch(error => console.error(error));
    }, [category, post_id]);

    if(!contentInfo){
        return (<p>데이터가 없습니다</p>)
    }

    console.log('데이터: ', contentInfo);

<<<<<<< HEAD
    // 시간 처리
    const totalTime = contentInfo.createdDate; // 2024-11-05T16:55:18.178236
    const day = totalTime.split('T')[0];
    const time = totalTime.split('T')[1].split('.')[0];

  return (
    <div>
        <div>
            <h2>카테고리: {contentInfo.category}</h2>
            <h1>글 제목: {contentInfo.title}</h1>
            <div>
                <p>작성자: {contentInfo.nickname}</p>
                <p>시간: {day} {time} </p>
                <p>조회수: {contentInfo.hits}</p>
            </div>
        </div>
        
        <hr/>
        
        <div>
            <Viewer
                initialValue={contentInfo.contents}
            />
        </div>

        <HeartButton/>
    </div>
  );
=======
    return (
        <>
            <div>

                <h2>카테고리: {contentInfo.category}</h2>
                <h1>글 제목: {contentInfo.title}</h1>
                <div>
                    <p>작성자: {contentInfo.nickname}</p>
                    <p>시간: {contentInfo.createdDate}</p>
                    <p>조회수: {contentInfo.hits}</p>
                </div>
            </div>
            <hr/>
            <div>
                <Viewer
                    initialValue={contentInfo.contents}
                />

            </div>
            <hr/>
            <Comments/>
        </>
    );
>>>>>>> b8d70a19c06c054c3dce51058c651bf24c654e0d
};

export default ContentsViewer;