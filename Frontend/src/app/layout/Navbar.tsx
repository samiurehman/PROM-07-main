import { Button, Container, Typography } from "@mui/material";
import { LocalPolice } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigationToLogin = () => {
    navigate("/login");
  };
  const handleNavigationToregistration = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="h-[60px] flex items-center bg-[#ffffff] shadow ">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center justify-between w-[30%] hover:bg-[#fafafa] bg-[#fafafa] p-[5px] shadow"
            >
              <LocalPolice />
              <Typography
                variant="h5"
                sx={{ marginBottom: "1px" }}
                gutterBottom
              >
                DURHAM CONSTABULARY
              </Typography>
            </Link>

            <div>
              <Button
                variant="outlined"
                style={{ marginRight: "10px" }}
                onClick={handleNavigationToLogin}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={handleNavigationToregistration}
              >
                Register
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
