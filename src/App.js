import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

// Layout
import Layout from './layout/Layout'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Onramp from './pages/Onramp'
import NotFound from './pages/NotFound'
import Detail from './pages/Detail'
const App = () => {
  return (
    <Layout>
      <Container>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/about' component={About} />
          <Route path='/onramp' component={Onramp} />
		  <Route path='/detail' component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Layout>
  )
}

export default App
