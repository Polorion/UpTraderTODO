import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout";
import HomePageContainer from "./components/homePage/HomePage";
import InfoProjectContainer from "./components/InfoProject/InfoProject";

function App() {
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={""} element={<HomePageContainer/>}/>
                        <Route path={"/project/:id"} element={<InfoProjectContainer/>}/>
                        <Route path={"*"} element={<div>страница не найдена</div>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
