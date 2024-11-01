import {useQuery} from "react-query";
import BoardItem from "./BoardItem";
import WriteButton from "./WriteButton";

const BoardList = (props) => {

    const {data, error, loading} = useQuery({
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json()),
    });

    if (loading) {
        return <div>loading</div>
    }
    if (error) {
        return <div>error</div>
    }

    return (<>
            {data && data.map((data) => {
                return (
                    <BoardItem key={data.id} id={data.id} userId={data.userId} itemTitle={data.title}/>
                );
            })}
            {props.isAuth ? <WriteButton/> : null}
        </>


    )
}

export default BoardList