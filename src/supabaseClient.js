import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cvnkkgjdsiblhghabyvx.supabase.co";
const supabaseKey = "sb_publishable_XVK6PdDZF4iozfOE376zIw_6yWzG5bg";

export const supabase = createClient(supabaseUrl, supabaseKey);