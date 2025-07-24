import { ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [user_id, setUser] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            const res = await api.get("/auth/user", {
                headers: { jwtToken: localStorage.token }
            });
            const parseRes = res.data;
            setUser(parseRes.id);
        } catch (err) {
            console.error("Error fetching user profile:", err.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !status.trim() || !priority.trim() || !user_id) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            await api.post(
                "/tickets",
                {
                    title,
                    description,
                    status,
                    priority,
                    user_id,
                },
                {
                    headers: { jwtToken: localStorage.token },
                }
            );
            toast.success("Ticket created successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating ticket", error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to tickets
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Create New ticket</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ticket Title"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your ticket here..."
                                        className="textarea textarea-bordered h-32"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-wrap flex-col md:flex-row items-center gap-4 mt-8 justify-between">
                                    <div className="w-full md:w-auto">
                                        <select
                                            className="select select-bordered select-sm w-full mb-4 sm:mb-0 md:w-72 h-12"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">Status</option>
                                            <option value="open">Open</option>
                                            <option value="pending">Pending</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <select
                                            className="select select-bordered select-sm w-full md:w-72 h-12"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value="">Priority</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary mt-12" disabled={loading}>
                                        {loading ? "Creating..." : "Create ticket"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreatePage;
