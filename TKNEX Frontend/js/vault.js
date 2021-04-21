const ipfs = window.IpfsHttpClient({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https'
});

var a = document.getElementById("info");
var inpFile;
var inpFileName;
var fileHash;
var inpFileSize;
var dTime;

// async function loadWeb3() {
//     if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);

//     } else {
//         alert('Please install MetaMask!');
//     }
// }

async function loadContract() {
    // set ABI
    var abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                }
            ],
            "name": "fileUploader",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                }
            ],
            "name": "isFileDownloadable",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "myDelegatedFile",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "myDelegatedFilesLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "myFile",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "myFileDelegate",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                }
            ],
            "name": "myFileDelegatesLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                }
            ],
            "name": "myFileName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "myFilesLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fileHash",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fileName",
                    "type": "string"
                },
                {
                    "internalType": "address[]",
                    "name": "delegates",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256",
                    "name": "dTime",
                    "type": "uint256"
                }
            ],
            "name": "uploadFile",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    //set contract address
    var contractAddress = '0x7aB549C0e38eAd805c03A8FB9A539F42526CeD93';

    return await new window.web3.eth.Contract(abi, contractAddress);
}

// Set up web and smart contract
// async function load() {
//     await loadWeb3();
//     window.contract = await loadContract();
//     await getMyFiles();
//     window.contract.defaultAccount = await getCurrentAccount();
//     console.log(window.contract.defaultAccount);
// }

// async function getCurrentAccount() {
//     const accounts = await window.web3.eth.getAccounts();
//     return accounts[0];
// }

// const ethereumButton = document.querySelector('#enableEthereumButton');
// const showAccount = document.querySelector('.showAccount');

// ethereumButton.addEventListener('click', () => {
//     getAccount();
// });

// async function getAccount() {
//     const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts'
//     });
//     const account = accounts[0];

//     ethereumButton.innerHTML = account;

// }



// load();


// Validating the file to upload
const filetoupload = document.getElementById('filetoupload');

filetoupload.addEventListener('change', (event) => {
    event.preventDefault();

    if (event.target.files[0].size > 50000000) {
        alert(`${filetoupload.files[0].name} is too big. Max size is 50MB.`);

        return;
    }

    const file = event.target.files[0];
    inpFileName = file.name;
    inpFileSize = file.size;
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {

        inpFile = reader.result;
        // console.log(inpFile);
        // console.log(inpFileName);
    }
});


// Validating the download time period
document.getElementById("dTime").addEventListener("change", (event) => {
    var localTime = event.target.value;
    var utcTime = new Date(localTime);

    if (utcTime < new Date()) {
        alert("Select a date/time in the future!");
        return;
    } else {
        dTime = Math.floor(utcTime.getTime() / 1000);
        console.log(dTime);

    }
});


// Submitting the form
const fileForm = document.getElementById("fileForm");


fileForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Form submitted!");
    var delegate1 = fileForm.elements[2].value;
    var delegate2 = fileForm.elements[3].value;
    var delegate3 = fileForm.elements[4].value;

    var delegates = [delegate1, delegate2, delegate3];


    fileHash = await ipfs.add(inpFile);

    const account = await getCurrentAccount();
    const result = await window.contract.methods.uploadFile(fileHash.path, inpFileName, delegates, dTime).send({
        from: account
    });
    if (result) {
        alert('File upload successful');
    } else {
        alert('Unable to upload file.');
        return;
    }

    fileForm.reset()

    await getMyFiles();


});




// function to download file from IPFS
function downloadFile(file) {
    var link = document.getElementById("downloadLink");
    link.setAttribute("download", file);
    link.click();
}

//var fileUrl => `https://ipfs.io/ipfs/${fileHash}`;

var myFilesTag = document.getElementById("myFiles").innerHTML = "";
myFilesTag += "<div>";

var myDelegatedTags = document.getElementById("delegatedFiles").innerHTML = "";
myDelegatedTags += "<div>";


function getMyFiles() {

    // Get my uploaded files
    window.contract.methods.myFilesLength().call({
        from: window.contract.defaultAccount
    }).then(function (myFilesLen) {
        console.log(myFilesLen);
        for (var i = 0; i < myFilesLen; i++) {
            window.contract.methods.myFile(i).call({
                from: window.contract.defaultAccount
            }).then(function (myFileHash) {
                console.log(myFileHash);
                window.contract.methods.myFileName(myFileHash).call({
                    from: window.contract.defaultAccount
                }).then(function (myFName) {
                    myFilesTag += "<p>" + myFName + "</p>";
                });

                window.contract.methods.myFileDelegatesLength(myFileHash).call({
                    from: window.contract.defaultAccount
                }).then(function (myFileDelegatesLen) {
                    myFilesTag += "<ul>";
                    console.log(myFileDelegatesLen);
                    for (var j = 0; j < myFileDelegatesLen; j++) {
                        window.contract.methods.myFileDelegate(myFileHash, j).call({
                            from: window.contract.defaultAccount
                        }).then(function (myFDelegate) {
                            myFilesTag += "<li>" + myFDelegate + "</li>";
                        });
                    }
                    myFilesTag += "</ul>";

                });

            });

        }

        myFilesTag += "</div>";
    });


    // Get my delegated files
    window.contract.methods.myDelegatedFilesLength().call({
        from: window.contract.defaultAccount
    }).then(function (myDelegatedFiles) {
        console.log(myDelegatedFiles);
        for (var k = 0; k < myDelegatedFiles; k++) {
            window.contract.methods.myDelegatedFile(k).call({
                from: window.contract.defaultAccount
            }).then(function (myDelegatedF) {
                window.contract.methods.myFileName(myDelegatedF).call({
                    from: window.contract.defaultAccount
                }).then(function (delegatedFN) {
                    window.contract.methods.fileUploader(myDelegatedF).call({
                        from: window.contract.defaultAccount
                    }).then(function (fileUploader) {
                        myDelegatedTags += "<p>" + delegatedFN + ": " + fileUploader + "</p>";
                    });
                });
            });
        }
    });


}





// async function getMyFiles(){


//     const account = getCurrentAccount();

//     // Get my uploaded files
//     const myFilesLen = await window.contract.methods.myFilesLength().call();
//     console.log(myFilesLen);
//     for(var i=0; i < myFilesLen; i++){
//         const myFileHash = await window.contract.methods.myFile(i).call();
//         const myFName = await window.contract.methods.myFileName(myFileHash).call();
//         myFilesTag += "<p>" + myFName + "</p>";

//         const myFileDelegatesLen = await window.contract.methods.myFileDelegatesLength(myFileHash).call();
//         myFilesTag += "<ul>";
//         for(var j=0; j < myFileDelegatesLen; j++){
//             const myFDelegate = await window.contract.methods.myFileDelegate(myFileHash, j).call();
//             myFilesTag += "<li>" + myFDelegate + "</li>";
//         }
//         myFilesTag += "</ul>";
//     }


//     myFilesTag += "</div>";


//     // Get my delegated files
//     const myDelegatedFiles = await window.contract.methods.myDelegatedFilesLength().call();
//     console.log(myDelegatedFiles);
//     for(var k=0; k < myDelegatedFiles; k++){
//         const myDelegatedF = await window.contract.methods.myDelegatedFile(k).call();
//         const delegatedFN = await window.contract.methods.myFileName(myDelegatedF).call();
//         const fileUploader = await window.contract.methods.fileUploader(myDelegatedF).call();
//         const isFileDowndable = await window.contract.methods.isFileDowndable(myDelegatedF).call();
//         myDelegatedTags += "<p>" + delegatedFN + ": " + fileUploader + "</p>";
//     }

// }









// async function getTweets() {
//     updateStatus('fetching All Tweets...');
//     const tweetsNumber = await window.contract.methods.getTotalTweet().call();

//     for (i = 0;i < tweetsNumber;i++){
//         var result1 = await window.contract.methods.getTweetDetail(i).call();
//         a.innerHTML = a.innerHTML+"<h5>" + "TweetID: "+result1[0]+" " + "Name: " + result1[1] + " Content: " + result1[2] + "</h5>";

//     }

//     updateStatus(`All Tweets No.: ${tweetsNumber}`);
// }


// async function changeCoolNumber() {
//     updateStatus(`Updating LonelyTwitter ...`);
//     const account = await getCurrentAccount();
//     const coolNumber = await window.contract.methods.createTweet(document.getElementById("name").value,document.getElementById("content").value).send({ from: account });
//     updateStatus('Updated.');
// }


// function updateStatus(status) {
//     const statusEl = document.getElementById('status');
//     statusEl.innerHTML = status;
//     console.log(status);
// }



/*################################
Choose File
################################*/

$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass('active');
        $("#noFile").text("No file chosen...");
    } else {
        $(".file-upload").addClass('active');
        $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
});