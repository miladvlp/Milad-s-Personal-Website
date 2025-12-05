import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap'
import RoundedCorners from './RoundedCorners'
import Botton from './Botton'

const Story = () => {
    const fameRef = useRef(null)

    const handleMouseLeave = () => {
        const element = fameRef.current;
        gsap.to(element, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: "power1.inOut"
        });
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = fameRef.current;
        if (!e) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX, rotateY,
            transformPerspective: 500,
            ease: "power1.inOut"
        });
    };

    return (
        <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
            <div className='flex size-full flex-col items-center py-10 pb-24'>
                <p className='font-general text-sm uppercase md:text-[10px]'>
                    From Code to Intelligence
                </p>

                <div className='relative size-full'>
                    <AnimatedTitle
                        title="the j<b>o</b>urney <br/> of a multi-stack <b>d</b>eveloper"
                        sectionId='#story'
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />

                    <div className='story-img-container'>
                        <div className='story-img-mask'>
                            <div className='story-img-content'>
                                <img
                                    ref={fameRef}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    src={`${import.meta.env.BASE_URL}img/story_img.png`}
                                    alt='tech-journey'
                                    className='object-contain'
                                />
                            </div>
                        </div>
                        <RoundedCorners />
                    </div>
                </div>

                <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
                            Mastering Flutter, Kotlin, AI, Rust, Python, and React —
                            creating seamless cross-platform experiences powered by
                            intelligence and clean code. Join the mission to build smarter software.
                        </p>

                        <Botton
                            id="realm-btn"
                            title="Explore My Stack"
                            containerClass="mt-5"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
