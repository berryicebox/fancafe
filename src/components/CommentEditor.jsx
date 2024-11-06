import instance from "./axios";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

const CommentEditor = (props) => {

    const {post_id} = useParams()
    const [newComment, setNewComment] = useState("")
    const [img, setImg] = useState(null);

    const inputImageRef = useRef();

    useEffect(() => {
        if (props.comment) {
            console.log(props.comment.content);
            setNewComment(props.comment.content);
        }
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        let blob = new Blob([JSON.stringify({content: newComment})], {type: 'application/json'});
        let url = `/comment/create/${post_id}`;
        let method = "post";


        if (props.isEdit) {
            const cid = props.comment.id;
            url = `/comment/update/${cid}`;
            method = "put";
        }

        if (props.isReply) {
            blob = new Blob([JSON.stringify({content: newComment}), JSON.stringify({parent: props.parentId})], {type: 'application/json'})
        }

        formData.append("commentData", blob);

        if (img != null) {
            formData.append('imageFile', new Blob([img], {type: 'multipart/form-data'}), img.name);
        }


        try {
            instance({
                method: method,
                url: url,
                data: formData,
            }).then((response) => {
                clearInput()
                if (props.isEdit) {
                    props.setEdit(!props.edit)
                } else {
                    props.setCommentSummited(true)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const ImgUploadHandler = async (e) => {
        if (!e.target.files)
            return;
        setImg(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log("등록");
    }

    const clearInput = () => {
        setNewComment("")
        setImg(null);
        inputImageRef.current.value = null;

    }

    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
            <input ref={inputImageRef} onChange={(e) => ImgUploadHandler(e)} type="file" accept="image/*"/>
            <button>등록</button>
        </form>
    )
}
export default CommentEditor