export default function validInfo(req, res, next) {
    const { email, name, password } = req.body;

    const isValidEmail = (userEmail) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

    const sendError = (message) => {
        return res.status(400).json({ error: message });
    };

    if (["/register", "/login"].includes(req.path)) {
        if (![email, password].every(field => field && field.trim() !== "")) {
            return sendError("Missing credentials");
        }

        if (!isValidEmail(email)) {
            return sendError("Invalid email format");
        }

        if (password.length < 8) {
            return sendError("Password must be at least 8 characters");
        }

        if (req.path === "/register") {
            if (!name || name.trim() === "") {
                return sendError("Name is required");
            }
        }
    }

    next();
}
