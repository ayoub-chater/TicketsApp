import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ticketCard = ({ ticket, setTickets }) => {
    
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this ticket?")) return;

        try {
            await api.delete(`/tickets/${id}`, {
                headers: { jwtToken: localStorage.token },
            });;
            setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
            toast.success("ticket deleted successfully");
        } catch (error) {
            toast.error("Failed to delete ticket");
        }
    };

    return (
        <Link
            to={`/ticket/${ticket.id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{ticket.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{ticket.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(ticket.created_at))}
                    </span>
                    <div className="flex gap-2">
                        <span className="px-[10px] pt-0 pb-[4px] bg-[#1eb854] text-black rounded-[10px]">{ticket.status}</span>
                        <span className="px-[10px] pt-0 pb-[4px] bg-[#1db88e] text-black rounded-[10px]">{ticket.priority}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, ticket.id)}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default ticketCard;
