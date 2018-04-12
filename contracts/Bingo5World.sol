pragma solidity ^0.4.17;

import "./Util.sol";


contract AccessControl{

    address public newContractAddress;

    event ContractUpgrade(address newContract);

    address public ceoAddress;

    address public cooAddress;

    bool public isOpen;

    modifier onlyCEO(){
        require(msg.sender == ceoAddress);
        _;
    }

    modifier onlyOpen(){
        require(isOpen == true);
        _;
    }

    modifier onlyClose(){
        require(isOpen == false);
        _;
    }
    /// @dev Access modifier for COO-only functionality
    modifier onlyCOO() {
        require(msg.sender == cooAddress);
        _;
    }

    modifier onlyCLevel() {
        require(
            msg.sender == cooAddress ||
            msg.sender == ceoAddress
        );
        _;
    }

    function setCEO(address _newCEO) external onlyCEO {
        require(_newCEO != address(0));

        ceoAddress = _newCEO;
    }

    function setCOO(address _newCOO) external onlyCEO {
        require(_newCOO != address(0));

        cooAddress = _newCOO;
    }
}

contract Bingo5 is AccessControl{

   event Bet(address from, uint64 number, uint price );
   event OnOpen(uint64 magic);
   /**
    * The reciept user buy hold the bet numbers
    */
    struct Ticket{
        // every number is between 0-4,so it takes 3bit(0-7), 8 number will take 24bits ,
        // the head 8bits first 4 bits reserved, last 4 bits  be times(0-15).
        uint32[] numbers;
        uint timestamp;
    }

    /**
     * Record the address who join in current round,will be clear after award open
     */
    address[]  roundsOwner;

    uint public rate;

    uint public price;
    /**
     * the last open blockindex
     */
    uint public lastOpenTimeStamp;


    /**
     * The mapping record the address owned tickets
     */
    mapping ( address => Ticket ) public ticketOwners;


    /**
     * The current award pool
     */
    uint awardpool;


    function _bet(address _from, uint32[] number, uint topay) internal {
        bool isJoin = false;
        for(uint i = 0; i < roundsOwner.length; i++){
            if(roundsOwner[i] == _from){
                isJoin = true;
                break;
            }
        }
        if(!isJoin){
            roundsOwner.push(_from);
        }

        Ticket storage tickets  = ticketOwners[_from];
        if(tickets.timestamp < lastOpenTimeStamp){
            delete tickets.numbers;
        }
        tickets.timestamp = now;
        for(uint j=0; j<number.length; j++){
            tickets.numbers.push(number[j]);
        }

        uint devpart = topay / rate;
        awardpool += topay - devpart;

        ceoAddress.transfer(devpart);
    }

    function _open() internal {

        uint32 magic = _getMagicNumber();
        OnOpen(magic);
        uint[] memory awardowner = new uint[](roundsOwner.length);

        uint total = 0;
        for(uint j = 0; j < roundsOwner.length; j++){
            Ticket storage tickets = ticketOwners[roundsOwner[j]];
            if(tickets.timestamp > lastOpenTimeStamp){
                uint32[] storage numbers = tickets.numbers;
                for(uint k = 0; k < numbers.length; k++){
                    uint number = (numbers[k] & 0x00ffffff);
                    uint times  = (numbers[k] & 0x0f000000) >> 24;
                    uint hited  = Util.getlines(number & magic) * times;
                    total += hited;
                    awardowner[j] = hited;
                }
            }
        }
        uint award = this.balance / total ;

        for(uint l = 0; l < roundsOwner.length; l++){
            uint amount = awardowner[l];
            if(amount != 0){
                address(roundsOwner[l]).transfer(award * amount );
            }
        }
        delete roundsOwner;
        lastOpenTimeStamp = now;
    }

    function _getMagicNumber() internal view returns (uint32){
        uint32 finnal = 0;
        for(uint i = 1; i <= 8; i++){
            bytes32 bhash = sha3(now + i);
            uint32 temp   = (uint32(bhash) % 5 + 1) << ((i - 1) * 3);
            finnal = finnal | temp;
        }
        /* return finnal; */
        return 0x249249;
    }
}

contract Bingo5World is Bingo5{

    function Bingo5World()
        public
    {
        // the creator of the contract is the initial CEO
        ceoAddress = msg.sender;

        // the creator of the contract is also the initial COO
        cooAddress = msg.sender;
        price = 0.02 ether;
        rate  = 500; // will use as 1/rate
    }

    function setPrice(uint pri)
        onlyCOO
        external
    {
        price = pri;
    }

    function setOpen(bool isopen)
        onlyCOO
        external
    {
        isOpen = isopen;
    }

    function setRate(uint r)
        onlyCOO
        external
    {
        rate = r;
    }

    function open()
        onlyCOO
        onlyClose
        external
    {
        _open();
    }

    function getLines(uint32 number,uint32 magic )
        external
        pure
        returns (uint)
    {
        return Util.getlines(number & magic);
    }

    function getToPay(uint32[] numbers)
       public
       view
       returns (uint)
    {
        uint topay = 0;

        for(uint i = 0; i < numbers.length; i++){
            uint time = uint((numbers[i] & 0x0f000000) >> 24);
            topay += time * price;
        }
        return topay;
    }

    function getRoundsOwner()
        public
        view
        returns (address[])
    {
        return roundsOwner;
    }

    function getBalance()
        public
        view
        returns (uint)
    {
        return this.balance;
    }

    function bet(uint32[] numbers)
        onlyOpen
        external
        payable
    {
        uint topay = getToPay(numbers);

        require(msg.value == topay);
        _bet(msg.sender,numbers,topay);
    }
}
