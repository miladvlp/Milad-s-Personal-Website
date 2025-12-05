import React from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import { useState, useRef } from 'react';





const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');

    const itemRef = useRef(null);


    const handleMouseMove = (e) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();


        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;



        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;


        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform)
    }

    const handleMouseLeave = () => {
        setTransformStyle('');

    }

    return (
        <div className={className}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    )
}











const BentoCard = ({ src, title, description }) => {
    return (
        <div className='relative size-full '>
            <img src={src}
                // loop
                // muted
                // autoPlay
                className='absolute left-0 top-0 size-full object-cover
            object-center'
            />
            <div className='relative z-10 flex size-full flex-col justify-between
            p-5 text-blue-50'>
                <div>
                    <h1 className='bento-title special-font'>{title}</h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs
                        md:text-base'>{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}


const Features = () => {
    return (
        <section id='skill' className='bg-black pb-52'>
            <div className='container mx-auto px-3 md:px-10'>
                <div className='px-5 py-32'>
                    <p className='font-circular-web text-lg text-blue-50'>
                        Grow smarter, faster, better.
                    </p>


                    <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
                        Harnessing mobile apps, AI, and Rust to bring your ideas to life with speed and reliability.
                    </p>
                </div>

                <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden
            rounded-md md:h-[65vh] '>
                    <BentoCard
                        src='img/llm.jpg'
                        title={<>intellig<b>e</b>nt AI</>}
                        description="Empowering systems with smart behavior using LLMs"
                    />
                </BentoTilt>
                <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
                    <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src="img/flutter_multip.jpg"
                            title={<>Flutt<b>e</b>r</>}
                            description="Cross-platform mobile apps with Flutter."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="img/kotlin.png"
                            title={<>Kotli<b>n</b></>}
                            description="Android apps powered by Kotlin."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="img/rust_lan.jpg"
                            title={<>R<b>u</b>st</>}
                            description="Safe and fast systems programming."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="img/python_blog.jpg"
                            title={<>Pyt<b>h</b>on</>}
                            description="Versatile scripting and automation."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="img/react.jpg"
                            title={<>R<b>e</b>act</>}
                            description="Interactive web applications."
                            isComingSoon
                        />
                    </BentoTilt>

                    {/* <BentoTilt className='bento-tilt_2'>
                        <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                            
                            <h1 className='bento-title special-font max-w-64 text-black'>
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </h1>
                            <TiLocationArrow className='m-5 scale-[5] self-end' />
                        </div>
                    </BentoTilt> */}

                    {/* <BentoTilt className='bento-tilt_2'>
                        <video
                            src="videos/feature-6.mp4"
                            loop
                            muted
                            autoPlay
                            className='size-full object-cover object-center'
                        />
                    </BentoTilt> */}
                </div>
            </div>

        </section >
    )
}

export default Features