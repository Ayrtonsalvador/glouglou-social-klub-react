import React, { useState } from 'react';


import { Link } from 'react-router-dom'

function NavigationC() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#FDD80B',  }} light expand="md">
                <Link to="/">
                    <NavbarBrand><img src="/Plantravail.png" alt="GGSC" style={{ width: 50, height: 50, marginLeft: 30, marginRight: 30 }} /> </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav style={styles.nav}>
                        <NavItem>
                            <NavLink to="/SrprofilC" style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>Mon profil
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/SrcatalogueC"
                                style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>Catalogue
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/SrmessagerieC"
                                 style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>Ma Messagerie
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/SrmessagerieC"
                                 style={{ padding: 10, fontWeight: 'bold', marginRight: 20, backgroundColor: "#333333", borderRadius: 5, color: "#FFFFFF" }}>Déconnexion
                            </NavLink>
                        </NavItem>


                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const styles = ({
    nav: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default NavigationC;


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