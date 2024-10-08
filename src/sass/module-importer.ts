import fs from "node:fs/promises";
import nativePath from "node:path";
import posixPath from "node:path/posix";
import { fileURLToPath, pathToFileURL } from "node:url";
import { type Importer, type ImporterResult } from "sass";

function resolveScssImport(
    filePath: string,
    throwError: boolean = true,
): URL | null {
    const { dir, base } = posixPath.parse(filePath);
    const search = [`${base}.css`, `${base}.scss`, `_${base}.scss`, `${base}`];
    for (const variant of search) {
        try {
            const moduleName = posixPath.join(dir, variant);

            const resolved = require.resolve(moduleName);
            return pathToFileURL(resolved);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- no comment.
        } catch (err: any) {
            if (err.code !== "MODULE_NOT_FOUND") {
                throw err;
            }
        }
    }
    if (throwError) {
        throw new Error(`Failed to resolve "${filePath}"`);
    }
    return null;
}

/**
 * @internal
 */
const WEBPACK_NODE_MODULE_PREFIX = "~";
export const moduleImporter: Importer = {
    canonicalize(url: string): URL | null {
        const indexOfPrefix = url.indexOf(WEBPACK_NODE_MODULE_PREFIX);
        if (indexOfPrefix >= 0) {
            return resolveScssImport(url.slice(indexOfPrefix + 1));
        }
        if (url.startsWith("file://")) {
            const path = fileURLToPath(url);
            const relative = nativePath.isAbsolute(path)
                ? nativePath.relative(__dirname, path)
                : path;
            return resolveScssImport(relative.replace(/\\/g, "/"));
        }
        return resolveScssImport(url, false);
    },
    async load(url: URL): Promise<ImporterResult> {
        const filepath = fileURLToPath(url);
        const parsed = nativePath.parse(filepath);
        const contents = await fs.readFile(filepath, "utf-8");
        return {
            contents,
            syntax: parsed.ext.slice(1) === "scss" ? "scss" : "css",
        };
    },
};
