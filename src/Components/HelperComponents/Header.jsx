import LogoutUser from '../../Controllers/Users/LogoutUser';
import Logo from '../../Resources/logo.png';
import '../ComponentStyles/Header.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function Header({ currentUser, setCurrentUser }) {

    const redirect = useNavigate();

    async function LogOut() {
        const resp = await LogoutUser();
        setCurrentUser(null);

        if(resp)
            redirect('/')
    }

    return (
        <div className="header-component">
                <div className='header-initial-components'>
                    <Link to="/">
                        <div className='header-logo'>
                            <img className="header-component-logo" src={Logo} alt="logo" />
                            <p>NavigateGeography</p>
                        </div>
                    </Link>
                    {currentUser && 
                        <Link to="/manage">
                            <p>Manage Data</p>
                        </Link>
                    }
                </div>
                <div className='header-additional-components'>
                    {currentUser ?                    
                        <Button variant="outline-success" onClick={() => LogOut()} className="header-btn">Log Out</Button>
                        :
                        <Link to="/login">
                            <Button variant="outline-success" className="header-btn">Admin Login</Button>
                        </Link>
                    }
                </div>
        </div>
    )
}

export default Header;