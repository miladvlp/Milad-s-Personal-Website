import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
// import Botton from './Botton';
// import { TiLocationArrow } from 'react-icons/ti';

const navItems = ['Home', 'About', 'Skill', 'Story', 'Projects', 'Contact']

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAudioPalying, setAudioPlaying] = useState(false)
    const [isIndicatorActive, setIndicatorAcrive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null)

    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY == 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisible]);

    const toggleConstAudioIndicator = () => {
        setAudioPlaying((prev) => !prev);
        setIndicatorAcrive((prev) => !prev);
    }

    useEffect(() => {
        if (isAudioPalying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPalying]);

    const handleNavClick = (e, item) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (item === 'Projects') {
            navigate('/projects');
        } else {
            const targetId = item.toLowerCase();
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className='absolute top-1/2 w-full -translate-y-1/2 '>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        {/* <img src="/img/logo.png" alt="logo" className='w-10' /> */}
                        {/* <Botton
                            id='product-button'
                            title='Products'
                            rightIcon={<TiLocationArrow />}
                            containerClass='bg-blue-50 md:flex hidden items-center justify-center
                            gap-1'
                        /> */}
                    </div>
                    <div className='flex h-full items-center gap-4'>
                        {/* Desktop Menu */}
                        <div className='hidden md:block'>
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className='nav-hover-btn'
                                    onClick={(e) => handleNavClick(e, item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className='md:hidden flex flex-col gap-1.5'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                        </button>

                        {/* Audio Button */}
                        <button className='ml-2 md:ml-10 flex items-center space-x-0.5' onClick={toggleConstAudioIndicator}>
                            <audio ref={audioElementRef} className='hidden' src="/audio/Bato.wav" loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }} />
                            ))}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className='md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-blue-50/10 backdrop-blur-md'>
                        <div className='flex flex-col p-4 gap-3'>
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className='text-blue-50 hover:text-blue-200 transition-colors py-2 px-3 font-circular-web'
                                    onClick={(e) => handleNavClick(e, item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Navbar