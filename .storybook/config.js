import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "CarePlanner Playground",
  url: "#",
  hierarchySeparator: /\//
});

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
