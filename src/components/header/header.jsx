import React from "react";
import {Container, LogoutBtn, Logo} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header(){
    const authStatus= useSelector((state)=>{state.auth.status});
    const navigate= useNavigate()
// we make an array while using use navigate
    const navItems=[
        {
            name:'Home',
            slug:'/',
            active: true,
        },{
            name:"Login",
            slug:"/login",
            active: !authStatus,
        },    
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
    ]

    return(
        <>
        <header 
        className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className="mr-4">
                         <Link to='/'>
              <Logo width='70px'/>

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
                //html items that is repeated, we use key for them only to make them unique
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && ( //only if authstatus is true i.e. logged in then log out button will be shown
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
                </nav>
            </Container>
        </header>
        </>
    )
}
export default Header