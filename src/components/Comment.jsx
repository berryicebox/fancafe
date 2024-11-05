const Comment = ({comment}) => {
    console.log(comment);
    return (
        <div className="comment">

            <span> {comment.id} </span>

            <span> {comment.nickname} </span>
            <span> {comment.content} </span>
            <hr/>

        </div>
    )
}

export default Comment