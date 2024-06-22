"use client"

import { FaLock } from "react-icons/fa6"

const Forbidden = () => {
  return (
    <section className="w-full h-dvh bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
      <h1 className="md:text-9xl text-4xl font-extrabold ">403</h1>
      <h3 className="md:text-5xl text-xl font-bold ">Forbidden</h3>
      </div>
    </section>
  )
}

export default Forbidden