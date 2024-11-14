'use client'
import Image from "next/image";
import { useState } from 'react';
import OhmsLaw from "@/components/OhmsLaw";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between pt-16">
        <OhmsLaw/>
    </main>
  );
};

export default Home;
