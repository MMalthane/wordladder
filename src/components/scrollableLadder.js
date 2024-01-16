import React, {useRef, useEffect} from 'react';
import '../App.css';


const ScrollableWordLadder = (props) => {
        const { wordLadder, onScroll } = props;
    
        const ref = useRef();
    
        useEffect(() => {
        const div = ref.current;
        console.log("Div is ", div);
        if (div) {
            div.addEventListener("scroll", onScroll);
        }
        }, [onScroll, wordLadder]);
    
        return (
        <div className="scrollableContainer" ref={ref}>
            { wordLadder}
        </div>
        );
    }
export default ScrollableWordLadder;