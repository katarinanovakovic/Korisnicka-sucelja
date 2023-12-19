//import HeroImageGrid, { HeroImageObject } from "./Background";
import Button from "@/components/Button";

import heroImage1 from "@/public/hero/hero.png";


/*const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "0 0 0 0" },

];*/

const HeroSection = () => (
  <section className="container flex justify-between items-center gap-10 w-screen mb-8">
    <div className="flex flex-col justify-start gap-5 max-w-xl m-auto lg:m-0">
      <h1 className="font-playfair text-5xl text-center lg:text-left xl:text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces">
        HEALTHY <br/>
        AND <br />
        EASY <br />
      </h1>
      <p className="font-roboto text-base text-center text-brand-purple-900 lg:text-left xl:text-lg whitespace-break-spaces">
        Wholesome Recipes Made Simple: 
        Discover a World of Healthy Culinary Delights!
      </p>

      <div className="flex gap-5 mt-4 self-center lg:self-start">
        <Button
          orange
          className="text-base xl:text-lg xl:px-8"
          iconClassName="xl:w-4 xl:h-4"
        >
          LET'S GO!
        </Button>
       
      </div>
    </div>
  </section>
);

export default HeroSection;
