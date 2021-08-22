import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

// Layout
import Layout from './layout/Layout'

// pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Detail from './pages/Detail'
import Collections from './pages/Collections'
const App = () => {
  return (
    <Layout>
      <Container fluid={true}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/about' component={About} />
		  <Route path='/detail' component={Detail} />
		  <Route path='/collections' component={Collections} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Layout>
  )
}

export default App
