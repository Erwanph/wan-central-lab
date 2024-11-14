'use client'


const About = () => {
    const technologies = [
        {
            title: 'React',
            description: 'A JavaScript library for building user interfaces, essential for interactive components.',
            logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg'
        },
        {
            title: 'Next.js',
            description: 'A React framework that enables server-side rendering and building optimized web applications.',
            logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg'
        },
        {
            title: 'TypeScript',
            description: 'A typed superset of JavaScript that provides static typing for more robust code.',
            logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
        },
        {
            title: 'Tailwind CSS',
            description: 'A utility-first CSS framework for building custom user interfaces quickly and efficiently.',
            logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
        },
        {
            title: 'MongoDB',
            description: 'A NoSQL database designed for fast and flexible data handling, ideal for unstructured data.',
            logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg'
        },
        {
            title: 'PostgreSQL',
            description: 'A powerful, open-source object-relational database system with a strong focus on extensibility and standards compliance.',
            logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg'
        }
    ];

    return (
        <main className="min-h-screen bg-white text-black pt-10 pb-20 px-4 flex items-center">
            <div className="container mx-auto max-w-7xl">

                <section className="mb-12">
                    <h1 className="text-5xl font-bold mb-4">About This Website</h1>
                    <p className="lg:text-[27px] text-[17px] text-gray-700 leading-relaxed">
                        Wan Central Laboratory is a virtual learning platform designed to provide interactive and engaging virtual labs for various scientific and engineering subjects. The goal is to facilitate hands-on learning through accessible, user-friendly simulations that help users understand complex concepts in a practical way.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technologies.map((tech, index) => (
                            <div key={index} className="group h-64 [perspective:1000px]">
                                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg shadow-lg [backface-visibility:hidden]">
                                        <img
                                            src={tech.logo}
                                            alt={`${tech.title} logo`}
                                            className="w-24 h-24 object-contain"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gray-800 text-white p-6 rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                        <div className="flex flex-col h-full justify-center items-center text-center">
                                            <h3 className="text-2xl font-semibold mb-4">{tech.title}</h3>
                                            <p className="text-gray-200">{tech.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;