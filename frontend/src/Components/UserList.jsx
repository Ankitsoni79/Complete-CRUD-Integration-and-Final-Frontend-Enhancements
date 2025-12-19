import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    setMessage(data.message);
    setName("");
    setEmail("");
    fetchUsers();
  };

  const startEdit = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = async () => {
    const res = await fetch(
      `http://localhost:5000/api/users/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      }
    );

    const data = await res.json();
    setMessage(data.message);
    setEditId(null);
    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const res = await fetch(
      `http://localhost:5000/api/users/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    setMessage(data.message);
    fetchUsers();
  };

  return (
    <>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={editId ? updateUser : addUser}>
        {editId ? "Update User" : "Add User"}
      </button>

      {message && <p>{message}</p>}

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => startEdit(u)} style={{ marginRight: "8px" }}>Edit</button>
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
