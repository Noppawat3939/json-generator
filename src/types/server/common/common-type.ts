import type { ObjectJsonValues } from "@/types";

export type DummyResources = "products" | "users" | "carts";
export type Model = Omit<ObjectJsonValues, "id">;
