import React from 'react';
import Contents from './Contents.js';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
	return (
 <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
    <NavLink exact to="/" className="nav">Home</NavLink>
<NavLink to="/issues" className="nav">Issue List</NavLink>
<NavLink to="/report" className="nav">Report</NavLink>
 <NavLink to="/search" className="ml1 no-underline black">
  </NavLink>
		</Nav>
		</Navbar>
		);
}
export default function Page() {
	return (
		<div>
		<NavBar />
		<Contents />
		</div>
		);
	}