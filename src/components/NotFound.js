import React from 'react';
import Keyboard from './Keyboard'

export default function NotFound ()  {
    return (
        <div className="container">
            <h2>404: Page Not Found</h2>
            <div>Please redirect to 
                <a href="/" className="btn  btn-lg active" role="button">home</a>
            </div>
            <Keyboard/>
        </div>
    )
}