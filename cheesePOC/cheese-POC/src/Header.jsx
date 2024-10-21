import './Header.css';

function Header() {
  return (
    <header >
      <h1><img src='/src/assets/cheese1.png' alt="Cheese Logo" className="cheese-logo" />Cheese-o-Pedia</h1>
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