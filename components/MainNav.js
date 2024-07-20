import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useSearchHistoryState } from "../store";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useSearchHistoryState();

  const router = useRouter();

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchHistory([...searchHistory, `title=true&q=${searchField}`]);
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        expanded={isExpanded}
        className="fixed-top"
      >
        <Navbar.Brand className="m-2">Vinicius Souza da Silva</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          &nbsp;
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
          &nbsp;
          <Nav>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <Link href="/favourite" passHref legacyBehavior>
                <NavDropdown.Item
                  active={router.pathname === "/favourite"}
                  onClick={() => setIsExpanded(false)}
                > Favourites </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item
                  active={router.pathname === "/history"}
                  onClick={() => setIsExpanded(false)}
                > Search History </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}
