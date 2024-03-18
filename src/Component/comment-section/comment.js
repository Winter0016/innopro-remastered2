import React from 'react';
import { Com } from './com';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';

export const Comment = () => {
    const { commentlist } = useAuth();

    // for (const key in commentlist) {
    //     console.log(commentlist[key]);
    // }

    const commentsArray = Object.entries(commentlist);

    // Sort the array based on timestamps
    commentsArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    // Convert the sorted array back to an object
    const sortedCommentlist = Object.fromEntries(commentsArray);

    let newcommentlist = [];

    for( var i in sortedCommentlist){
        for(var j in sortedCommentlist[i]){
            newcommentlist.push(sortedCommentlist[i][j]);
        }
    }

    newcommentlist.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
    });

    console.log(`newcommentlist: ${JSON.stringify(newcommentlist)}`);
    

    return (
        <div className='' style={{ backgroundImage: `url(${images.commentbackground})`, backgroundSize: 'cover'}}>
            <div className='comment-container pt-4 pl-5'>
                <div id='mycomment' className="mt-5 gap-1">
                    {
                        newcommentlist.map((mycomment) => (
                            <Com data={mycomment} />
                        ))
                    }
                </div>
                <img id='mycomment-img' className='mt-5' src={images.ronaldoquote} alt="" />
            </div>
        </div>
    );
};
