import axios from "axios";
import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function NavbarAxios() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // loading api using Axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/menus") // replace with your real endpoint
      .then((res) => {
        setMenuItems(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(true);
      });
  }, []);

  return (
    <>
      <p className="mt-2 mb-0"> using react-bootstrap</p>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#">
            <img
              src={reactLogo}
              style={{ width: "32px", height: "32px" }}
              alt="React logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              {loading ? (
                <Nav.Link disabled>Loading...</Nav.Link>
              ) : (
                menuItems.map((item, index) =>
                  item.submenu ? (
                    <NavDropdown
                      title={item.name}
                      id={`nav-dropdown-${index}`}
                      key={index}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <NavDropdown.Item
                          href={subItem.url}
                          key={subIndex}
                        >
                          {subItem.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      href={item.url}
                      key={index}
                    >
                      {item.name}
                    </Nav.Link>
                  )
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p className="mt-2 mb-0"> using native bootstrap</p>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container">
          <a
            className="navbar-brand"
            href="#"
          >
            <img
              src={reactLogo}
              style={{ width: "32px", height: "32px" }}
              alt="React logo"
            />
          </a>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarMain"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loading ? (
                <li className="nav-item">
                  <div className="spinner-border text-light"></div>
                </li>
              ) : (
                menuItems.map((item, index) =>
                  item.submenu ? (
                    <li
                      className="nav-item dropdown"
                      key={index}
                    >
                      <a
                        className="nav-link"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        title={item.name}
                      >
                        {item.name}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              className="dropdown-item"
                              href={subItem.url}
                              title={subItem.name}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li
                      className="nav-item"
                      key={index}
                    >
                      <a
                        className="nav-link"
                        aria-current="page"
                        href={item.url}
                        title={item.name}
                      >
                        {item.name}
                      </a>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
