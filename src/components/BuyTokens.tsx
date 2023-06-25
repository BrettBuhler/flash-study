import Checkout from "./Checkout"
import TopBar from "./TopBar"

import { useNavigate } from "react-router-dom"

import '../styles/BuyTokens.css'

interface BuyTokensProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const BuyTokens: React.FC<BuyTokensProps> = ({user, setUser}) => {
    const navigate = useNavigate()
    return (
        <div className="buy-tokens-background">
            <TopBar user={user} setUser={setUser}/>
            <div className="buy-tokens-main">
                <h2 className="buy-tokens-h2">Buy 100k AI Tokens for $5.00 CAD</h2>
                <Checkout user={user} setUser={setUser} />
                <div className="buy-tokens-bottom-container">
                    <p className="buy-tokens-p">Payments are processed by our parter STRIPE. Click <a href="https://stripe.com/en-ca/payments" target="_blank">here</a> to learn more.</p>
                    <button className="buy-tokens-back-button" onClick={()=>navigate('/store')}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default BuyTokens