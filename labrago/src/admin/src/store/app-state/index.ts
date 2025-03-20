import { NameCaptionEntity } from "@/types/entity";
import { makeVar } from "@apollo/client";

export const enum AppStatusEvent {
    UP = 'UP',
    CODE_GENERATION_STARTED = 'CODE_GENERATION_STARTED',
    CODE_GENERATION_COMPLETED = 'CODE_GENERATION_COMPLETED',
    CODE_GENERATION_FAILED = 'CODE_GENERATION_FAILED',
    CODE_GENERATION_REVERTED = 'CODE_GENERATION_REVERTED',
    SHUTDOWN = 'SHUTDOWN',
}


export const appStatusVar = makeVar<AppStatusEvent>(AppStatusEvent.UP);
export const entitiesInCodeGenerationVar = makeVar<NameCaptionEntity[]>([]);
