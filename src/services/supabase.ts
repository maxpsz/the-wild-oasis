import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseUrl = "https://rfecryfkbizbamsbrymh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZWNyeWZrYml6YmFtc2JyeW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1MTg5MDEsImV4cCI6MjAzNzA5NDkwMX0.S2jQFt-mDGpsQWRshWzjy2MPyMgb92P9xwmwEj91Kdo";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
