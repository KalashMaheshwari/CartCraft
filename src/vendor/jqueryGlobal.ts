import $ from "jquery";

/**
 * jQuery UI's UMD widgets read a bare global `jQuery` (their non-AMD branch is
 * `factory(jQuery)`). Vite/ESM hoists imports, so this assignment MUST live in
 * its own module that is imported *before* any jquery-ui module — that way the
 * global is set before jquery-ui evaluates.
 */
(window as unknown as { jQuery: typeof $; $: typeof $ }).jQuery = $;
(window as unknown as { jQuery: typeof $; $: typeof $ }).$ = $;

export default $;
