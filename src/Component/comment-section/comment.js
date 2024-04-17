import React, { useEffect, useState } from 'react';
import { Com } from './com';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';

export const Comment = () => {
    const { commentlist } = useAuth();
    const {loadingpage} = useAuth();
    const {setusercomment,usercomment} = useAuth(); 
    const {submitcomment} = useAuth();

    const clearAllCookies1 = () => {
        // console.log(`clearing all cookies`)
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookieParts = cookies[i].split(':');
            const cookieName = cookieParts[0];
            if (cookieName === 'accesscomment') {
              document.cookie = `${cookieName}:; expires=, 01 Jan 1970 00:00:00 GMT; path=/`;
            }      
        }
        // console.log(`cleared cookies : ${document.cookie} here`);
      };
    // for (const key in commentlist) {
    //     console.log(commentlist[key]);
    // }

    const commentsArray = Object.entries(commentlist);

    // Sort the array based on timestamps
    // commentsArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    // Convert the sorted array back to an object
    // const sortedCommentlist = Object.fromEntries(commentsArray); // use for method2
    // console.log(`sortedCommentlist: ${JSON.stringify(sortedCommentlist)}`);
    // const sortedcommentlist2 = Object.entries(sortedCommentlist); // use for method 1
    // console.log(`sortedcommentlist2 : ${JSON.stringify(sortedcommentlist2)}`);


    //Method 1:
        let newcommentlist2 = [];   
        for(const [key,value] of commentsArray){
            let entries2 = Object.entries(value);
            for( const [key,value] of entries2){
                newcommentlist2.unshift(value);
            }
        }
        if(newcommentlist2){
            newcommentlist2.sort((a,b) => new Date(a.time) - new Date(b.time));
        }
        // console.log(`newcommentlist2: ${JSON.stringify(newcommentlist2)}`);

    //
    //Method 2:
        // let newcommentlist = [];

        // for( var i in sortedCommentlist){
        //     for(var j in sortedCommentlist[i]){
        //         newcommentlist.push(sortedCommentlist[i][j]);
        //     }
        // }

        // newcommentlist.sort((a, b) => {
        //     return new Date(a.time) - new Date(b.time);
        // });
        // console.log(`newcommentlist: ${JSON.stringify(newcommentlist)}`);
    //

    const [senderror,setsendserror] = useState('');
    const [isending,setissending] = useState(false);
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('accesscomment:'));
    const cartItemsString = cookieValue ? cookieValue.substring(cookieValue.indexOf(':') + 1) : null;
    const sendcomment = async () =>{
        setissending(true);
        try{
            if(cartItemsString == null){
                throw new Error("Bạn cần mua hàng để comment.")
            }
            await submitcomment();
            setsendserror("");
        }catch(err){
            setsendserror(err.message);
        }
        await clearAllCookies1();
        setissending(false);
    }

    return (
        <div className='comment-container pt-20 pb-5'>
            <form onSubmit={(e) => {e.preventDefault();sendcomment()}} id='enter-comment' className='bg-yellow-100' action="#">
                <h2 className='mb-2 ml-2'>TÊN: {cartItemsString? cartItemsString : "tên bạn sẽ được tự động điền sau khi mua hàng"} </h2>
                <div className='flex w-auto'>
                    <div   div id='icon-container' className='pt-1 pl-1'>
                        <svg  className="icon"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path>
                        </svg>
                    </div>
                    <textarea className='rounded-lg focus:outline-none focus:ring-0' id="form-input" rows="4" placeholder={cartItemsString? "Hãy điền comment của bạn(1 lần gửi)" : "Bạn cần mua hàng để comment(mỗi lần)"} value={usercomment} onChange={(e)=> setusercomment(e.target.value)}></textarea>
                </div>
                {setsendserror && <h1 className=' text-red-700 mt-2 mb-2 text-xl'>{senderror}</h1>}
                <button type="submit" className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer" disabled={isending} > {isending ? "Đang gửi" : "Gửi"}</button>        
            </form>
            <div id='mycomment' className="gap-1">
                {
                    loadingpage ? (
                        <div className="product-loading">
                            <div className="tiktok-spinner">
                                <div className="ball red"></div>
                                <div className="ball blue"></div>
                            </div>
                        </div>
                    ):(
                        <>
                            {
                                newcommentlist2.map((mycomment) => (
                                    <Com key={mycomment.time} data={mycomment} />
                                ))
                            }                          
                        </>
                    )
                }
            </div>
        </div>
    );
};
