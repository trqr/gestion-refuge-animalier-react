import './App.css'
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";

function App() {

  return (
      <>
          <ToastContainer
              position="bottom-left"
              draggable={true}
              theme="colored"
              closeOnClick={false}
          />
          <RouterProvider router={router}/>
      </>
  )
}

export default App
