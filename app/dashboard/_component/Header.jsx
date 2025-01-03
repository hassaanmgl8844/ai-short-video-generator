import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div>
            <Image src={'/logo.svg'} width={30} height={30} />
        </div>
        </div>
  )
}

export default Header