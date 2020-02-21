import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
const Toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <h1>
            Social Media
        </h1>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;