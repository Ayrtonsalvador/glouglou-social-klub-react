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
import Icon from '@mdi/react'
import { mdiInstagram } from '@mdi/js';
import {Link} from 'react-router-dom'

function Navigation() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#FDCF23' }} light expand="md">
                <Link to="/">
                    <NavbarBrand><img src="/Plantravail.png" alt="GGSC" style={{ width: 50, height: 50, marginLeft: 30, marginRight: 30 }} /> </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav>
                        <NavItem>
                            <Link to="/Srprofil">
                                <NavLink style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MON PROFIL</NavLink>
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to="/Srcatalogue">
                                <NavLink style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MES BOUTEILLES</NavLink>
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to="/Srmessagerie">
                                <NavLink style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>MA MESSAGERIE</NavLink>
                            </Link>
                        </NavItem>

                        <Icon path={mdiInstagram}
        title="Instagram"
        size={1}
        horizontal
        vertical
        rotate={90}
        color="red"
        spin/>
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
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;