import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout";
import HomePageContainer from "./components/homePage/HomePage";
import InfoProjectContainer from "./components/InfoProject/InfoProject";
import {useDispatch} from "react-redux";
import {setAllProjects} from "./store/TodoReducer";

function App() {
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const data = localStorage.getItem('project')
        data && dispatch(setAllProjects(JSON.parse(data)))
        setLoad(true)
    }, [])
    return (
        <div className="App">
            <div className="container">
                {load && <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={""} element={<HomePageContainer/>}/>
                        <Route path={"/project/:id"} element={<InfoProjectContainer/>}/>
                        <Route path={"*"} element={<div>страница не найдена</div>}/>
                    </Route>
                </Routes>}
            </div>
        </div>
    );
}

export default App;
