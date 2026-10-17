import { createDefine } from "fresh";

/**
 * Shared app state threaded through middleware, layouts, and routes as
 * `ctx.state`. Add concrete fields here as middleware state grows.
 */
export type State = Record<string, unknown>;

/** Typed `define.page` / `define.handlers` / `define.middleware` helpers,
 * bound to this app's {@linkcode State}. */
export const define = createDefine<State>();
