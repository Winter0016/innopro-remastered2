import React from 'react';
import { Com } from './com';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';

export const Comment = () => {
    const { commentlist } = useAuth();

    return (
        <div className='' style={{ backgroundImage: `url(${images.commentbackground})`, backgroundSize: 'cover'}}>
            <div className='comment-container pt-4 pl-5'>
                <div id='mycomment' className="mt-5 gap-1">
                    {commentlist.map((commentsObject, index) => (
                        <div className='h-fit w-full' key={index}>
                            {Object.values(commentsObject).map((comment, subIndex) => (
                                <Com key={`${index}_${subIndex}`} data={comment} />
                            ))}
                        </div>
                    ))}
                </div>
                <img id='mycomment-img' className='mt-5' src={images.ronaldoquote} alt="" />
            </div>
        </div>
    );
};
