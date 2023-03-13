import React from "react"
import { useState, useEffect } from "react";
import "./style/main.scss"
import { Pages } from "./components/pages/Pages"
import { Provider } from "react-redux";
import store from "./controller/store";
import { HashLoader } from 'react-spinners'
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
    
    </>
  )
}

export default App;
