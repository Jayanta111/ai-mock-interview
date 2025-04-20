import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function Page() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
          {/* Image with bottom overlay text */}
          <div className="relative md:col-span-3">
            <img
              src="Login.jpg"
              className="rounded w-full h-full object-cover"
              alt="Login"
            />
            <div className="absolute bottom-0 left-0 right-0 text-gray-950 px-4 py-3 rounded-b">
              <h1 className="text-lg font-semibold text-center">
                Welcome Back! 
                
              </h1>
              <p className='text-center '>Lets Creak The Interview </p>
            </div>
          </div>

          {/* Sign-in form */}
          <div className="md:col-span-1">
            <div className="max-w-lg md:max-w-none">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
