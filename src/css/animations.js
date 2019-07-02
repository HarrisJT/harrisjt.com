import {keyframes} from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to { 
    opacity: 1;
  }  
`;

const moveRight = keyframes`
  from { 
    transform: translateX(-15px);
  }
  to { 
    transform: translateY(0);
  } 
`;

const moveUp = keyframes`
  from { 
    transform: translateY(10px);
  }
  to { 
    transform: translateY(0);
  }
`;

export {fadeIn, moveRight, moveUp};
