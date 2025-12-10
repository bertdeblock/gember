import { GemberBugError } from "../errors.js";
import {
  classBased,
  defineGenerator,
  defineTestGenerator,
  namedExport,
  nested,
  test,
  testGeneratorName,
  typescript,
  type Generator,
} from "./generator.js";

export const generators: Generator[] = [
  defineTestGenerator({
    args: [typescript()],
    name: "acceptance",
    testsDir: "acceptance",
    testsSubDir: "",
  }),

  defineGenerator({
    args: [
      classBased({ functionBasedName: "template-only" }),
      namedExport(),
      nested({
        description:
          "Generate a nested colocated component, e.g. `foo/bar/index.gts`",
      }),
      test(),
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
    args: [test(), typescript()],
    name: "controller",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "controller",
    testsDir: "unit",
  }),

  defineGenerator({
    args: [classBased(), namedExport(), test(), typescript()],
    name: "helper",
  }),

  defineTestGenerator({
    args: [typescript({ gts: true })],
    name: "helper",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [classBased(), namedExport(), test(), typescript()],
    name: "modifier",
  }),

  defineTestGenerator({
    args: [typescript({ gts: true })],
    name: "modifier",
    testsDir: "integration",
  }),

  defineGenerator({
    args: [test(), typescript()],
    name: "route",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "route",
    testsDir: "unit",
  }),

  defineGenerator({
    args: [test(), typescript()],
    name: "service",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "service",
    testsDir: "unit",
  }),

  defineGenerator({
    args: [namedExport(), test(), typescript()],
    name: "util",
  }),

  defineTestGenerator({
    args: [typescript()],
    name: "util",
    testsDir: "unit",
  }),
];

export function getGenerator(generatorName: string): Generator {
  const generator = generators.find(
    (generator) => generator.name === generatorName,
  );

  if (generator === undefined) {
    throw new GemberBugError(`Could not find generator \`${generatorName}\`.`);
  }

  return generator;
}

export function getTestGenerator(generatorName: string): Generator {
  return getGenerator(testGeneratorName(generatorName));
}
