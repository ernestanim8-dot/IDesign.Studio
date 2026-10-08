import type { IncomingMessage, ServerResponse } from "node:http";

export function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void>;
export const server: import("node:http").Server;
