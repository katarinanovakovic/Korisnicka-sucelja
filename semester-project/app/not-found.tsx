'use client'
import Button from "@/components/button/page";

const NotFoundPage = () => {
    return (
      <div className="flex flex-col  justify-center items-center h-screen">
      <h1 className="text-7xl font-bold mb-8 text-custom-main-color">404</h1>
      <h1 className="text-7xl font-bold mb-8 text-custom-main-color">PAGE NOT FOUND</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
        <p>Please go back to the <a href="/" className="underline font-bold">Home Page</a>.</p>
    </div>
  
    );
  };
  
  export default NotFoundPage;