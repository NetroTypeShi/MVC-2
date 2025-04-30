import express from 'express';
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        description: "Register a new user",
    });
    });
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        description: "Inicia Sesion",
    });
});

router.get("/profile", (req, res) => {
    const user = req.session.username;
    res.render("profile", {user});
});
export default router;