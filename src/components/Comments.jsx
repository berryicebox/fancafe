import axios from "axios";
import {useEffect, useState} from "react";
import Comment from "./Comment";

const Comments = () => {
    const [data, setData] = useState("")
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/comment/201?page=1',
        }).then(({data}) => {
            setData(data.comments)
        }).catch((error) => {
            console.log(error)
        });
    }, [])


    return (<>

        {data ? console.log(data) : null}
        {data ? data.map((comment) => {
                return (<Comment comment={comment}></Comment>)
            }
        ) : null}

        <textarea value={newComment.text} onChange={(e) => setNewComment(e.target.value)}>

        </textarea>
        <input type="file" accept="image/*"/>

    </>)
}

export default Comments;