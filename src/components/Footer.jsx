import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
   <footer className="bg-primary text-white p-4 mt-12 text-center">
      <p>&copy; 2025 Product Hub. All rights reserved.</p>
      <p>
        <Link href="/login" className="underline">Login</Link> to manage your products
      </p>
    </footer>
  )
}
