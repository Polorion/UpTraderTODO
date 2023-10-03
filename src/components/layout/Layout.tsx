import * as React from 'react';
import S from './Layout.module.scss'
import {Outlet} from "react-router-dom";
import {Header} from "../header/Header";

export const Layout = () => {
    return (
        <div className={S.body}>
            <Header/>
            <Outlet/>
        </div>
    );
};