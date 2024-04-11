import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'


export default function Header() {
  return (
    <div className="header">
        <Link to={"/projects"} className='logo'>flow</Link>
        <div className="header-right flex justify-center">
        {/* <a className="active" href="#projects"><Link to={"/projects"}>Projects</Link></a>
        <a href="#whiteboard"></a> */}
        <Link to={"/projects"}>Projects</Link>
        <Link to={"/whiteboard"}>WhiteBoard</Link>

        <div className='mt-1 absolute right-2'>
          <DropDown/>  
        </div> 
        
  </div>
</div>
  )
}
