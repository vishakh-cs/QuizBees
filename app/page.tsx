import React from 'react';
import Link from 'next/link';

   function Page() {
  const backgroundImageUrl = 'https://reallygooddesigns.com/wp-content/uploads/2021/07/TRAVELING-Children-Book-Illustration-examples.jpg';

  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
       <Link href="/Master">
      <button type="button" className=" w-[200%] text-gray-900 bg-gradient-to-r from-rose-200 via-red-600
       to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
        focus:ring-red-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 
        text-center me-2 mb-2">Master</button>
        </Link>
       <Link href="/Student">
      <button type="button" className=" w-[200%] text-gray-900 bg-gradient-to-r from-blue-200 via-blue-400
       to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
        focus:ring-blue-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 
        text-center me-2 mb-2">Student</button></Link>
    </div>
  );
};

export default Page;
