import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { errorAlert, successAlert } from "../../../sweetAlerts";



const Login = () => {
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
            })
            .catch(error => console.log(error));
    }
    //-----google login
    const GLogIn = () => {
        GsignIn()
            .then(result => {
                console.log(result);
                const notificationMessage = 'Login Successful'
                successAlert(notificationMessage);
                setTimeout(() => {
                    window.location.replace('/');
                }, 600);
            })
            .catch(error => {
                console.log(error);
                const notificationMessage = `${error.message}`;
                errorAlert(notificationMessage);
            });
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;