import "../assets/styles/comment.scss"
import {useEffect, useState} from "react";
import CommentEditor from "./CommentEditor";
import instance from "./axios";
import {useModifyTime} from "../utils/useModifyTime";

const Comment = ({parentList, comment, commentSummited, setCommentSummited}) => {
    let url;
    const [edit, setEdit] = useState(false)
    const [reply, setReply] = useState(false)
    const [del, setDel] = useState(false)
    const modifiedTime = useModifyTime(comment.createdDate)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        getAuth();
    }, [])

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

    const getAuth = () => {
        instance({
            url: `http://localhost:8080/comment/update/${comment.id}`,
            method: "GET"
        }).then((response) => {
                console.log("isAuth?")
                console.log(response.data)
                if (response.data === true) {
                    setIsAuth(true)
                }
            }
        ).catch((error) => {
            console.log(error)
        })

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
                    <div className="author-info">
                        {!parentList.has(comment.parent?.id) ? <span> {comment.parent?.id} </span> : null}
                        <span> {comment.nickname} </span>
                        <span> {modifiedTime} </span>
                    </div>
                    {comment.imageUrl && <img className="commentImg" src={url}/>}
                    <span> {comment.content} </span>
                </div>


                <div className={"edit-section"}>
                    <button onClick={() => setReply(true)}>대댓글작성</button>
                    {isAuth ?
                        (<>
                            <button onClick={() => setEdit(true)}>수정</button>
                            <button onClick={deleteHandler}>삭제</button>
                        </>) : null}

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