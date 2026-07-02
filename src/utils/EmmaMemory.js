import { supabase } from "../lib/supabase";

// Save today's mission
export async function saveMission(userId, mission) {
  const { error } = await supabase.from("emma_memory").insert({
    user_id: userId,
    mission,
  });

  if (error) console.error(error);
}

// Complete mission
export async function completeMission(id) {
  const { error } = await supabase
    .from("emma_memory")
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) console.error(error);
}

// Get latest mission
export async function getLatestMission(userId) {
  const { data, error } = await supabase
    .from("emma_memory")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return null;
  }

  return data.length ? data[0] : null;
}

// Get all missions
export async function getMissionHistory(userId) {
  const { data, error } = await supabase
    .from("emma_memory")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}