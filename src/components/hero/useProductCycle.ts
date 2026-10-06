import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A = outgoing → up-left,  incoming from down-right → centre
 * B = outgoing → down-right, incoming from up-left → centre
 */
export type Direction = 'A' | 'B';

interface CycleState {
  index: number;
  /** direction of the most recent transition */
  direction: Direction;
  /** number of transitions so far — drives alternation + layer stacking */
  count: number;
}

interface Options {
  holdMs: number;
  transitionMs: number;
}

const preload = (src: string): Promise<void> => {
  const img = new Image();
  img.src = src;
  return img.decode ? img.decode().catch(() => undefined) : Promise.resolve();
};

/**
 * Single transition controller for the hero. Product, colour environment,
 * metadata, preview and selector all read from this one state, so they
 * always change in the same frame.
 */
export function useProductCycle<T extends { image: string }>(items: T[], { holdMs, transitionMs }: Options) {
  const [state, setState] = useState<CycleState>({ index: 0, direction: 'B', count: 0 });
  const busy = useRef(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Warm the cache with every product up front.
  useEffect(() => {
    items.forEach((p) => void preload(p.image));
  }, [items]);

  const goTo = useCallback(
    async (target: number) => {
      const { index } = stateRef.current;
      if (busy.current || target === index || !items[target]) return;
      busy.current = true;
      await preload(items[target].image); // never start a transition with an unloaded image
      setState((s) => ({
        index: target,
        // 1st transition = A, 2nd = B, 3rd = A …
        direction: s.count % 2 === 0 ? 'A' : 'B',
        count: s.count + 1,
      }));
      window.setTimeout(() => {
        busy.current = false;
      }, transitionMs);
    },
    [items, transitionMs],
  );

  const next = useCallback(() => goTo((stateRef.current.index + 1) % items.length), [goTo, items.length]);

  // Auto-advance: HOLD after the transition has finished, then the next transition.
  useEffect(() => {
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === 'visible') {
        timer = window.setTimeout(next, transitionMs + holdMs);
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [state.count, next, holdMs, transitionMs]);

  return {
    index: state.index,
    direction: state.direction,
    count: state.count,
    current: items[state.index],
    upcoming: items[(state.index + 1) % items.length],
    goTo,
    next,
  };
}
