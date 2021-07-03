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
         </div>
       </nav>
      );
}

export default Header;