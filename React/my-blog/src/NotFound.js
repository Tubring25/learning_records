import {Link} from 'react-router-dom'

const NotFuncd = () => {
  return (
    <div className="not-fund">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <Link to="/">back to the home page</Link>
    </div>
  );
}
 
export default NotFuncd;