/**
 * Loads the jQuery UI slider widget + exactly the core modules it needs, in
 * dependency order. jquery-ui 1.14 ships UMD modules whose non-AMD branch only
 * attaches to the global `jQuery`, so we import the dependency chain explicitly
 * (version creates `$.ui`, widget creates `$.widget`, etc.) before the slider.
 */
import "./jqueryGlobal";
import "jquery-ui/ui/version";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/keycode";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/slider";
