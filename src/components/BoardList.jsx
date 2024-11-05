import BoardItem from "./BoardItem";
import WriteButton from "./WriteButton";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import axios from "axios";

const BoardList = (props) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState();

    const handlePageChange = (newData) => {
        setCurrentPage(newData);
    };

    useEffect(() => {
        axios({
            url: `http://localhost:8080/new?page=${currentPage}`,
            method: "GET",

        }).then((response) => {
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            setError(true)
        })
    }, [currentPage])


    if (loading) {
        return <div>loading</div>
    }
    if (error) {
        return <div>error</div>
    }

    return (<>
            {data && data.posts.map((data) => {
                return (
                    // <BoardItem key={data.id} id={data.id} userId={data.userId} itemTitle={data.title}/>
                    <BoardItem key={data.id} id={data.id} userId={data.nickname} itemTitle={data.title}
                               category={data.category}/>
                );
            })}
            {props.isAuth ? <WriteButton/> : null}
            {data && <Pagination
                totalPost={data.totalCount}
                currentPage={currentPage}
                handlePageChange={handlePageChange}/>
            }
        </>


    )
}

export default BoardList