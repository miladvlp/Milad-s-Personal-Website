import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'



const links = [
    { href: 'https://github.com/miladvlp', icon: <FaGithub /> },
    { href: 'https://www.linkedin.com/in/miladvalipor/', icon: <FaLinkedin /> },
]


const Footer = () => {
    return (
        <footer className='w-screen bg-violet-300 py-4 text-black '>
            <div className='container mx-auto flex flrx-col items-center
            justify-between gap-4 px-4 md:flex-row 
            '>
                <p className='text-center text-sm md:text-left'>
                    &copy; 2025 Milad Valipor. All rights reserved.
                </p>

                <div className='flex justify-center gap-4 md:justify-start'>
                    {links.map((link) => (
                        <a key={link} href={link.href} target='__blank'
                            rel='noopener noreferrer' className='text-black transition-colors
                        duration-500 ease-in-out hover:text-white'
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    )
}

export default Footer