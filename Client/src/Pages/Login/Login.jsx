import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { errorAlert, successAlert } from "../../../sweetAlerts";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { EmailSignIn, GsignIn } = useContext(AuthContext);

    //-------email-pass login
    const handleManualLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        EmailSignIn(email, password)
            .then((result) => {
                console.log(result);
                const notificationMessage = 'Login Successful'
                successAlert(notificationMessage);
                setTimeout(() => {
                    navigateToRoutes();
                }, 600);

            })
            .catch(error => {
                console.log(error);
                const notificationMessage = `Login Failed : ${error.message}`;
                errorAlert(notificationMessage);
            });
    }
    //-----google login
    const GLogIn = async () => {
        GsignIn()
            .then(result => {
                console.log(result);
                const notificationMessage = 'Login Successful'
                successAlert(notificationMessage);
                setTimeout(() => {
                    navigateToRoutes();
                }, 600);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //----------navigate to desired route-----
    const navigateToRoutes = () => {
        navigate(location?.state ? location.state : '/')
    }


    //-------return body-------
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content  flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login First!</h1>
                    </div>
                    <div className="card shrink-0  shadow-2xl bg-base-100">
                        <form onSubmit={handleManualLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <p>Or</p>
                            <div>
                                <p>Login with <button onClick={GLogIn} className="btn  btn-success text-white">Google</button></p>
                            </div>
                        </div>

                        <div>
                            {/* set error message */}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;