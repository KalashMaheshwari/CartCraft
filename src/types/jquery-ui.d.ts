import "jquery";

declare module "jquery" {
  interface JQuery<TElement extends HTMLElement = HTMLElement> {
    slider(
      optionsOrMethod?: string | Record<string, unknown>,
      name?: unknown,
      value?: unknown
    ): JQuery<TElement>;
  }
}

declare module "jquery-ui/ui/version";
declare module "jquery-ui/ui/widget";
declare module "jquery-ui/ui/keycode";
declare module "jquery-ui/ui/widgets/mouse";
declare module "jquery-ui/ui/widgets/slider";
