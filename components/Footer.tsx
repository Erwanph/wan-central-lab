'use client'
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-Midnight text-white py-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-semibold mb-4 lg:pl-8  ">Sosial Media</h2>
          <ul className="flex space-x-8 lg:pl-8">
            <li><a href="https://instagram.com/erwanphs" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Image src="/wanlogo-nobg.png" width={30} height={24} alt="Instagram" />Instagra</a></li>
            <li><a href="https://linkedin.com/in/erwan-poltak-halomoan/in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Image src="/wanlogo-nobg.png" width={30} height={24} alt="LinkedIn" />Linkedin</a></li>
            <li><a href="https://line.me" target="_blank" rel="noopener noreferrer" aria-label="LINE"><Image src="/wanlogo-nobg.png" width={30} height={24} alt="LINE" />LINE</a></li>
            <li><a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Image src="/wanlogo-nobg.png" width={30} height={24} alt="WhatsApp" />Whatsapp</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Navigasi</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="about" className="hover:underline">About</Link></li>
            <li><Link href="/#Subjects" className="hover:underline">Subjects</Link></li>
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