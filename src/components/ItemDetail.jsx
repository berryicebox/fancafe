import {useQueries, useQuery} from "react-query";
import BoardItem from "./BoardItem";
import {useParams} from "react-router-dom";
import {useState} from "react";

const ItemDetail = ({ props }) => {
    const {itemId} = useParams();



    const url = 'https://jsonplaceholder.typicode.com/posts/' + itemId;

    console.log(url);
    const fetchPosts = () => fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`)
        .then((response) => response.json())

    const fetchComments = () => fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}/comments`)
        .then((response) => response.json())


    const queries = [
        {queryKey:['posts'] , queryFn:fetchPosts},
        {queryKey:['comments'] , queryFn : fetchComments},

    ]

    const DetailQueries = useQueries(queries);

    const posts = DetailQueries[0];
    const comments = DetailQueries[1];



    if (posts){
        if (posts.isLoading) {
            return <div>loading</div>
        }
        if (posts.isError) {
            return <div>isError</div>
        }
    }

    if (comments) {
        if (comments.isLoading) {
            return <div>loading</div>
        }
        if (comments.isError) {
            return <div>isError</div>
        }

        if (comments.data) {
            console.log(comments.data);
        }
    }

    return (
        <div>
            <div>{posts.data?.title}</div>
            <div>{posts.data?.userId}</div>
            <div>{posts.data?.body}</div>
            <hr/>

            {comments.data && comments.data.map((data ) => {
                return(<div key={data.id}>
                        <p>{data.email}</p>
                        <p>{data.name}</p>
                        <p>{data.body}</p>
                        <hr/>
                    </div>

                )
            })}


        </div>
    )
}

export default ItemDetail