"use client"

import { useState } from "react"
import Loader from "./Loader"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <Navbar visible={loaderDone} />
      {children}
      <Footer />
    </>
  )
}
