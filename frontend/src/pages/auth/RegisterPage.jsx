import { Fragment, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../../lib/axios";

function LoginPage({ setAuth }) {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await api.post(
                "/auth/register", body, {
                headers: {
                    "Content-type": "application/json"
                },
            }
            );

            const parseRes = response.data;

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                toast.success("Logged in Successfully");
            } else {
                setAuth(false);
                toast.error("Login failed.");
            }
        } catch (err) {
            setAuth(false);
            const errorMsg = err.response?.data?.error;
            toast.error(errorMsg);
        }
    };

    return (
        <Fragment>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <h1 className="text-3xl font-bold text-center text-primary">Register</h1>
                <form onSubmit={onSubmitForm} className="max-w-md mx-auto mt-8 bg-base-200 p-8 rounded-xl shadow-md">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button className="btn btn-success w-full mt-2">Submit</button>
                </form>

                <p className="text-center mt-4 text-sm">
                    You have an account?{" "}
                    <Link to="/login" className="text-accent hover:underline">Login</Link>
                </p>
            </div>
        </Fragment>
    );
}

export default LoginPage