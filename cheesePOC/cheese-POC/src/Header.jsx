import './Header.css';
import cheeseLogo from '/public/cheese1.png'; 


function Header() {
  return (
    <header >
      <h1 className='title'><a href="/"><img src={cheeseLogo} alt="Cheese Logo" className="cheese-logo" />Cheese-o-Pedia</a></h1>
      <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cheeses">Cheeses</a></li>
        </ul>
      </nav>
      <hr></hr>
    </header>
  );
}

export default Header;