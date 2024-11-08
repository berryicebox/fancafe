import "../assets/styles/board.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faFaceGrinTears} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {useModifyTime} from "../utils/useModifyTime";

const BoardItem = ({data}) => {
    const modifiedTime = useModifyTime(data.createdDate)

    return (
        <div>
            <Link to={`/${data.category}/${data.id}`}>
                <div className={"info"}>
                    <div className={"title"}>
                        <span> {data.title} </span>
                        <div className={"comment-count"}>
                            <FontAwesomeIcon icon={faCommentDots}/>
                            <span>{data.count_comment}</span>
                        </div>
                    </div>

                    <div className={"detail-info"}>
                        <div className={"like-info"}>
                            <div>
                                <FontAwesomeIcon icon={faFaceGrinTears}/>
                                <span> {data.count_heart} </span>
                            </div>
                            <span>·</span>
                            <Link to={'/' + data.category}><span className="category"> {data.category} </span></Link>

                        </div>
                        <div className={"author-info"}>
                            <span> {data.nickname} </span>
                            <span>·</span>
                            <span>조회수 {data.hits}</span>
                            <span>·</span>
                            <span>{modifiedTime}</span>
                        </div>

                    </div>

                </div>
            </Link>
        </div>
    )

}

export default BoardItem