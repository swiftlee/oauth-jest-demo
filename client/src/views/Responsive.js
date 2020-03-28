import React from 'react';
import '../css/responsive.css';
import '../css/grid.css';

const Responsive = () => {
    return (<div>
        <div className='max-w-md rounded bg-blue-300 myButton'>
            My Button
        </div>

        <div className='cards'>
            <div className="card">ONE</div>
            <div className="card">TWO</div>
            <div className="card">THREE</div>
            <div className="card">FOUR</div>
            <div className="card">FIVE</div>
            <div className="card">SIX</div>
            <div className="card">SEVEN</div>
            <div className="card">EIGHT</div>
            <div className="card">NINE</div>
            <div className="card">TEN</div>
            <div className="card">ELEVEN</div>
            <div className="card">TWELVE</div>
        </div>

    </div>)
};

export default Responsive;
