export type ActionResponse<T> = {
    status: "success" | "error";
    data?: T;
    error?: string;
}