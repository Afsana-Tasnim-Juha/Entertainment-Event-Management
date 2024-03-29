import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Shared/Header/Header";
import NavBar from "../Shared/NavBar/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase.config";



const Login = () => {

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();


    const handleGoogleSingIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => {

                console.log(error.message)
            })
    }


    const handleLogin = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);


        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);


        signIn(email, password)
            .then(result => {

                console.log(result.user)


                //navigate after login

                navigate(location?.state ? location.state : '/');


            })
            .catch(error => {
                console.error(error)
            });
    }
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>

            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>

                <form onSubmit={handleLogin} className="md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button onClick={handleGoogleSingIn} className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className=" text-center mt-4">Do not have an account? Please <Link className="text-blue-600 font-bold" to="/register">register</Link> </p>
            </div>

        </div>
    );
};

export default Login;