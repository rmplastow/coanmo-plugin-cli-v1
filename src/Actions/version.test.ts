import { ActionContextI } from "../CoAnMoPluginCli";
import { version } from "./version";
const { fn } = version;

const mockContext: ActionContextI = {
  $stdout: null,
  actions: [],
  doc: {} as Document,
  name: "Mock-Version",
  version: "1.2.3"
};

describe("version", () => {
  it("returns the expected string when passed no arguments", () => {
    expect(fn([], mockContext)).toBe("Mock-Version 1.2.3");
  });
  it("returns an error when passed one argument", () => {
    expect(fn(["oops"], mockContext)).toBe(
      "ERROR: 'version' expected 0 args, but got 1"
    );
  });
});