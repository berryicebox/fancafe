import { useCallback, useRef, useState } from "react"
import WriteEditor from "../components/WriteEditor"
import '../assets/styles/postWrite.scss'
import { Link } from "react-router-dom";
import instance from "../components/axios";


export default function PostWrite(){
    // 작성 내용(contents), 제목(title), 카테고리(category) 저장
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
  
    // 카테고리 선택할 때 저장
    function onSelectCategory(e){
    //   console.log(e.target.value); // 테스트 코드
      setCategory(e.target.value);
    }

    // 제출할 때 db에 post
    const onClickEnrollBtn = useCallback(async () => {
        if (!editorRef.current) return;

        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        const token = localStorage.getItem('accessToken'); // 토큰 가져오기

        // console.log('token: ', token); // 테스트 코드

        // 보낼 데이터
        const data = {
            "title" : title, 
            "contents" : markdown, 
            "category" : category
        }

        console.log('sending data: ', data); // 테스트 코드

        // axios + refresh 토큰 필요 유무 확인 메서드
        instance({
            method: "POST",
            url: "/post/write",
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
                <Link to="/">
                    <button onClick={onClickEnrollBtn}
                        className="submitButton">등록</button>
                </Link>
        </div>
    )
}