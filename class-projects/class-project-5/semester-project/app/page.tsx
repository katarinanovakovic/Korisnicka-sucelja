import HeroSection from "@/app/_components/HeroSection";
import CtaSection from "@/app/_components/CtaSection";
import TestimonialsSection from "@/app/_components/TestimonialsSection";
import heroImage from "@/public/hero/hero.png";


import React from 'react';
import Background from "@/app/_components/Background";

const Home: React.FC = () => {
  const imageUrl = 'semester-project\public\hero\hero.png' 

  return (
    <main className="flex flex-col justify-between items-center">
    <Background imageUrl={imageUrl}>
      <HeroSection />
    </Background>
    </main>
  );
};


export default  Home;
/* (){
  return (
    <main className="flex flex-col justify-between items-center">
      <HeroSection />
      <CtaSection />
      <TestimonialsSection />
    </main>
  );
}*/
