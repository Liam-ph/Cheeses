import './Header.css';
import cheeseLogo from '/public/cheese1.png'; 


function Header() {
  return (
    <header >
      <h1><img src={cheeseLogo} alt="Cheese Logo" className="cheese-logo" />Cheese-o-Pedia</h1>
      <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <hr></hr>
    </header>
  );
}

export default Header;