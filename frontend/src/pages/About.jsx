
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {
  const container = useRef(null);
  const left = useRef(null);
  const right = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.from(left.current, {
      x: -100,
      opacity: 0,
      duration: 1,
    })
    .from(right.current, {
      x: 100,
      opacity: 0,
      duration: 1,
    }, '-=0.6');

  }, { scope: container });

  return (
    <div ref={container} className="relative z-10 pt-[9vh] p-5 flex gap-10">
        <div ref={left} className="left w-[55%] px-5 py-10">
            <p className='text-7xl leading-20 text-white poppins-extrabold'>Understand <br /> Youtube Videos  <br /> in Seconds</p>
        </div>
        <div ref={right} className=" right w-[45%] leading-7.5 px-2 py-15 text-lg text-white poppins-medium-italic flex flex-col gap-8">
            <p>
              This is a full-stack AI-powered YouTube video summarizer and query-solving application built to make learning from long-form video content faster and easier. 
              The application is built using the FARM stack (FastAPI, React, and MongoDB), with LangChain powering the AI workflow for processing video content and answering user queries.<br /> <br />

              Users can provide a YouTube video, generate a concise summary, and ask questions about the video's content without having to watch the entire video. The goal is to turn hours of video content into useful, searchable knowledge within seconds.
            </p>
        </div>
    </div>
  )
}

export default About
