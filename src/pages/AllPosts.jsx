import React, {useState, useEffect} from 'react'
import { Postcard, Container } from '../components/index'
import service from '../appwrite/config1'

function AllPosts() {
    const [posts, setPosts]= useState([])
    useEffect(()=>{},[])
    service.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div className='p-2 w-1/4' key={post.$id}>
                        <Postcard post={post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts