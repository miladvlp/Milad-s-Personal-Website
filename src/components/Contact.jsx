import React from 'react'
import Botton from './Botton'




const ImageCllipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} alt="" />
    </div>
)




const Contact = () => {
    return (
        <div id='contact'
            className='my-20 min-h-96 w-screen px-10'
        >
            <div className='relative rounded-lg bg-black py-24 text-blue-50
            sm:overflow-hidden
            '>
                <div className='absolute -left-20 top-0 hidden h-full w-72
                overflow-hidden sm:block lg:left-20 lg:w-96
                '>
                    <ImageCllipBox
                        clipClass="contact-clip-path-1"
                        src="img/contact-1.png"
                    />
                    <ImageCllipBox
                        clipClass="contact-clip-path-2 lg:translate-y-40 lg:translate-y-60"
                        src="img/contact-2.png"
                    />
                </div>
                <div className='absolute -top-40 left-20  w-60 
                sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 '>
                    <ImageCllipBox
                        clipClass="absolute md:scale-125 "
                        src="img/contact-3.png"
                    />
                    <ImageCllipBox
                        clipClass="sword-man-clip-path md:scale-125"
                        src="img/contact-4.png"
                    />
                </div>
                <div className='flex flex-col items-center text-center '>
                    <p className='font-general text-[10px] uppercase'>I'm Milad!</p>
                    <p className='special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] '>
                        <b>Full-Stack & AI Developer</b><br />
                        Skilled in <b>Flutter</b>, <b>Kotlin</b>,<br /> <b>Rust</b>

                    </p>
                    {/* <Botton title="contact me" containerClass="mt-10 cursor-pointer" /> */}
                </div>
            </div>

        </div>
    )
}

export default Contact