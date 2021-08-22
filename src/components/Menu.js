import { Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connectWallet } from '../utils/Wallet'

const Menu = () => {

  return (
    <Container  fluid={true}>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <LinkContainer to='/'>
          <Nav.Link className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'>
          <img width="100%" src="https://uploads-ssl.webflow.com/60c67c74f40bc435b735a22b/60c7826d0457395749f44ef1_GNY%20logo.png" alt=""/>
          </Nav.Link>
        </LinkContainer>
        <Nav>
          <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <LinkContainer to='/about'>
                <Nav.Link className='nav-link px-2 link-secondary'>About</Nav.Link>
              </LinkContainer>
            </li>
          </ul>

          <div className='col-md-3 text-end'>
            <LinkContainer to='/'>
              <button type='button' className='btn btn-outline-primary me-2' onClick={connectWallet}>
                Connect
              </button>
            </LinkContainer>
          </div>
        </Nav>
      </header>
    </Container>
  )
}

export default Menu
