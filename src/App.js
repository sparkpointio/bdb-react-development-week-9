import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

function App() {
    const address = "0x88A14AF453b14070B9B943eea32bf3F534dFa01a"
    const urlETH = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`
    const urlERC20 = `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`

    const fetchRopstenTxs = async () => {
        let data

        await axios.get(urlETH).then(res => {
            data = res.data
        })

        return data
    }
    const fetchRopstenERC20Txs = async () => {
        let data

        await axios.get(urlERC20).then(res => {
            data = res.data
        })

        return data
    }

    return (
        <div className="app h-100">
            <div className="container h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="app-content text-center">
                        <h2 className="font-bold mb-1 light-black">Ropsten Test Network Explorer</h2>
                        <p className="font-thin font-italic mb-4 light-grey">Check out the transactions on the Ropsten Test Network by any given address</p>
                        <form>
                            <div className="d-flex align-items-center w-100">
                                <input type="text" className="app-input w-100" placeholder="Enter address" />
                                <button className="app-btn" type="submit">SEARCH</button>
                            </div>
                        </form>
                    </div>    
                </div>                
            </div>
        </div>
    )
}

export default App;
