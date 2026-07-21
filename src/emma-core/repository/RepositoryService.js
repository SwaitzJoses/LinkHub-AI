import { supabase } from "../../lib/supabase";
import { createRepository } from "./RepositoryTypes";

class RepositoryService {
  /**
   * Create a new repository
   */
  async create({ name, description = "" }) {
    const { data, error } = await supabase
      .from("repositories")
      .insert({
        name,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    return createRepository({
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  /**
   * Get all repositories
   */
  async getAll() {
    const { data, error } = await supabase
      .from("repositories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map(repo =>
      createRepository({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
      })
    );
  }

  /**
   * Get repository by id
   */
  async getById(id) {
    const { data, error } = await supabase
      .from("repositories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return createRepository({
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }
}

export default new RepositoryService();