import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Botton from './Botton';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);



const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(0);

    const totalImages = 4;
    const nextIndex = (currentIndex % totalImages) + 1;
    const backgroundIndex = currentIndex === totalImages ? 1 : currentIndex;

    const handleImageLoaded = () => {
        setLoadedImages(prev => prev + 1);
    };

    const handleMiniImageClick = () => {
        setHasClicked(true);
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        if (loadedImages === totalImages - 1) {
            setIsLoading(false);
        }
    }, [loadedImages]);

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-image', { visibility: 'visible' });

            gsap.to('#next-image', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
            });

            gsap.from('#current-image', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set('#image-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
        });

        gsap.from('#image-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#image-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        });
    });

    const getImageSrc = index => `img/prog-${index}.jpg`;









    return (
        <div id='home' className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />
                    </div>
                </div>
            )}
            <div id='image-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>

                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniImageClick} className='origin-center scale-50 opacity-0 transition-all
                    duration-500 ease-in hover:scale-100 hover:opacity-100
                    '>
                        <img
                            src={getImageSrc(nextIndex)}
                            id='current-image'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoad={handleImageLoaded}
                            alt='Current'
                        />
                    </div>
                </div>
                <img
                    src={getImageSrc(currentIndex)}
                    id='next-image'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoad={handleImageLoaded}
                    alt='Next'
                />



                <img
                    src={getImageSrc(backgroundIndex)}
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoad={handleImageLoaded}
                    alt='Background'
                />

                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    E n g i n <b>e</b> e r

                </h1>
                <div className='absolute left-0 top-0  z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            <b>m</b> i l a d
                        </h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Mobile App Developer · AI Enthusiast <br />
                            Rustacean with a passion for performance
                        </p>
                        {/* <Botton id="watch-trailer" title="contact" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 
                            flex-center gap-1"/> */}
                    </div>
                </div>

            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
                E n g i n <b>e</b> e r
            </h1>
        </div>
    )
}

export default Hero