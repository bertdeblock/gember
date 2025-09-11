import {
  classBased,
  defineGenerator,
  defineTestGenerator,
  name,
  nested,
  path,
  typescript,
  type Generator,
} from "./generator.js";

export const generators: Generator[] = [
  defineGenerator({
    args: [
      classBased({ functionBasedName: "template-only" }),
      name(),
      nested({
        description:
          "Generate a nested colocated component, e.g. `foo/bar/index.gts`",
      }),
      path(),
      typescript({ gts: true }),
    ],
    name: "component",
  }),

  defineTestGenerator({
    args: [name(), path(), typescript({ gts: true })],
    name: "component",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [classBased(), name(), path(), typescript()],
    name: "helper",
  }),

  defineTestGenerator({
    args: [name(), path(), typescript({ gts: true })],
    name: "helper",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [classBased(), name(), path(), typescript()],
    name: "modifier",
  }),

  defineTestGenerator({
    args: [name(), path(), typescript({ gts: true })],
    name: "modifier",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [name(), path(), typescript()],
    name: "service",
  }),

  defineTestGenerator({
    args: [name(), path(), typescript()],
    name: "service",
    testsDir: "unit",
  }),

  defineTestGenerator({
    args: [name(), path(), typescript()],
    name: "acceptance",
    testsDir: "acceptance",
    testsSubDir: "",
  }),
];
