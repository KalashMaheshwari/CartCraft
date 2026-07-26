import { useEffect, useRef } from "react";
import "@/vendor/jqueryUiSlider"; // imperative jQuery UI widget (see vendor/)
import $ from "jquery";

interface Props {
  min: number;
  max: number;
  onChange: (values: [number, number]) => void;
}

/** Local type for the jQuery UI slider plugin (augmentation kept loose). */
type SliderPlugin = {
  slider(...args: unknown[]): void;
};

type SliderUI = { values: number[] };

/**
 * PriceRangeSlider — a jQuery UI range slider wrapped in React.
 *
 * This is the one deliberate stateful presentational component: jQuery UI
 * mutates the DOM node imperatively while React is declarative. `useRef` hands
 * jQuery a stable node it can own outside React's render cycle; the `useEffect`
 * cleanup destroys the widget so bindings never duplicate on re-render.
 */
function PriceRangeSlider({ min, max, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange; // always call the latest handler without re-init

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const $el = $(el) as unknown as SliderPlugin;

    $el.slider({
      range: true,
      min,
      max,
      values: [min, max],
      // `slide` fires during drag (live filtering); `change` covers keyboard
      // adjustments and programmatic changes.
      slide: (_e: unknown, ui: SliderUI) => onChangeRef.current([ui.values[0], ui.values[1]]),
      change: (_e: unknown, ui: SliderUI) => onChangeRef.current([ui.values[0], ui.values[1]]),
    });

    return () => {
      try {
        $el.slider("destroy");
      } catch {
        /* already torn down */
      }
    };
  }, [min, max]);

  return <div ref={ref} className="cc-price-slider" />;
}

export default PriceRangeSlider;
