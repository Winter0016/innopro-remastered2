import React from 'react'
import { useAuth } from '../../context/shopContext'

export const Checkout = () => {
  const {submitorder} = useAuth();
  const {paymentdone} = useAuth();
  const{payingstatus} = useAuth();
  const {useremail,userphone,username,useraddress,usercomment} = useAuth()
  const {setuseremail,setuseraddress,setuserphone,setusercomment,setusername} = useAuth();
  return (
    <>
        <div className='checkout-show'>
          {
            paymentdone ? (
              <h1 className='w-full text-center mt-4 text-2xl text-green-400'>Cảm ơn quý khách! Chúng tôi đã nhận được đơn hàng.</h1>     
            ):(
              <h1 className='w-full text-center mb-2 text-4xl'>Please fill this form to submit your order.</h1>
            )
          }
          <form className=' max-w-3xl bg-yellow-100 m-auto rounded-lg overflow-auto border-4 pb-3 pt-3 pl-2' action="#" onSubmit={(e) => {
            e.preventDefault();
            submitorder();
            }}>
            <div className='flex flex-wrap overflow-hidden pl-4 mt-2  checkout-submit'>
              <div className='flex w-auto overflow-hidden'>
                <div id='icon-container' className='pt-1'>
                  <svg className='icon' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"></path>
                  </svg>
                </div>
                <input id='form-input' className="w-80 focus:outline-none focus:ring-0"type="text"placeholder='Email' value={useremail} onChange={(e) => setuseremail(e.target.value)} required />
              </div> 
              <div className='flex w-auto overflow-hidden'>
                <div id='icon-container' className='pt-1'>
                  <svg className='icon' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path>
                  </svg>
                </div>
                <input id='form-input' className=" w-72 focus:outline-none focus:ring-0"type="text"placeholder='Phone' required value={userphone} onChange={(e) => setuserphone(e.target.value)}/>
              </div>          
            </div>
            <div className='flex flex-wrap overflow-hidden pl-4 mt-2  checkout-submit'>
              <div className='flex w-auto border overflow-hidden'>
                <div id='icon-container' className='pt-1'>
                  <svg className='icon' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path>
                  </svg>
                </div>
                <input id='form-input' className="w-80 focus:outline-none focus:ring-0"type="text"placeholder='Location' value={useraddress} onChange={(e) => setuseraddress(e.target.value)} required />
              </div> 
              <div className='flex w-auto overflow-hidden'>
                <div id='icon-container' className='pt-1'>
                  <svg  className="icon"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path>
                  </svg>
                </div>
                <input id='form-input' className=" w-72 focus:outline-none focus:ring-0"type="text"placeholder='Name' value={username} required onChange={(e) => setusername(e.target.value)} />
              </div>          
            </div>
            <div className='flex flex-wrap pt-4 pl-4  overflow-hidden checkout-submit'>
              <div className='flex w-auto overflow-hidden'>
                <div id='icon-container' className='pt-1 pl-1'>
                  <svg  className="icon"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path>
                  </svg>
                </div>
                <textarea className='rounded-lg w-96 focus:outline-none focus:ring-0' id="form-input" rows="4" placeholder="Enter your comment here..." onChange={(e)=> setusercomment(e.target.value)}></textarea>
              </div>           
            </div>
            <div className='flex flex-wrap pt-3 pl-2  overflow-hidden checkout-submit'>
              <button type="submit" className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer" disabled={payingstatus} > {payingstatus ? "Đang xử lý...." : "Đặt hàng"}</button>        
              <div className="flex justify-center items-center ml-9 sm:mb-1">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" value="" className="w-6 h-6 border border-gray-300 rounded bg-gray-50" required />
                </div>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Please confirm you're not G4y?</label>
              </div>
            </div>            
          </form>
        </div>
    </>
  )
}
