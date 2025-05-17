import { Route, Routes } from "react-router-dom"
import {  ProductDetails, Search,DocumentsProfile ,FinanceProfile, AccountProfile } from "./Components"
import { Cart, Home, Login, Public, Docs, Upload, UserProfile, Books} from "./Containers/Public"
import path from "./Ultis/path"
import { Historie } from "./Containers/Pages"
import { AvatarProvider } from "./Context/AvatarContext"



function App() {

  return (
    <AvatarProvider>
      <div className="w-full bg-white ">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />} >
            <Route path={path.HOME} element={<Home />}> 
                
            </Route> 
            <Route path={path.CART} element={<Cart />} />
            <Route path={path.PRODUCTDETAIL} element={<ProductDetails />} />
            <Route path={path.BOOK} element={<Books />} />
            <Route path={`${path.BOOK}/:slug`} element={<Books />} />
            <Route path={path.HISTORIE} element={<Historie />} />
            <Route path={path.DOC} element={<Docs />} />
            <Route path={path.UPLOAD} element={<Upload />} />
            <Route path={path.SEARCH} element={<Search />} />

            <Route path="/user-profile/*" element={<UserProfile />}>
              <Route path="account" element={<AccountProfile />} />
              
              <Route path="documents/*" element={<DocumentsProfile />} />
              <Route path="finance" element={<FinanceProfile/>} />
            </Route>
            <Route path={path.START} element={<Home />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
        </Routes>
        {/* <Headers /> */}
      </div>
    </AvatarProvider>
  )
}

export default App
