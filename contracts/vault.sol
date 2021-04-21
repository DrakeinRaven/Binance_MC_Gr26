// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault{
    mapping(address => string[]) internal _uploadedFiles;
    mapping(string => address[]) internal _fileDelegates;
    mapping(address => string[]) internal _delegatedFiles;
    mapping(string => string) internal _fileNames;
    mapping(string => address) internal _fileUploader;
    mapping(string => uint256) internal _downloadTime;

    
    
    function setUploadedFiles(address account, string memory fileHash) internal{
        _uploadedFiles[account].push(fileHash);
    }

    function setFileDelegates(string memory fileHash, address[] memory delegates) internal{
        _fileDelegates[fileHash] = delegates;
    }

    function setDelegatedFiles(string memory fileHash, address[] memory delegatedAccounts) internal{
        for(uint i = 0; i < delegatedAccounts.length; i++){
            _delegatedFiles[delegatedAccounts[i]].push(fileHash);
        }
    }

    function setFileName(string memory fileHash, string memory fileName) internal{
        _fileNames[fileHash] = fileName;
    }

    function setFileUploader(string memory fileHash, address account) internal{
        _fileUploader[fileHash] = account;
    }

    function setDownloadTime(string memory fileHash, uint256 dTime) internal{
        _downloadTime[fileHash] = dTime;
    }


    //////////////////////////////////////////////////

    function getUploadedFiles(address account) internal view returns(string[] memory){
        return _uploadedFiles[account];
    }

    function getDelegates(string memory fileHash) internal view returns(address[] memory){
        return _fileDelegates[fileHash];
    }

    function getFileName(string memory fileHash) internal view returns(string memory){
        return _fileNames[fileHash];
    }

    function getFileUploader(string memory fileHash) internal view returns(address){
        return _fileUploader[fileHash];
    }

    function getDelegatedFiles(address account) internal view returns(string[] memory){
        return _delegatedFiles[account];
    }


    ///////////////////////////////////////////////////////////


    function uploadFile(string memory fileHash, string memory fileName, address[] memory delegates, uint256 dTime) public returns(bool){
        setUploadedFiles(msg.sender, fileHash);
        setFileName(fileHash, fileName);
        setFileUploader(fileHash,msg.sender);
        setDownloadTime(fileHash, dTime);
        
        if(delegates.length > 0){
            setFileDelegates(fileHash, delegates);
            setDelegatedFiles(fileHash, delegates);
        }

        return true;
    }

    function myFile(uint256 index) public view returns(string memory){
        return getUploadedFiles(msg.sender)[index];
    }

    function myFilesLength() public view returns(uint256){
        return getUploadedFiles(msg.sender).length;
    }

    function myFileName(string memory fileHash) public view returns(string memory){
        return getFileName(fileHash);
    }

    function myFileDelegate(string memory fileHash, uint256 index) public view returns(address){
        return getDelegates(fileHash)[index];
    }

    function myFileDelegatesLength(string memory fileHash) public view returns(uint256){
        return getDelegates(fileHash).length;
    }

    function myDelegatedFile(uint256 index) public view returns(string memory){
        return getDelegatedFiles(msg.sender)[index];
    }

    function myDelegatedFilesLength() public view returns(uint256){
        return getDelegatedFiles(msg.sender).length;
    }

    function fileUploader(string memory fileHash) public view returns(address){
        return getFileUploader(fileHash);
    }

    function isFileDownloadable(string memory fileHash) public view returns(bool){
        if(msg.sender == getFileUploader(fileHash)){
            return true;
        }
        if(_downloadTime[fileHash] < block.timestamp){
            return true;
        }
        return false;
    }



}