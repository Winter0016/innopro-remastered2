import React from 'react';

export const Employee = (props) => {
    const { firstname, lastname, _id } = props.data;
    return (
        <tr id='mytr' className='border-4'>
            <td id='myfuckingtable' className='border-4'>{firstname}</td>
            <td id='myfuckingtable' className='border-4'>{lastname}</td>
            <td id='myfuckingtable' className='border-4'>{_id}</td>
        </tr>
    );
}