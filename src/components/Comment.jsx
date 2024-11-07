import "../assets/styles/comment.scss"
import {useEffect, useState} from "react";
import CommentEditor from "./CommentEditor";
import instance from "./axios";

const Comment = ({parentList, comment, commentSummited, setCommentSummited}) => {
    let url;
    const [edit, setEdit] = useState(false)
    const [reply, setReply] = useState(false)
    const [del, setDel] = useState(false)

    useEffect(() => {
        setCommentSummited(true)
        setDel(false)
    }, [edit, del])

    if (comment.imageUrl) {
        url = "http://localhost:8080/file/comment?filename=" + comment.imageUrl[0]
    }

    if (edit) {
        return (<CommentEditor isEdit={true} edit={edit} setEdit={setEdit} comment={comment}/>)
    }


    const deleteHandler = () => {
        instance({
            url: `http://localhost:8080/comment/delete/${comment.id}`,
            method: "DELETE"
        }).then(() => {
                setDel(true)
            }
        ).catch((error) => {
            console.log(error)
        })
    }


    return (<>

            <div className={comment.parent ? "comment child" : "comment"}>
                <div className="info-section">
                    <div className="author-info"><span> {comment.id} </span>
                        {!parentList.has(comment.parent?.id) ? <span> {comment.parent?.id} </span> : null}
                        <span> {comment.nickname} </span>
                        <span> {comment.createdDate} </span>
                    </div>
                    {comment.imageUrl && <img className="commentImg" src={url}/>}
                    <span> {comment.content} </span>
                </div>


                <div className={"edit-section"}>
                    <button onClick={() => setReply(true)}>대댓글작성</button>
                    <button onClick={() => setEdit(true)}>수정</button>
                    <button onClick={deleteHandler}>삭제</button>
                </div>
            </div>
            {reply ?
                <CommentEditor setCommentSummited={setCommentSummited} isReply={true} reply={reply} setReply={setReply}
                               parentId={comment.id}/> : null}
            <hr/>


        </>

    )
}

export default Comment