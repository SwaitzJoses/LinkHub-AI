import { useEffect, useState } from "react";
import { RepositoryService } from "../emma-core/repository";
import { supabase } from "../lib/supabase";

export default function EmmaHome() {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  

 useEffect(() => {
  loadRepositories();

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION:", session);
  }

  checkSession();
}, []);

  async function loadRepositories() {
    try {
      const repos = await RepositoryService.getAll();
      setRepositories(repos);
    } catch (err) {
      console.error(err);
    }
  }

  async function createRepository() {
    if (!name.trim()) return;

    try {
      await RepositoryService.create({
        name,
        description,
      });

      setName("");
      setDescription("");

      loadRepositories();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1>Emma</h1>

      <h2>Repositories</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          value={name}
          placeholder="Repository Name"
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button onClick={createRepository}>
          Create Repository
        </button>
      </div>

      <hr />

      {repositories.length === 0 && (
        <p>No repositories yet.</p>
      )}

      {repositories.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
          }}
        >
          <h3>{repo.name}</h3>

          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
}