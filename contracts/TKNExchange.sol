// SPDX-License-Identifier: MIT

//pragma solidity ^0.5.0;
pragma solidity >=0.5.0 <=0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/IERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";



contract TKNExchange{
    //IERC20 public token;
    
    
    function sendEther() external payable{
        
    }
    
    function retrieveEtherBalance() external view returns(uint256){
       // return address(this).balance;
    }
    //transfering ether to another address
   function transferEther(address payable recipient) external payable{
      recipient.transfer(msg.value);
  }
  
   function retrieveEtherBalance(address _recipient) external view returns(uint256){
        return address( _recipient).balance;
    }
    
    function swapEtherWithERC20(address _ERC20TokenAddress) external payable{
        uint256 amoutToBuy = msg.value;
        IERC20(_ERC20TokenAddress).transfer(msg.sender, amoutToBuy);
        
    }
    
    //function swapERC20WithEther(){}
    //sends ether and receives ERC20 _ERC20TokenAddress
    //it assumes that this contract already has some ether in its wallet
    //the approve function must first be called from the ERC20 token contract
    //before the transferFrom function will work
    //@_ERC20TokenAddress, the address of the ERC20 token
    //@_recipient, the ether address of the recipient
    //@amount, the amount of ERC20 tokens to send and the recipient address gets the equivalent ether
    function swapERC20WithEther(address _ERC20TokenAddress, address payable _recipient, uint256 amount) external payable{
       //IERC20(_ERC20TokenAddress).approve(address(this), amount);
       //retrieve the user's allowance
       uint256 allowance = IERC20(_ERC20TokenAddress).allowance(msg.sender, address(this));
       //require that the amount is less than the allowance
       require(amount <= allowance, "The transfer amount exceeds allowance. You need to approve this transaction in your ERC20 contract");
        IERC20(_ERC20TokenAddress).transferFrom(msg.sender, address(this), amount);
        _recipient.transfer(amount);
    } 
    
    //function swapERC20WithERC20(){}
    //the user sends an ERC20 and receives another ERC20 token in return
    //the approve function must be called in the user's ERC20 token contract
    //before the transferFrom function can work
    //@_ERC20TokenAddress, the user's ERC20 token address
    //@amount,the amount you want to transfer from the user balance
    //to get the correcsponding ERC20 token in return
   function swapERC20WithERC20(address _ERC20TokenAddress, address _ERC20ExchTokenAddress, uint256 amount) external{
       //IERC20(_ERC20TokenAddress).approve(address(this), amount);
       //retrieve the user's allowance
       uint256 allowance = IERC20(_ERC20TokenAddress).allowance(msg.sender, address(this));
       //require that the amount is less than the allowance
       require(amount <= allowance, "The transfer amount exceeds allowance. You need to approve this transaction in your ERC20 contract");
        IERC20(_ERC20TokenAddress).transferFrom(msg.sender, address(this), amount);
       // _recipient.transfer(amount);
         IERC20(_ERC20ExchTokenAddress).transfer(msg.sender, amount);
    } 
    
    
    //function addLiquidity(){}
    //we will add an ether along with a correcsponding ERC20 token
    //we must ensure that the amount of ether is equal amount of erc20 token
    function addLiquidity(address payable ethAddress, address _ERC20TokenAddress, uint256 ethAmount, uint256 _ERC20Amount) external payable{
            
    }
    
    //function retrieveLiquidity(){}
}
