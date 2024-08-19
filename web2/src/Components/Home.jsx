  import  'react';
  import { Link } from 'react-router-dom';

  const Home = () => {
    return (
      <div className="container"> 
        <h1>Welcome to My Recipe App</h1>
        <Link to="/recipes">View Recipes</Link>
      </div>
    );
  };

  export default Home;
