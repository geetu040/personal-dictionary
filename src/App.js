import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Word } from './components/Word'
import MyDict from './components/MyDict'
import Login from './components/Login'

// let API_URL = "http://127.0.0.1:8000/"
let API_URL = "https://personal-dictionary-api.herokuapp.com/"

function App() {
    const [email, setEmail] = useState(localStorage.getItem("lexicon_email"))
    const [lexicon, setLexicon] = useState((email) ? null : [])
    if (lexicon === null) {
        fetch(`${API_URL}lexicon/init-${email}`)
            .then(response => response.json())
            .then(data => {
                if (data === "deleted") {
                    localStorage.removeItem("lexicon_email");
                    changeState({ email: null, logged: false, lexicon: [] });
                    setEmail(null)
                    setLogged(false)
                    setLexicon([])
                }
                else {
                    setLexicon(JSON.parse(data))
                }
            });
    }
    const [addMode, setAddMode] = useState(false)
    const [sortCounter, setSortCounter] = useState(0)
    const [theme, setTheme] = useState(
            JSON.parse(localStorage.getItem("lexicon_theme"))
        ||
            [
                { i: "dark", j: "light", k: 0.048 },
                // blues
                { i: "12", j: "11", k: 0.048 },
                { i: "7", j: "dark", k: 0.048 },
                { i: "info", j: "dark", k: 0.3 },
                { i: "1", j: "2", k: 0.009 },
                // yellows
                { i: "warning", j: "dark", k: 0.3 },
                { i: "6", j: "5", k: 0.048 },
                { i: "4", j: "3", k: 0.1 },
                // greys
                { i: "13", j: "14", k: 0.048 },
                { i: "light", j: "dark", k: 0.3 },
                { i: "14", j: "13", k: 0.048 },
            ]
    )
    const [logged, setLogged] = useState(email !== null)
    const [info, setInfo] = useState(null)
    const state = {
        addMode: addMode,
        theme: theme,
        lexicon: lexicon,
        sortCounter: sortCounter,
        email: email,
        logged: logged,
        info: info,
    }
    const setState = {
        addMode: value => setAddMode(value),
        theme: value => setTheme(value),
        lexicon: value => setLexicon(value),
        sortCounter: value => setSortCounter(value),
        email: value => setEmail(value),
        logged: value => setLogged(value),
        info: value => setInfo(value),
    }
    function changeState(new_state) { for (let key in new_state) { setState[key](new_state[key]) } }

    useEffect(() => {
        if (state.email && lexicon !== null) {
            fetch(`${API_URL}lexicon/update-${state.email}-${JSON.stringify(lexicon)}`)
                .then(response => response.json())
                .then(data => { console.log(data) });
        }
    }, [lexicon, state.email, state.theme])
    useEffect(() => {
        localStorage.setItem("lexicon_theme", JSON.stringify(theme))
    }, [theme])
    useEffect(() => {
        console.log("INFO CHANGED")
    }, [info])
    useEffect(() => {
        console.log("hello")
    }, [])


    document.getElementsByTagName("body")[0].removeAttribute('class');
    document.getElementsByTagName("body")[0].classList.add(`bg-${state.theme[0].j}`)


    return (<div className={`bg-${state.theme[0].j} text-${state.theme[0].i}`} style={{ minHeight: "100vh" }}>
        <BrowserRouter>
            <Navbar state={state} changeState={changeState} />
            <Routes>
                <Route path='/' element={
                    <Home state={state} changeState={changeState} API_URL={API_URL} />
                } />
                <Route path='/word/:word' element={<>
                    <Home state={state} changeState={changeState} API_URL={API_URL} />
                    <Word state={state} changeState={changeState} API_URL={API_URL} />
                </>} />
                <Route path="/lexicon" element={
                    state.lexicon && <MyDict state={state} changeState={changeState} />
                } />
                <Route path="/login" element={
                    <Login state={state} changeState={changeState} API_URL={API_URL} />
                } />
            </Routes>
        </BrowserRouter>
    </div>);
}

export default App;
