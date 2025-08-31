import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import NotificationContainer from "./components/others/NotificationContainer";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [authData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  }, [])

  const handleLogin = (email, password) => {

    if (email === "admin@example.com" && password === "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (authData && authData.employees) {
      const employee = authData.employees.find(
        (e) => e.email === email && e.password === password)

      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee)
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      } else {
        alert("Invalid Credentials");
      }

    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 transition-all">
          <NotificationContainer />
          {!user ? <Login handleLogin={handleLogin} /> : ""}
          {user == "admin" ? (
            <AdminDashboard changeUser={setUser} />
          ) : user == "employee" ? (
            <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
          ) : null}
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default App;
