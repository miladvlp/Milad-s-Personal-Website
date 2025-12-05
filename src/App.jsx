import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import ArticleDetail from './components/ArticleDetail'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </main>
  )
}

export default App