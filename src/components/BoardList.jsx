import {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import BoardItem from "./BoardItem";

const BoardList = ({ props }) => {

    const {data, error, loading} = useQuery({
        queryFn : () => fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json()),
    });

    if (loading){
        return <div>loading</div>
    }
    if (error){
        return <div>error</div>
    }

    return (
            data && data.map((data)=>{
                return (
                    <BoardItem key={data.id} userId={data.userId} itemTitle={data.title} />
                );
            })
    )
}

export default BoardList