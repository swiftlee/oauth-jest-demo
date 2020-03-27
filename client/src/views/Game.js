import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Redirect} from "react-router";
import {ItemMap} from "../utils/item";

const Game = (props) => {
    const [gameData, setGameData] = useState({});
    const [respFinished, setRespFinished] = useState(false);

    async function getGameData(props) {
        const resp = await axios.get('/gameData'); // make sure user is auth on backend
        if (!resp.data.authFailure) {
            console.log(resp.data.gameData);
            setGameData(resp.data.gameData);
        } else {
            props.setAuth(false);
            props.setUser({});
        }
        setRespFinished(true);
    }

    useEffect(() => {
        getGameData(props);
    }, []);

    return respFinished ? <GameData {...props} gameData={gameData} user={JSON.parse(document.cookie)}/> : null;
};

const GameData = (props) => {
    const [inventory, setInventory] = useState([]);
    const [invSelectionFinished, setInvSelectionFinished] = useState(false);
    console.log(props.gameData, invSelectionFinished);
    console.log('comparison: ', (props.gameData !== null || invSelectionFinished));
    return (
        <div>
            {(props.gameData !== null && props.auth || invSelectionFinished )?
                <GameCanvas gameData={props.gameData} inventory={inventory}/> :
                <InventoryPicker setFinished={setInvSelectionFinished} setInventory={setInventory}/>}
        </div>
    )
};

const GameCanvas = (props) => {

    useEffect(() => {
        //   props.setGame(new Game(props.gameData.gameState, props.user.name, props.inventory))
    }, [props.gameData]);

    return (
        <div className='flex justify-between w-3/4 m-auto flex-wrap bg-gray-400 mt-6 p-6'>
            <PlayerInventory playerInventory={props.inventory}/>
        </div>
    )
};

const InventoryPicker = (props) => {
    const [selections, setSelections] = useState([]);
    return (
        <div className='flex w-full content-center bg-gray-200 transform mt-32'>
            <div className="font-bold text-xl mb-2 text-center flex-row">SELECT 3 ITEM TYPES</div>
            {/* FIRST ITEM SELECTION */}
            <ItemSelector idx={1} selections={selections} setSelections={setSelections}/>
            {/* SECOND ITEM SELECTION */}
            <ItemSelector idx={2} selections={selections} setSelections={setSelections}/>
            {/* THIRD ITEM SELECTION */}
            <ItemSelector idx={3} selections={selections} setSelections={setSelections}/>
            <div className='mt-6 float-right text-2xl bg-gray-400 rounded-b-lg'
                 onClick={props.setInventory(selections)}>START GAME
            </div>
        </div>)
};

const ItemSelector = (props) => {
    return (
        <div className='flex flex-wrap flex-row w-1/3 px-4 bg-teal-500 rounded'>
            <div className='w-1/3 hover:font-bold hover:scale-105 transition duration-500 ease-in-out px-2 bg-teal-300'
                 onClick={() => {
                     props.setSelections(['SWORD', ...props.selections.slice(props.idx)])
                 }}>
                <p className='mb-6'>Sword</p>
                <img className='rounded-full w-10/12' src={ItemMap['SHORTSWORD'].image} alt='Select for random sword.'/>
            </div>
            <div className='w-1/3 hover:font-bold hover:scale-105 transition duration-500 ease-in-out px-2 bg-teal-300'
                 onClick={() => {
                     props.setSelections(['BOW', ...props.selections.slice(props.idx)])
                 }}>
                <p className='mb-6'>Bow</p>
                <img className='rounded-full w-10/12' src={ItemMap['BOW'].image} alt='Select for bow.'/>
            </div>
            <div className='w-1/3 hover:font-bold hover:scale-105 transition duration-500 ease-in-out px-2 bg-teal-300'
                 onClick={() => {
                     props.setSelections(['SHIELD', ...props.selections.slice(props.idx)])
                 }}>
                <p className='mb-6'>Shield</p>
                <img className='rounded-full w-10/2' src={ItemMap['SHIELD'].image} alt='Select for shield.'/>
            </div>
        </div>
    )
};

const PlayerInventory = () => {
    return (<div className='align-bottom w-full bg-teal-500 h-48'>

    </div>)
};

export default Game;
