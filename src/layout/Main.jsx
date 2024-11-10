import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const Main = () => {
    return (
        <div className='max-w-5xl mx-auto'>
            <Header/>
           <Outlet/> 
        </div>
    );
};

export default Main;