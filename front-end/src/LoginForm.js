export function LoginForm(params) {
  const handleChange = (event) => {
    let newCredentials = { ...params.credentials };
    newCredentials[event.target.name] = event.target.value;
    params.setCredentials(newCredentials);
  };

  return (
    <div className="box" style={{ maxWidth: "unset" }}>
      {params.currentUser ? (
        <div>
          <button onClick={params.login}>Logout</button>
          &nbsp;User:{" "}
          <span style={{ fontWeight: "bold" }}>{params.currentUser.user}</span>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="user">User: </label>
            <input
              type="text"
              size={10}
              id="user"
              name="user"
              value={params.credentials.user}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              size={10}
              id="password"
              name="password"
              value={params.credentials.password}
              onChange={handleChange}
            />
          </div>
          <button onClick={params.login}>Login</button>
          &nbsp;User: <span style={{ fontWeight: "bold" }}>not logged in</span>
        </div>
      )}
    </div>
  );
}
