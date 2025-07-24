import { Link, useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import toast from "react-hot-toast";


const Navbar = ({ setAuth }) => {

    const navigate = useNavigate();

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
            navigate("/login");
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">TicketsApp</h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New ticket</span>
                        </Link>
                        <button onClick={e => logout(e)} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
