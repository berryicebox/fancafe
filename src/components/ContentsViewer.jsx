import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Viewer} from '@toast-ui/react-editor';

import Comments from "./Comments";
import axios from "axios";


const ContentsViewer = ({props}) => {
    const {category, post_id} = useParams();
    const [contentInfo, setContentInfo] = useState(null);


    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/${category}/${post_id}`
        })
            .then(response => setContentInfo(response.data))
            .catch(error => console.log(error));
    }, [category, post_id]);

    if (!contentInfo) {
        return (<p>데이터가 없습니다</p>)
    }

    console.log('데이터: ', contentInfo);

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
};

export default ContentsViewer;