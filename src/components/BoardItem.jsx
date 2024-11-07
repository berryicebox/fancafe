import "../assets/styles/board.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faFaceGrinTears} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const BoardItem = ({data}) => {

    return (
        <div>
            <Link to={`/${data.category}/${data.id}`}>
                <div className={"info"}>
                    <div className={"title"}>
                        <span> {data.title} </span>
                        <FontAwesomeIcon icon={faCommentDots}/>
                        <span>{data.count_comment}</span>
                    </div>

                    <div className={"detail-info"}>
                        <div className={"like-info"}>
                            <FontAwesomeIcon icon={faFaceGrinTears}/>
                            <span> {data.count_heart} </span>

                        </div>
                        <div className={"author-info"}>
                            <span> {data.name} </span>
                            <span>·</span>
                            <span>조회수 {data.hits}</span>
                            <span>·</span>
                            <span>{data.createdDate}</span>
                        </div>

                    </div>

                </div>
            </Link>
        </div>
    )

}

export default BoardItem