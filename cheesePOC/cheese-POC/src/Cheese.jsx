
function Cheese() {

    const apiUrl = "http://localhost:3000/cheeses/1";

  return (
    <ul>
        <li>Pineapple</li>
        <li>{food1}</li>
        <li>{food2.toUpperCase()}</li>
    </ul>);
}
export default Cheese;