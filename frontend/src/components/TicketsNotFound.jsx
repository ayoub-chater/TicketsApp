import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const TicketsNotFound = ({ isFiltered }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">
                {isFiltered ? "No tickets match your filters" : "No tickets yet"}
            </h3>
            <p className="text-base-content/70">
                {isFiltered
                    ? "Try adjusting your filters to find matching tickets."
                    : "Ready to organize your thoughts? Create your first ticket to get started on your journey."}
            </p>
            {!isFiltered && (
                <Link to="/create" className="btn btn-primary">
                    Create Your First Ticket
                </Link>
            )}
        </div>
    );
};

export default TicketsNotFound;
