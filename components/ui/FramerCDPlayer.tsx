'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FramerCDPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative flex items-center justify-center w-full"
      style={{ height: 350 }}
    >
      <div 
        className="relative cursor-pointer scale-[2.5] md:scale-[3.2] transform-gpu origin-center hover:scale-[2.6] md:hover:scale-[3.3] transition-transform duration-500" 
        style={{ width: 119, height: 104 }} 
        onClick={togglePlay}
      >
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" 
        loop
      />

      {/* The CD Disk */}
      <motion.div 
        className="absolute"
        style={{ right: 25, top: '50%', marginTop: -41, width: 82, height: 82 }}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
      >
        <svg width="82" height="82" viewBox="0 0 415 415" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_659_1502)">
            <circle cx="207.5" cy="207.5" r="207.5" fill="#1C1C1E"/>
            <g filter="url(#filter0_f_659_1502)">
              <path d="M290 -23.0139L135.5 -18L206.5 220.999L124.5 465.012H290L214 220.999L290 -23.0139Z" fill="#D9D9D9" fillOpacity="0.37"/>
            </g>
            <g filter="url(#filter1_f_659_1502)">
              <line x1="207.25" y1="453.004" x2="207.25" y2="-37.9971" stroke="white" strokeWidth="1.5"/>
            </g>
            <g filter="url(#filter2_f_659_1502)">
              <line x1="207.75" y1="453.004" x2="207.75" y2="-37.9971" stroke="white" strokeOpacity="0.52" strokeWidth="0.5"/>
            </g>
            <circle cx="207.5" cy="207.5" r="203.5" stroke="black" strokeWidth="8"/>
            <circle cx="207.5" cy="207.5" r="90.5" stroke="black" strokeWidth="2"/>
            <circle cx="207.5" cy="207.5" r="113.5" stroke="black" strokeWidth="2"/>
            <circle cx="207.5" cy="207.5" r="135.5" stroke="black" strokeWidth="2"/>
            <circle cx="207.5" cy="207.5" r="156.5" stroke="black" strokeWidth="2"/>
            <circle cx="207.5" cy="207.5" r="180.5" stroke="black" strokeWidth="2"/>
            <circle cx="207.5" cy="207.5" r="61.5" fill="#C2272D" stroke="black" strokeWidth="10"/>
            <circle cx="207.5" cy="207.5" r="13.5" fill="white"/>
            <circle cx="207.5" cy="207.5" r="11.5" fill="black"/>
          </g>
          <defs>
            <filter id="filter0_f_659_1502" x="51.7" y="-95.8156" width="311.1" height="633.627" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="36.4" result="effect1_foregroundBlur_659_1502"/>
            </filter>
            <filter id="filter1_f_659_1502" x="186.5" y="-57.9961" width="41.5" height="531" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_659_1502"/>
            </filter>
            <filter id="filter2_f_659_1502" x="194.3" y="-51.1961" width="26.9" height="517.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="6.6" result="effect1_foregroundBlur_659_1502"/>
            </filter>
            <clipPath id="clip0_659_1502">
              <rect width="415" height="415" rx="200" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </motion.div>

      {/* The Hand / Needle */}
      <motion.div 
        className="absolute"
        style={{ right: 6, top: '48%', marginTop: -36.5, width: 54, height: 73, transformOrigin: "100% 0%" }}
        animate={{ rotate: isPlaying ? -14 : 3 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      >
        <svg width="54" height="73" viewBox="0 0 270 364" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_ii_659_1546)">
            <path d="M248.68 19.2891C226.196 88.8894 194.466 187.11 179.147 234.529C173.295 252.645 162.105 268.54 146.258 279.09C124.797 293.377 92.2244 313.142 62.6797 323.289" stroke="white" strokeWidth="17" strokeLinecap="round"/>
          </g>
          <g filter="url(#filter1_ii_659_1546)">
            <rect x="218.225" y="35.2852" width="47" height="88" rx="11" transform="rotate(16.1958 218.225 35.2852)" fill="white"/>
          </g>
          <g filter="url(#filter2_ii_659_1546)">
            <path d="M72.7857 296.134C78.6788 292.576 86.355 295.244 88.7713 301.69L96.1834 321.463C98.5278 327.717 94.8032 334.6 88.2853 336.059L22.1432 350.859C16.8421 352.045 11.5013 349.036 9.76908 343.888V343.888C8.1831 339.174 10.084 333.991 14.3417 331.42L72.7857 296.134Z" fill="white"/>
          </g>
          <defs>
            <filter id="filter0_ii_659_1546" x="51.1774" y="6.78516" width="208.005" height="329.008" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_659_1546"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_659_1546"/>
              <feOffset dx="-3" dy="-4"/>
              <feGaussianBlur stdDeviation="3.75"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0"/>
              <feBlend mode="normal" in2="effect1_innerShadow_659_1546" result="effect2_innerShadow_659_1546"/>
            </filter>
            <filter id="filter1_ii_659_1546" x="193.308" y="33.9141" width="69.4224" height="100.359" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_659_1546"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_659_1546"/>
              <feOffset dx="-3" dy="-4"/>
              <feGaussianBlur stdDeviation="3.75"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0"/>
              <feBlend mode="normal" in2="effect1_innerShadow_659_1546" result="effect2_innerShadow_659_1546"/>
            </filter>
            <filter id="filter2_ii_659_1546" x="6.21399" y="290.547" width="92.6743" height="64.5703" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_659_1546"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-3" dy="-4"/>
              <feGaussianBlur stdDeviation="3.75"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0"/>
              <feBlend mode="normal" in2="effect1_innerShadow_659_1546" result="effect2_innerShadow_659_1546"/>
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
    </div>
  );
}
