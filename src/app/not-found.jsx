import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div className=' flex justify-center items-center w-full h-full'>
        <div>
            <h1 className='text-4xl my-5'>404 Not Found</h1>
            <Link className='btn text-center' href="/">Go Back to Home</Link>
        </div>
    </div>
  )
}
