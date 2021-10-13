import axios from 'axios'
import { useState } from 'react'
import './App.css';

function App() {
    var address = ""
    const [txData, setTxData] = useState([])
    const [txErcData, setTxErcData] = useState([])
    const [addressHasError, setAddressHasError] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [isActiveBtn, setIsActiveBtn] = useState(1)    

    const search = e => {
        e.preventDefault()
        let data = document.getElementById("addressText").value
        let regex = /^0x[a-fA-F0-9]{40}$/i
        
        if (data !== "") {
            if (regex.test(data)) {
                address = data
                setIsSearched(true)
                setAddressHasError(false)
                fetchRopstenTxs()
                fetchRopstenERC20Txs()
            } else {
                setIsSearched(false)
                setAddressHasError(true)
            }
        } else {
            setIsSearched(false)
            setAddressHasError(true)
        }
    }

    const fetchRopstenTxs = () => {
        let urlETH = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`
        axios.get(urlETH).then(res => {
            setTxData(res.data.result)
        })
        console.log(txData)
    }

    const fetchRopstenERC20Txs = () => {
        let urlERC20 = `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`
        axios.get(urlERC20).then(res => {
            setTxErcData(res.data.result)
        })
        console.log(txErcData)
    }

    const fetchTransaction = type => {
        (type === 1) ? setIsActiveBtn(1) : setIsActiveBtn(2)
    }

    const convEth = wei => {
        return Number(wei) / 1e18
    }

    const shortenAddress = (address, prefixCount, postfixCount) => {
        let prefix = address.substr(0, prefixCount);
        let postfix = address.substr(address.length - postfixCount, address.length);
    
        return prefix + "..." + postfix;
    }
    
    const url = "https://ropsten.etherscan.io"

    return (
        <div className="app h-100">
            <div className="container h-100">
                <div className={"d-flex justify-content-center align-items-center " + (!isSearched ? "h-100" : "")}>
                    <div className="app-content text-center">
                        <h2 className="font-bold mb-1 light-black">Ropsten Test Network Explorer</h2>
                        <p className="font-thin font-italic mb-4 light-grey">Check out the latest transactions on the Ropsten Test Network by any given address</p>
                        <form onSubmit={search}>
                            <div className="d-flex align-items-center w-100">
                                <input type="text" id="addressText" className={"app-input w-100 " + (addressHasError ? "error" : "")} placeholder="Enter address" />
                                <button className="app-btn" type="submit">SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                {isSearched && (
                    <div className="app-txns">
                        <div className="d-flex justify-content-center align-items-center mb-4">
                            <button className={"app-trans-btn mx-2 px-4 py-1 " + (isActiveBtn === 1 ? "active" : "")} onClick={() => fetchTransaction(1)}>TRANSACTIONS</button>
                            <button className={"app-trans-btn mx-2 px-4 py-1 " + (isActiveBtn === 2 ? "active" : "")} onClick={() => fetchTransaction(2)}>ERC20 TXNS</button>
                        </div>

                        {isActiveBtn === 1 ? (
                            <table className="table table-condensed transactions-table w-100">
                                <thead>
                                    <tr>
                                        <th>Tx Hash</th>
                                        <th>Block</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {txData.length > 0 ? txData.map((x, k) => (
                                        <tr key={k}>
                                            <td><a href={`${url}/tx/${x.hash}`} target="_blank" noreferrer>{shortenAddress(x.hash, 15, 15)}</a></td>
                                            <td><a href={`${url}/block/${x.blockNumber}`} target="_blank" noreferrer>{x.blockNumber}</a></td>
                                            <td><a href={`${url}/address/${x.from}`} target="_blank" noreferrer>{shortenAddress(x.from, 15, 10)}</a></td>
                                            <td><a href={`${url}/address/${x.to}`} target="_blank" noreferrer>{shortenAddress(x.to, 15, 10)}</a></td>
                                            <td>{convEth(x.value)}ETH</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td className="text-center" colSpan="5">No transaction/s found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="table table-condensed transactions-table w-100">
                                <thead>
                                    <tr>
                                        <th>Tx Hash</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {txErcData.length > 0 ? txErcData.map((x, k) => (
                                        <tr key={k}>
                                            <td><a href={`${url}/tx/${x.hash}`} target="_blank" rel="noreferrer">{shortenAddress(x.hash, 15, 15)}</a></td>
                                            <td><a href={`${url}/address/${x.from}`} target="_blank" rel="noreferrer">{shortenAddress(x.from, 15, 10)}</a></td>
                                            <td><a href={`${url}/address/${x.to}`} target="_blank" rel="noreferrer">{shortenAddress(x.to, 15, 10)}</a></td>
                                            <td>{convEth(x.value)}ETH</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td className="text-center" colSpan="5">No transaction/s found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;
