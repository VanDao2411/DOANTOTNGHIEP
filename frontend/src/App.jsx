import { Route, Routes } from "react-router-dom"
import {  ProductDetails, Search } from "./Components"
import { Cart, Home, Login, Public, About, Upload, UserProfile, Category} from "./Containers/Public"
import path from "./Ultis/path"
import Categorys from "./Components/Categorys"
import { Historie } from "./Containers/Pages"


function App() {

  return (
    <>
      <div className="w-full bg-white ">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />} >
            <Route path={path.HOME} element={<Home />}> 
              <Route path="/category/:categorySlug" element={<Categorys />} />  
            </Route> 
            <Route path={path.CART} element={<Cart />} />
            <Route path={path.PRODUCTDETAIL} element={<ProductDetails />} />
            <Route path={path.CATEGORY} element={<Category />} />
            <Route path={path.HISTORIE} element={<Historie />} />
            <Route path={path.ABOUT} element={<About />} />
            <Route path={path.UPLOAD} element={<Upload />} />
            <Route path={path.SEARCH} element={<Search />} />

            <Route path={path.START} element={<Home />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
        </Routes>
        {/* <Headers /> */}
      </div>
    </>
  )
}

export default App
