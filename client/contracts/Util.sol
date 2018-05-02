pragma solidity ^0.4.17;

library Util{

    function getlines(uint number) public pure returns (uint){
        uint8[8] memory lines = [
            uint8(0x94),
            uint8(0x42),
            uint8(0x29),
            uint8(0xe0),
            uint8(0x18),
            uint8(0x07),
            uint8(0x81),
            uint8(0x24)];
        uint8 mask = 0;
        for(uint i = 0; i < 8; i++){
            uint j = (number >> (i * 3)) & 0x07;
            mask = mask | ( (j > 0 ? 1 : 0) << i );
        }
        uint8 count = 0;
        for(uint k=0; k<lines.length; k++ ){
            count += (lines[k] & mask == lines[k] )  ? 1 : 0;
        }
        return count;
    }

}
