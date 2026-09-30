import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  const [sidebar, setSidebar] = useState<boolean>(true);

  return (
    <div className="layout">
      {/* Top bar navigation */}
      <AppBar position="static" sx={{ backgroundColor: "darkred" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setSidebar(!sidebar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokédex
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Sidebar Navigation */}
        {sidebar && (
          <nav className="sidebar">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Pokédex
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My favorites
            </NavLink>
          </nav>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default App;
