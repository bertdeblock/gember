import {
  classBased,
  defineGenerator,
  defineTestGenerator,
  nested,
  typescript,
  type Generator,
} from "./generator.js";

export const generators: Generator[] = [
  defineGenerator({
    args: [
      classBased({ functionBasedName: "template-only" }),
      nested({
        description:
          "Generate a nested colocated component, e.g. `foo/bar/index.gts`",
      }),
      typescript({ gts: true }),
    ],
    name: "component",
  }),

  defineTestGenerator({
    args: [typescript({ gts: true })],
    name: "component",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [classBased(), typescript()],
    name: "helper",
  }),

  defineTestGenerator({
    args: [typescript({ gts: true })],
    name: "helper",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [classBased(), typescript()],
    name: "modifier",
  }),

  defineTestGenerator({
    args: [typescript({ gts: true })],
    name: "modifier",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [typescript()],
    name: "service",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "service",
    testsDir: "unit",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "acceptance",
    testsDir: "acceptance",
    testsSubDir: "",
  }),
];
