'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-Midnight text-white py-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-semibold mb-4">Sosial Media Kami</h2>
          <ul className="flex space-x-4">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Image src="/instagram-icon.png" width={24} height={24} alt="Instagram" /></a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Image src="/linkedin-icon.png" width={24} height={24} alt="LinkedIn" /></a></li>
            <li><a href="https://line.me" target="_blank" rel="noopener noreferrer" aria-label="LINE"><Image src="/line-icon.png" width={24} height={24} alt="LINE" /></a></li>
            <li><a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Image src="/whatsapp-icon.png" width={24} height={24} alt="WhatsApp" /></a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Navigasi</h2>
          <ul className="space-y-2">
            <li><Link href="#tentang" className="hover:underline">Tentang</Link></li>
            <li><Link href="#layanan" className="hover:underline">Layanan</Link></li>
            <li><Link href="#portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Hubungi Saya</h2>
          <address className="not-italic">
            Gedung Benny Subianto (Labtek V),<br />
            Institut Teknologi Bandung, Jalan Ganesha No. 10, 40132<br />
            <a href="tel:+6285280570637" className="hover:underline">(+62) 81291966367</a>
          </address>
        </div>


      </div>

      <div className="text-center mt-8 text-white">
        © Erwan Poltak Halomoan. 2024.
      </div>
      <div className="text-center mt-1 text-white">
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;