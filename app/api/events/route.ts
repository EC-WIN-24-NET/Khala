// https://nextjs.org/blog/building-apis-with-nextjs
import type { NextRequest } from "next/server";
import { genericApiHandler, type HandlerConfig } from "@api/genericApiHandler";
import type { EventData } from "@api/types";

// This is the specific configuration for our `/api/events` endpoint.
const eventsConfig: HandlerConfig<EventData[]> = {
	// The path on the external APIM service
	endpointPath: "/forge/api/event/GetAllEvents",
	// We only allow GET requests to this endpoint
	allowedMethod: "GET",
	// Cache the result on the server for 1 minute (60 seconds) to reduce API calls
	revalidate: 60,
};

// We export a GET function, which Next.js recognizes as the handler for GET requests.
export async function GET(req: NextRequest) {
	// The call is simple because the generic handler does all the work!
	return genericApiHandler<EventData[]>(req, eventsConfig);
}
