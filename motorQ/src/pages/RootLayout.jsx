import { Fragment, useEffect} from "react";
import {Outlet} from "react-router-dom"
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import HeaderBar from "../components/Header";
// import SideBar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
// import HeaderBarUnsigned from "../components/Header2";


import classes from './RootLayout.module.css'

function RootLayout(){
    

    return(
    
    <Fragment>  
        <div className={classes.topHeader}>
        <header style={{position: "sticky"}}></header></div>
        <main>
            <Outlet/>
        </main>
    </Fragment> 
    
    )
}

export default RootLayout;
