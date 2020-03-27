import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Redirect} from "react-router";

export async function getUser(props, setRespFinished) {
    const resp = await axios.get('/account');
    if (!resp.data.authFailure) {
        props.setAuth(true);
        props.setUser(resp.data.user);
        document.cookie = JSON.stringify(resp.data.user);
    } else {
        props.setAuth(false);
        props.setUser({});
        document.cookie = null;
    }
    setRespFinished(true);
}

const Account = (props) => {
    const [respFinished, setRespFinished] = useState(false);
    useEffect(() => {
        getUser(props, setRespFinished);
    }, []);

    return respFinished ? <User {...props}/> : null;
};

const User = (props) => {
    if (props.auth) {
        return <div className='flex justify-center mt-64'>
            <div
                className="max-w-sm rounded overflow-hidden shadow-lg transition duration-500 ease-in-out hover:bg-teal-300 bg-teal-500 hover:text-gray-900 text-white hover:shadow-2xl transform hover:-translate-y-1 hover:scale-110">
                <img src='https://i.imgur.com/dYcYQ7E.png' className='w-full'/>
                <div className='flex justify-center'>
                    <img className="w-1/4 rounded-full border-solid border-white border-2 -mt-12 shadow-md"
                         src={props.user.picture} alt="No image found."/></div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.user.name}</div>
                    <p className="text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                        perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className="px-6 py-4">
                <span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
                </div>
            </div>
        </div>;
    } else
        return <Redirect to={'/'}/>;
};

export default Account;
