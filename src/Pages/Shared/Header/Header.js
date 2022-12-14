import React from "react";
import { useContext } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  FaGoogle,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const { providerLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const loginDone = (user) => {
    if (user) {
      console.log(user);
    }
    const from = location.state?.from?.pathname || "/";
    if (from) {
      navigate(from, { replace: true });
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        loginDone(result.user);
      })
      .catch((error) => console.error(error));
  };

  const handleGithubSignIn = () => {
    providerLogin(githubProvider)
      .then((result) => {
        loginDone(result.user);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        className="mb-4"
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/" className="text-primary">
            <img
              alt=""
              src="/eduLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            CourseForest
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/course">Courses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/faq">FAQ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/blog">Blog</Nav.Link>
            </Nav.Item>

            {user && (
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  {user?.photoURL ? (
                    <Image
                      style={{ height: "30px" }}
                      roundedCircle
                      src={user?.photoURL}
                    ></Image>
                  ) : (
                    <FaUser></FaUser>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/">{user?.displayName}</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogOut}>
                    Log out <FaSignOutAlt></FaSignOutAlt>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!user && (
              <DropdownButton
                as={ButtonGroup}
                key={"Login"}
                id={`dropdown-variants-login`}
                variant={"login"}
                title={"Login"}
              >
                <Dropdown.Item eventKey="1" href="/login">
                  <FaEnvelope></FaEnvelope> Login with Email
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleGoogleSignIn}>
                  <FaGoogle></FaGoogle> Login with Google
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleGithubSignIn}>
                  <FaGithub></FaGithub> Login with Github
                </Dropdown.Item>
                <Dropdown.Item eventKey="4" href="/register">
                  <FaEnvelope></FaEnvelope> Register Now
                </Dropdown.Item>
              </DropdownButton>
            )}
            <Form className="mt-2">
              <Form.Check
                type="switch"
                id="dark-mode-switch"
                label="Dark mode"
              />
            </Form>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
