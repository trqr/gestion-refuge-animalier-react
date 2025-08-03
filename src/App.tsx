import './App.css'
import {ToastContainer} from "react-toastify";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {Container} from "@mui/material";

function App() {

  return (
      <>
          <ToastContainer
              position="bottom-left"
              draggable={true}
              theme="colored"
              closeOnClick={false}
          />
          <Container>
             <RouterProvider router={router}/>
          </Container>
      </>
  )
}

export default App
