import Link from 'next/link'
import React from 'react'

export default function Navbar() {

    const NavLinks = () => {
        return(
            <>
            <li>
                <Link href={"/"}>Home</Link>
            </li>
            <li>
                <Link href={"/product"}>Product</Link>
            </li>
            <li>
              <Link href="/dashboard/add-product">
          Add Product
        </Link>
            </li>
            </>
        )
    }
  return (
    <div className="max-w-7xl mx-auto navbar bg-accent-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
            NavLinks()
        }
      </ul>
    </div>
    <Link href={"/"} className=" text-2xl font-bold">Product<span className='text-primary'>Hub</span></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        NavLinks()
      }
    </ul>
  </div>
  <div className="navbar-end">
    <Link href="/login" className="btn btn-primary">Login</Link>
  </div>
</div>
  )
}
