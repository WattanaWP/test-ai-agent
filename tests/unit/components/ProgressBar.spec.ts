import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ProgressBar from "~/components/diary/ProgressBar.vue";

describe("ProgressBar", () => {
  it("renders percentage text and width", () => {
    const wrapper = mount(ProgressBar, { props: { percent: 75 } });
    expect(wrapper.text()).toContain("75%");

    const bar = wrapper.find('[style*="width: 75%"]');
    expect((bar.element as HTMLElement).style.width).toBe("75%");
  });

  it("uses yellow style for low progress", () => {
    const wrapper = mount(ProgressBar, { props: { percent: 30 } });
    expect(wrapper.html()).toContain("bg-yellow-400");
    expect(wrapper.html()).toContain("text-yellow-600");
  });

  it("uses green style at 100 percent", () => {
    const wrapper = mount(ProgressBar, { props: { percent: 100 } });
    expect(wrapper.html()).toContain("bg-green-500");
    expect(wrapper.html()).toContain("text-green-600");
  });
});
