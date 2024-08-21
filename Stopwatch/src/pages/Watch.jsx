import React, { useState, useEffect } from 'react';

const Watch = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [timer,setTimer] = useState(0);
    const [lapArray, setLapArray] = useState([]);
    let index = 0;

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer + 10))
            }, 10)
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        
    },[isRunning,timer])

    //formating of the time
    function displayTime(timer) {
        let centiseconds = timer%1000/10;
        centiseconds <10 ? centiseconds = "0"+centiseconds : centiseconds;
        let seconds = Math.floor(timer/1000%60);
        seconds <10 ? seconds = "0"+seconds : seconds;
        let minuts = Math.floor(timer/(60*1000)%60);
        minuts <10 && minuts !==0 ? minuts = "0"+minuts : minuts;
        let hours = Math.floor(timer/(60*60*1000)%24);
        hours <10 && hours !==0 ? hours = "0"+hours : hours;
        return (
        <>
            {hours ? hours + ":":""}
            {minuts ? minuts + ":" : ""}
            {seconds}:{centiseconds}
        </>
    )}
    //saving up lap
    function lapClick() {
        index = index+1;
        setLapArray([...lapArray, {"id" : index, "time" : timer}])
    }
    return (
        <div className='min-h-screen bg-gray-400 grid place-items-center'>

            <div className='flex flex-wrap justify-evenly flex-row gap-5 p-3 drop-shadow-2xl bg-white'>

                <div className="buttons gap-2 flex flex-col self-center justify-between">
                    <button onClick={ () => setIsRunning((prevState) => (!prevState))} className="hover:font-bold start">{isRunning ? "Stop" : "Start"}</button>
                    <button onClick={
                        () => {
                            setIsRunning(false);
                            setTimer(0);
                            setLapArray([]);
                        }} className="hover:font-bold reset">Reset</button>
                    <button onClick={lapClick} className="hover:font-bold lap">Lap</button>
                </div>

                <div className="timer flex flex-col self-center justify-between">
                    <h1 className='font-bold text-xl'>{displayTime(timer)}</h1>
                    {lapArray.length ? lapArray.slice(-10).map((lap,idx) => {
                        idx = idx+1
                        return (
                        <h4 key={idx}>Lap {idx} : {displayTime(lap.time)}</h4>
                        )
                    }): ""}
                </div>
            </div>
        </div>
    )
}

export default Watch