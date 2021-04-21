async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

    }else{
        alert('Please install MetaMask!');
    }
}


// Set up web and smart contract
async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    await getMyFiles();
    window.contract.defaultAccount = await getCurrentAccount();
    console.log(window.contract.defaultAccount);
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

const ethereumButton = document.querySelector('#enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  ethereumButton.innerHTML = account;
  
}


load();