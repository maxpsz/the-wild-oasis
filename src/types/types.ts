import { Database } from "./database.types";

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type CabinInput = Database["public"]["Tables"]["cabins"]["Insert"];
