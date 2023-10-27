import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NorFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import {useState} from "react";

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <Header search={searchValue} setSearch={setSearchValue}/>
            <div className="content">
                    <Routes>
                        <Route path="/" element={<Home search={searchValue} setSearch={setSearchValue}/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
        </div>
    )
}

export default App;