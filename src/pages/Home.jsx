import React, {useEffect, useState} from 'react'
import service from '../appwrite/config1'
import {Container, Postcard} from '../components'


function Home() {
  const [posts, setPost]= useState([])
  useEffect(()=>{
    service.getPosts((posts)=>{
      if(posts){
        setPost(posts.documents)
      }
    })
  },[])
  if(posts.length===0) return(
    <div className='w-full py-8 mt-4 text-center'>
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      </div>
    </div>
  )
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post)=>(
            <div className='p-2 w-1/4' key={post.$id}>
              <Postcard {...post}/>
              </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home