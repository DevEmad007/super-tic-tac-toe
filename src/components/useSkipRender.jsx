import React,{ useEffect,useRef } from 'react';

const useSkipRender = (call,dependency) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        //skips first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        call();
    },[ dependency ]);

};


export default useSkipRender;
