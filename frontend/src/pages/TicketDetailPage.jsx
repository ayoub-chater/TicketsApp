import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const TicketDetailPage = () => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user_id, setUser] = useState();

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

    const { id } = useParams();

    useEffect(() => {
        getProfile();

        const fetchticket = async () => {
            try {
                const res = await api.get(`/tickets/${id}`, {
                    headers: { jwtToken: localStorage.token },
                });
                setTicket(res.data);
            } catch (error) {
                toast.error("Failed to fetch the ticket");
            } finally {
                setLoading(false);
            }
        };

        fetchticket();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;

        try {
            await api.delete(`/tickets/${id}`, {
                headers: { jwtToken: localStorage.token },
            });
            toast.success("Ticket deleted");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete ticket");
        }
    };

    const handleSave = async () => {
        if (
            !ticket.title.trim() ||
            !ticket.description.trim() ||
            !ticket.status.trim() ||
            !ticket.priority.trim() ||
            !user_id
        ) {
            toast.error("All fields are required");
            return;
        }

        setSaving(true);
        try {
            await api.put(
                `/tickets/${id}`,
                ticket,
                {
                    headers: { jwtToken: localStorage.token },
                }
            );
            toast.success("Ticket updated successfully");
            navigate("/");
        } catch (error) {
            console.log("Error saving the ticket:", error);
            toast.error("Failed to update ticket");
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to tickets
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete ticket
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ticket title"
                                    className="input input-bordered"
                                    value={ticket.title}
                                    onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    placeholder="Write your ticket here..."
                                    className="textarea textarea-bordered h-32"
                                    value={ticket.description}
                                    onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-wrap flex-col md:flex-row items-center gap-4 mt-3 justify-between">
                                <div className="w-full md:w-auto">
                                    <select
                                        className="select select-bordered select-sm w-full mb-4 sm:mb-0 md:w-72 h-12"
                                        value={ticket.status}
                                        onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
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
                                        value={ticket.priority}
                                        onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                                    >
                                        <option value="">Priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary mt-10" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TicketDetailPage;
