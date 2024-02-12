"use client"

import Buttons from "@/components/ui/Buttons/page";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center my-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-yellow-400  md:text-5xl lg:text-6xl dark:text-white">Quiz bee</h1>
      <section className="p-10 my-10 rounded-lg shadow-xl w-[65%]">
      
        <div className=" flex items-center justify-center">
     
       <Buttons/>
    
       </div>
         

      </section>
    </section>
  )
}