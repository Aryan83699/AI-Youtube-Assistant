
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Home = () => {
  const container = useRef(null);
  const heading = useRef(null);
  const description = useRef(null);
  const button = useRef(null);
  const badge = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.from(badge.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    })
      .from(
        heading.current,
        {
          y: 60,
          opacity: 0,
          duration: 1,
        },
        '-=0.2'
      )
      .from(
        description.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        button.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.3'
      );

    gsap.to('.hero-glow', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: container });

  const handleExplore = () => {
    document.getElementById('home-description')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div
      ref={container}
      className="relative z-10 min-h-[91vh] overflow-hidden pt-[9vh] p-5 flex items-center"
    >
      <div className="hero-glow pointer-events-none absolute top-[20%] left-[25%] h-72 w-72 rounded-full bg-red-600/20 blur-[110px]" />

      <div className="left relative z-10 w-full md:w-[65%] px-5 py-10">
        <div
          ref={badge}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200 poppins-medium"
        >
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Your AI-powered learning companion
        </div>

        <p
          ref={heading}
          className="text-5xl md:text-7xl leading-tight text-white poppins-extrabold"
        >
          Understand
          <br />
          YouTube Videos
          <br />
          <span className="text-red-500">in Seconds.</span>
        </p>

        <br />

        <p
          ref={description}
          id="home-description"
          className="max-w-2xl text-lg md:text-xl leading-8 poppins-medium-italic text-white/80"
        >
          Stop watching hours of content just to find one answer. Turn YouTube
          videos into concise summaries, explore key ideas, and ask questions
          about the content with the power of AI.
        </p>

        <div ref={button} className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleExplore}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
          >
            Discover How It Works →
          </button>

          <span className="text-sm text-white/50">
            Powered by FARM Stack + LangChain
          </span>
        </div>
      </div>

      <div className="right hidden md:flex w-[35%] items-center justify-center">
        <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-red-500/10 backdrop-blur-sm">
          <div className="absolute inset-4 rounded-2xl border border-red-500/20" />

          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-red-600 shadow-xl shadow-red-600/30">
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 fill-white"
              aria-hidden="true"
            >
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
          </div>

          <div className="absolute -right-6 top-8 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white shadow-xl">
            <span className="text-red-400">AI Summary</span>
            <p className="mt-1 text-white/60">Key ideas, simplified.</p>
          </div>

          <div className="absolute -bottom-5 -left-6 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white shadow-xl">
            <span className="text-red-400">Ask anything</span>
            <p className="mt-1 text-white/60">Answers from your video.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
