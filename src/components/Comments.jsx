import axios from "axios";
import {useEffect, useState} from "react";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import CommentEditor from "./CommentEditor";

const Comments = () => {
    const {post_id} = useParams()
    const [data, setData] = useState("")

    const [commentSummited, setCommentSummited] = useState(false);


    useEffect(() => {
        console.log("postid =" + post_id);
        axios({
            method: 'get',
            url: `http://localhost:8080/comment/${post_id}?page=1`,
        }).then(({data}) => {
            console.log(data);
            setData(data.comments)
        }).catch((error) => {
            console.log(error)
        });
        setCommentSummited(false);
    }, [commentSummited])


    return (<>

        {data ? console.log(data) : null}
        {data ? data.map((comment) => {
            return (<Comment commentSummited={commentSummited} setCommentSummited={setCommentSummited}
                             comment={comment}></Comment>)
        }) : null}

        <CommentEditor commentSummited={commentSummited} setCommentSummited={setCommentSummited}></CommentEditor>


    </>)
}

export default Comments;