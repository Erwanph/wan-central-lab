'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import Feedback from "@/components/Feedback";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <section className="relative bg-cover bg-center lg:h-[91vh] h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="lg:text-[80px] text-[30px] font-bold mb-2">Wan Central Laboratory</h1>
          <p className="lg:text-[27px] text-[17px] text-black max-w-2xl mx-auto">
            Welcome to Wan Central Laboratory! <br />Dive into our interactive virtual labs and explore various scientific and engineering concepts.
          </p>
        </div>
      </section>


      <section id="Subjects" className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
            <h2 className="text-3xl font-bold mb-6 ">Choose a Subject</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <Link href="/simulation" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative w-full h-64 overflow-hidden rounded-lg"> 
                <Image
                  src="/ohmcard.jpg"
                  alt="Ohm's Law"
                  layout="fill" 
                  objectFit="cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 pt-2">Ohm's Law</h3>
              <p>Explore the principles of Ohm's Law with our interactive virtual lab.</p>
            </Link>

            <Link href="/" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative bg-gray-300 w-full h-64 overflow-hidden rounded-lg text-[50px] grid justify-items-center content-center">Coming Soon</div>
              <h3 className="text-2xl font-semibold mb-2">Physics</h3>
              <p>Experiment with basic physics concepts and simulations.</p>
            </Link>

            <Link href="/" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative bg-gray-300 w-full h-64 overflow-hidden rounded-lg text-[50px] grid justify-items-center content-center">Coming Soon</div>
              <h3 className="text-2xl font-semibold mb-2">Chemistry</h3>
              <p>Explore the world of chemistry with virtual experiments.</p>
            </Link>

            <Link href="/" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative bg-gray-300 w-full h-64 overflow-hidden rounded-lg text-[50px] grid justify-items-center content-center">Coming Soon</div>
              <h3 className="text-2xl font-semibold mb-2">Biology</h3>
              <p>Dive into the study of life with engaging virtual biology experiments.</p>
            </Link>

            <Link href="/" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative bg-gray-300 w-full h-64 overflow-hidden rounded-lg text-[50px] grid justify-items-center content-center">Coming Soon</div>
              <h3 className="text-2xl font-semibold mb-2">Mathematics</h3>
              <p>Explore mathematical concepts through interactive activities and tools.</p>
            </Link>

            <Link href="/" className="bg-gray-100 text-black rounded-lg shadow-lg p-6 hover:bg-blue-700 hover:text-white transition">
              <div className="relative bg-gray-300 w-full h-64 overflow-hidden rounded-lg text-[50px] grid justify-items-center content-center">Coming Soon</div>
              <h3 className="text-2xl font-semibold mb-2">Programming</h3>
              <p>Discover the wonders of the code universe with programming laboratory.</p>
            </Link>
          </div>
      </section>

      <section className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
          <p className="text-lg italic text-gray-700 max-w-2xl mx-auto">
            "This virtual lab has been a game-changer for my understanding of physics! Highly recommend it to anyone looking to deepen their knowledge."
          </p>
          <p className="text-lg italic text-gray-700 max-w-2xl mx-auto mt-4">
            "An amazing resource for students and educators alike. The simulations are interactive and easy to understand."
          </p>
        </div>
      </section>
      
      {/* Coming Soon */}
      {/* <section id ="Feedback">
        <Feedback />
      </section> */}
    </main>
  );
};

export default Home;
