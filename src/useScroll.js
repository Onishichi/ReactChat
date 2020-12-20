import { useState } from "react";

export const useScroll=() => {
	const [ scrollPosition, setScrollPosition ] = useState( { horizontal: 0, vertical: 0 } );
    
	const setScroll = (target,x,y) =>
	{  
		target.scrollTo( x, y ); 
		setScrollPosition( { horizontal: x, vertical: y } );
	};
    
	return [scrollPosition,setScroll];
};
