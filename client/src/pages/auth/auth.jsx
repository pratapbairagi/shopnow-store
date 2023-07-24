
import { useSelector } from "react-redux"
import Signin from "./signin"
import Signup from "./signup"


const Auth = () => {

    const errr = useSelector(state=> state);

    console.log(errr)

    return (
        <div className="container-fluid py-5 px-0  m-0 d-flex flex-col" style={{overflow:"hidden", justifyContent:"flex-start", maxWidth:"100%"}}>
                   
                    <Signin/>

                    <Signup/>
        </div>
    )
}

export default Auth