import React from 'react'
// import images from '../../images/images';
export const Com = (props) => {
    const {comment , comment_username , photo,time} = props.data;

    // console.log(`comment : ${comment}`);
    // console.log(`photo : ${photo}`);
    // console.log(`comment_username : ${comment_username}`);
  return (
    <div className='flex gap-3 mt-2 w-full h-fit'>
        {/* <svg className='w-8 h-8 rounded-full' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
        </svg> */}
        {
            photo? (
                <img className='w-8 h-8 rounded-full' src={photo} alt="" />
            ):(
                <svg className='w-8 h-8 rounded-full overflow-hidden' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                </svg>
            )
        }
        <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment_username}</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-md font-normal text-gray-900 dark:text-white">{comment}</p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
    </div>
)
}
