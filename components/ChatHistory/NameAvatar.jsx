import React from 'react';

const NameAvatar = ({ name }) => {
    // const initials = name.split(' ').map(word => word[0]).join('');
    const initials = name.charAt(0);

    return (
        <div>
            <span className='flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white'>
                {initials}
            </span>

        </div>
    );
};

export default NameAvatar;