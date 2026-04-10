import { computed, ref } from "vue";

type AnyRef = ReturnType<typeof ref>;

const stateMap = new Map<string, AnyRef>();

(globalThis as any).computed = computed;
(globalThis as any).useState = <T>(key: string, init?: () => T) => {
  if (!stateMap.has(key)) {
    stateMap.set(key, ref(init ? init() : undefined));
  }
  return stateMap.get(key);
};

(globalThis as any).__resetNuxtState = () => {
  stateMap.clear();
};
