import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import TicketCard from "../components/TicketCard";
import TicketsNotFound from "../components/TicketsNotFound";

const HomePage = ({ setAuth }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [user, setUser] = useState();

    const getProfile = async () => {
        try {
            const res = await api.get("/auth/user", {
                headers: { jwtToken: localStorage.token }
            });
            const parseRes = res.data;
            setUser(parseRes);
        } catch (err) {
            console.error("Error fetching user profile:", err.message);
        }
    };

    useEffect(() => {

        getProfile();

        const fetchtickets = async () => {
            setLoading(true);
            try {
                const res = await api.get("/tickets", {
                    headers: { jwtToken: localStorage.token },
                    params: {
                        status: status || undefined,
                        priority: priority || undefined,
                    },
                });
                setTickets(res.data);
            } catch (error) {
                toast.error("Failed to load tickets");
            } finally {
                setLoading(false);
            }
        };

        fetchtickets();
    }, [status, priority]);


    return (
        <div className="min-h-screen">
            <Navbar setAuth={setAuth} />

            <div className="max-w-7xl mx-auto p-4 mt-6">

                {(tickets.length > 0 || (!!status || !!priority)) && (
                    <div className="flex items-center justify-between mb-16 mt-16 flex-wrap gap-4">
                        <h2 className="text-3xl font-bold mb-6 sm:mb-0">Hello {user?.name}</h2>

                        <div className="flex flex-wrap items-center gap-4">
                            <div>
                                <select
                                    className="select select-bordered select-sm w-40 h-10"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Status</option>
                                    <option value="open">Open</option>
                                    <option value="pending">Pending</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="select select-bordered select-sm w-40 h-10"
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
                    </div>

                )}
                {tickets.length === 0 && <TicketsNotFound isFiltered={!!status || !!priority} />}
                {tickets.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mt-24">
                            {tickets.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} setTickets={setTickets} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default HomePage;
