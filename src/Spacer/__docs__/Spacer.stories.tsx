import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Spacer, { SpacerColumn, SpacerRow } from "..";

const meta: Meta<typeof Spacer> = {
  title: "Spacer",
  component: Spacer,
  tags: ["autodocs"],
  args: {
    gap: 12,
    children: "input_button",
  },
  argTypes: {
    children: {
      control: {
        type: "select",
        labels: {
          input_button: "Input + Button",
          radio_label: "Radio + Label",
        },
      },
      options: ["input_button", "radio_label"],
      mapping: {
        input_button: (
          <>
            <input placeholder="Input" />
            <button>Button</button>
          </>
        ),
        radio_label: (
          <>
            <input type="radio" id="radio" />
            <label htmlFor="radio">Label</label>
          </>
        ),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "lightgreen", height: 100 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Spacer>;

export const Main: Story = {
  name: "Spacer",
  args: {
    middle: true,
    maxHeight: true,
  },
};
