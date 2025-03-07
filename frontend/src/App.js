import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Learning from './pages/Learning';
import Experience from './pages/Experience';
import AI from './pages/AI';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Projects} />
        <Route path="/learning" component={Learning} />
        <Route path="/experience" component={Experience} />
        <Route path="/ai" component={AI} />
      </Switch>
    </Router>
  );
}

export default App;
