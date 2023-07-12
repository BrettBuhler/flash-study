import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../styles/TestSite.css'

interface TestSiteProps {
    setUser: any
}

const TestSite: React.FC<TestSiteProps> = ({setUser}) => {

    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_URL}api/login`, {email: 'testuser1234@gmail.com', password: 'thisIsAPassword123'})
            if (response.data.user){
                setUser(response.data.user)
                navigate('/dashboard')
            } else {
                console.error('error loging in')
            }
        } catch (error) {
            console.error(error)
        }
    
      }

    return (
        <div className="test-site-container" style={{position: 'fixed', bottom: '10px', right: '10px', padding: '10px'}}>
            <button className="add-deck-button ignite test-site-button" onClick={handleLogin}>Test Account</button>
        </div>
    )
}

export default TestSite