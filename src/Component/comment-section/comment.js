import React from 'react';
import { Com } from './com';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';

export const Comment = () => {
    const { commentlist } = useAuth();
    const {loadingpage} = useAuth();

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
        newcommentlist2.sort((a,b) => new Date(b.time) - new Date(a.time));
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

    return (
        <div className='' style={{ backgroundImage: `url(${images.commentbackground})`, backgroundSize: 'cover'}}>
            <div className='comment-container pt-4 pl-5'>
                <div id='mycomment' className="mt-5 gap-1">
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
                <img id='mycomment-img' className='mt-5' src={images.ronaldoquote} alt="" />
            </div>
        </div>
    );
};
