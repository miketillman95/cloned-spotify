import React from "react";
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'

import {Container} from './styles/App.styles'

function App() {
    const code = new URLSearchParams(window.location.search).get('code')

    return(
      <Container>
        {/* if the search param matches go to dashboard, if not then go to login page */}
        {code ? <Dashboard code={code} /> : <Login />}
        
        </Container>

  );
}

export default App;
