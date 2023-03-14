import React from "react"
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Pages } from "./components/pages/Pages"
import { Provider } from "react-redux";
import store from "./controller/store";
import { HashLoader } from 'react-spinners'
import { Login } from "./components/auth/Login/Login";
import { Signup } from "./components/auth/Signup/Signup";
function App() {
  const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    },[])

  return (
    <>
    {loading? <div className = "loaderPage"> <HashLoader color={"#FA6D4F"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> </div>
    :
    <Provider store={store}>
      <Pages/>
    </Provider>}

    {loading? <div className = "loaderPage"> <HashLoader color={"#FA6D4F"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> </div>
    :
    <Router>
      <Switch>
      <Route exact path='/login'>
                      <Login />
                </Route>
                
                <Route exact path='/signup'>
                   <Signup/>
                </Route>
      </Switch>
    </Router>
    }
    


    
    
    </>
  )
}

export default App;
