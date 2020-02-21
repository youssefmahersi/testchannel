import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/Navigationitem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/signup">Signup</NavigationItem>
    </ul>
);

export default navigationItems;