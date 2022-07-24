import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Word } from './components/Word'
import MyDict from './components/MyDict'
import Login from './components/Login'
import Signup from './components/Signup'
import ContextTag from './components/ContextTag'

function App() {
    return (
        <ContextTag >
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={
                            <Home />
                        } />
                        <Route path='/word/:word' element={<>
                            <Home />
                            <Word />
                        </>} />
                        <Route path="/lexicon" element={
                            <MyDict />
                        } />
                        <Route path="/login" element={
                            <Login />
                        } />
                        <Route path="/signup" element={
                            <Signup />
                        } />
                    </Routes>
                </BrowserRouter>
        </ContextTag>
    )
}

export default App;
