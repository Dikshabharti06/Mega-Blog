import { useState } from 'react'

function App() {
  //for treating env values as strings we have config file
  console.log(import.meta.env.VITE_KEY_VALUE);
  console.log(import.meta.env);
  return (
    <>
    <div>
    Learning with appwrite</div>
    </>
  )
}

export default App
