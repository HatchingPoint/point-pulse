import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { checkPointCore } from "@hatchingpoint/point/core";
import { parsePointSource } from "@hatchingpoint/point/core";

const appSource = readFileSync(join(import.meta.dir, "../src/app.point"), "utf8");

describe("pulse app", () => {
	test("app.point passes point check", () => {
		expect(checkPointCore(parsePointSource(appSource))).toHaveLength(0);
	});

	test("includes health and tasks API routes", () => {
		expect(appSource).toContain('path "/api/health"');
		expect(appSource).toContain('path "/api/tasks"');
	});
});
