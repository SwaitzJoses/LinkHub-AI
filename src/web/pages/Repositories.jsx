import { useEffect, useState } from "react";
import { RepositoryService } from "../../emma-core/repository";

export default function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function loadRepositories() {
    const data = await RepositoryService.getAll();
    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function createRepository() {
    if (!name.trim()) return;

    await RepositoryService.create({
      name,
      description,
    });

    setName("");
    setDescription("");

    loadRepositories();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Repositories</h1>

      <input
        placeholder="Repository Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createRepository}>
        Create Repository
      </button>

      <hr />

      {repositories.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            marginBottom: 10,
          }}
        >
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
}