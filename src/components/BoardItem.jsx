import "../assets/styles/board.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faFaceGrinTears} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const BoardItem = (props) => {

    return (
        <div>
            <Link to={`/${props.category}/${props.id}`}>
                <div className={"info"}>
                    <div className={"title"}>
                        <span> {props.itemTitle} </span>
                        <FontAwesomeIcon icon={faCommentDots}/>
                        <span>5</span>
                    </div>

                    <div className={"detail-info"}>
                        <div className={"like-info"}>
                            <FontAwesomeIcon icon={faFaceGrinTears}/>
                            <span>22</span>

                        </div>
                        <div className={"author-info"}>
                            <span> {props.userId} </span>
                            <span>·</span>
                            <span>조회수 2204</span>
                            <span>·</span>
                            <span>7시간전</span>
                        </div>

                    </div>

                </div>
            </Link>
        </div>
    )

}

export default BoardItem