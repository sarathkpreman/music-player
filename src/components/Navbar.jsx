import { Link,NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/" className="navbar-brand">
            <img src="/favicon.svg" alt="Pattu Logo" className="logo-image" />
            <span className="logo-text">Pattu</span>
            </Link>
        </div>

        <div className="navbar-links">
        <NavLink to="/allsongs" className="nav-link-active">All Songs</NavLink>
        <NavLink to="/playlists" className="nav-link-active">Playlists</NavLink>
        </div>
    </nav>
    )
}