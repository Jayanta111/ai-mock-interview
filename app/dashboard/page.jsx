import React from 'react'
import Header from './_components/Header'
import AddNewInterview from './_components/AddNewInterview';
function page() {
  return (
    <div>
        <Header/>
        <div className='p-10'>
 <h1 className='font-bold text-2xl'>Dashboard</h1>
   <h2 className='text-gray-700'>Create and start Your Mock Interview</h2>
<div className='grid grid-cols-1 md:grid-cols-3 my-5'>
<AddNewInterview/>

</div>
    </div>
    </div>
  )
}

export default page