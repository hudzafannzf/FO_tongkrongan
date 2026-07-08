function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard Tenant</h1>

      <hr />

      <p>Username : {user.username}</p>
      <p>Email : {user.email}</p>
      <p>Role : {user.role}</p>
    </div>
  );
}

export default Dashboard;