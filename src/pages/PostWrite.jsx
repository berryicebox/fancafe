import { useCallback, useRef, useState } from "react"
import WriteEditor from "../components/WriteEditor"
// import { axios } from '../components/axios'
import axios from "axios";
import '../assets/styles/postWrite.scss'
import { Link } from "react-router-dom";


export default function PostWrite(){
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
  
    function onSelectCategory(e){
      console.log(e.target.value); // 테스트 코드
      setCategory(e.target.value);
    }

    /* const onClickEnrollBtn = useCallback(() => {
        // editorRef.curret === null일 때 아무것도 반환하지 않음
        if (!editorRef.current) return;
        // 마크다운을 받는 Ref
        const markdown = editorRef.current.getInstance().getMarkdown();
        console.log('markdown: ', markdown);
    }, []); */ // 테스트 코드

    const onClickEnrollBtn = useCallback(async () => {
        if (!editorRef.current) return;

        const markdown = editorRef.current.getInstance().getMarkdown();
        const token = localStorage.getItem('accessToken'); // 토큰 가져오기

        // console.log('token: ', token); // 테스트 코드

        const data = {
            "title" : title, 
            "contents" : markdown, 
            "category" : category
        }

        console.log('sending data: ', data); // 테스트 코드

        axios({
            method: "POST",
            url: "http://localhost:8080/post/write",
            headers: {
                Authorization: `Bearer ${token}` // JWT 포함
            },
            data: data,
        })
            .then(response => response.data)
            .catch(error => console.error(error))
    }, [category, title]);

    return(
        <div>
                <select name='category' value={category}
                    onChange={(e) => onSelectCategory(e)}
                    className="selectorCategory">
                    <option value='자유'>자유</option>
                    <option value='강사님께 질문'>강사님께 질문</option>
                    <option value='강사님 OOTD'>강사님 OOTD</option>
                    <option value='강사님 팬아트'>강사님 팬아트</option>
                    <option value='강사님께 한마디'>강사님께 한마디</option>
                    <option value='졸업생 커뮤니티'>졸업생 커뮤니티</option>
                    <option value='데일리 코테'>데일리 코테</option>
                </select>
                <input placeholder='제목' name='title'
                    className="inputTitle"
                    onChange={(e) => setTitle(e.target.value)}
                />  
                <WriteEditor ref={editorRef}/>
                <Link to="/"><button onClick={onClickEnrollBtn}>제출</button></Link>
        </div>
    )
}