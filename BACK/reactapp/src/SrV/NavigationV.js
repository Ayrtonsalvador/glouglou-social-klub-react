import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

// import { mdiInstagram } from '@mdi/js';
// import Icon from '@mdi/react'

import { Link } from 'react-router-dom'

function NavigationV() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#FDD80B' }} light expand="md">
                <Link to="/">
                    <NavbarBrand><img src="/Plantravail.png" alt="GGSC" style={{ width: 50, height: 50, marginLeft: 30, marginRight: 30 }} /> </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav>
                        <NavItem>

                            <NavLink to="/SrprofilV" style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MON PROFIL</NavLink>

                        </NavItem>

                        <NavItem>

                            <NavLink to="/SrcaveV" style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MES BOUTEILLES</NavLink>

                        </NavItem>

                        <NavItem>

                            <NavLink to="/SrmessagerieV" style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MA MESSAGERIE</NavLink>

                        </NavItem>

                        {/* <Icon path={mdiInstagram}
                            size={1.5}
                            // horizontal
                            // vertical
                            // rotate={0}
                            color="white"
                            spin={false} /> */}

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationV;


{/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}