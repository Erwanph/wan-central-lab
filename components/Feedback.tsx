'use client'
import { useState } from 'react';

const Feedback: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-white text-black pb-10 px-2 min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-2 max-w-7xl flex items-center justify-center flex-col md:flex-row ">
        
        <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
            <img src="contact.gif" alt="Contact Me" />
          <div className="w-4/5 h-80 bg-gray-600 rounded-lg"></div>
        </div>
        
        <div className="w-full md:w-1/2 pl-6 ">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-Royal mb-2">GET IN TOUCH</h2>
            <h1 className="text-5xl font-bold mb-6 text-black">Contact Me</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-black">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What's your name?"
                  className="w-full p-4 bg-white text-gray-800 rounded-lg text-lg h-12"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-black">Your Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="What's your email?"
                  className="w-full p-4 bg-white text-gray-800 rounded-lg text-lg h-12"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-black">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  className="w-full p-4 bg-white text-gray-800 rounded-lg text-lg h-40"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-800 rounded-lg text-white text-lg font-semibold mt-0" 
              >
                {submitted ? "Thank You for Your Feedback!" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
