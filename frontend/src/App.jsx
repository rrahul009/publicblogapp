import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import HomePage from './pages/HomePage'
import CreateBlog from './components/CreateBlog'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/createpost' element={<CreateBlog/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App