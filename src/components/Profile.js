import React from 'react';


const Profile = () => {
    const userID = localStorage.getItem("username")
    return (
        <>
            <div className='fs-1 text-center mt-4'>
                Hello 👋 , <span className='text-success'> {userID && userID}   </span>
            </div>
            <div className='fs-3 text-center mb-4'>
                Welcome to Code.com!! <span className='text-info'>(^_^)</span> 
            </div>
        </>
    )
}


export default Profile;
