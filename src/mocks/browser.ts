import { setupWorker, SetupWorkerApi } from "msw";
import { handlers } from "../mocks/handlers";
//브라우저 환경
export const worker: SetupWorkerApi = setupWorker(...handlers);
