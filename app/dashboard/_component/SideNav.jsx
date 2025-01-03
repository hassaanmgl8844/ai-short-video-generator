import { PanelsTopLeft } from 'lucide-react'
import React from 'react'

const SideNav = () => {
    const MenuOption =[
        {
            id:1,
            name:"Dashboard",
            path:"/dashboard",
            icon:PanelsTopLeft
        }
    ]
  return (
    <div className='w-64 h-screen shadow-md p-5'>SideNav</div>
  )
}

export default SideNav