import {Link} from 'react-router-dom'
 
const Header = ()=> {
 
    return (

         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container-fluid">
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
             <a className="navbar-brand" href="/">Selector App</a>
           </div>
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
              <Link to="/add" className="nav-link active">Add Selector</Link>
             </li>
           </ul>
         </div>
       </nav>
      );
}

export default Header;