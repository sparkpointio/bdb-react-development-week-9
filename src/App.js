import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const address = "0x88A14AF453b14070B9B943eea32bf3F534dFa01a"
    const urlETH = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`
    const urlERC20 = `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`

    const [txData, setTxData] = useState([])
    const [txErcData, setTxErcData] = useState([])
    const [addressHasError, setAddressHasError] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [isActiveBtn, setIsActiveBtn] = useState(1)

    const fetchRopstenTxs = async () => {
        setIsActiveBtn(1)

        await axios.get(urlETH).then(res => {
            setTxData(res.data)
        })
    }

    const fetchRopstenERC20Txs = async () => {
        setIsActiveBtn(2)

        await axios.get(urlERC20).then(res => {
            setTxErcData(res.data)

        })
    }

    const search = (e) => {
        e.preventDefault()
        let data = document.getElementById("addressText").value
        let regex = /^0x[a-fA-F0-9]{40}$/i
        
        if (data !== "") {
            if (regex.test(data)) {
                setIsSearched(true)
                setAddressHasError(false)
                fetchRopstenTxs()
            } else {
                setIsSearched(false)
                setAddressHasError(true)
            }
        } else {
            setIsSearched(false)
            setAddressHasError(true)
        }
    }

    const fetchTransaction = (type) => {
        (type === 1) ? fetchRopstenTxs() : fetchRopstenERC20Txs()
    }

    return (
        <div className="app h-100">
            <div className="container h-100">
                <div className={"d-flex justify-content-center align-items-center " + (!isSearched ? "h-100" : "")}>
                    <div className="app-content text-center">
                        <h2 className="font-bold mb-1 light-black">Ropsten Test Network Explorer</h2>
                        <p className="font-thin font-italic mb-4 light-grey">Check out the transactions on the Ropsten Test Network by any given address</p>
                        <form onSubmit={search}>
                            <div className="d-flex align-items-center w-100">
                                <input type="text" id="addressText" className={"app-input w-100 " + (addressHasError ? "error" : "")} placeholder="Enter address" />
                                <button className="app-btn" type="submit">SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                {isSearched && (
                    <div className="d-flex justify-content-center align-items-center">
                        <button className={"app-trans-btn mx-2 px-4 py-1 " + (isActiveBtn === 1 ? "active" : "")} onClick={() => fetchTransaction(1)}>TRANSACTIONS</button>
                        <button className={"app-trans-btn mx-2 px-4 py-1 " + (isActiveBtn === 2 ? "active" : "")} onClick={() => fetchTransaction(2)}>ERC20 TXNS</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;
