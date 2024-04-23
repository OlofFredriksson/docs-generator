import fs from "node:fs/promises";
import { type Processor } from "../processor";
import { getOutputFilePath, haveOutput } from "../utils";

/**
 * @public
 */
export type Manifest = string[];

/**
 * Options for {@link manifestProcessor}.
 *
 * @public
 */
export interface ManifestProcessorOptions {
    /** If set, the manifest will be written as Markdown to this destination */
    markdown?: string;

    /** If set, the manifest will be written as JSON to this destination */
    json?: string;
}

function renderMarkdown(filePaths: string[]): string {
    return [
        "## Documentation manifest",
        "",
        "> Do not edit this file. It is a automatically generated by `@forsakringskassan/docs-generator`.",
        "",
        "```",
        ...filePaths,
        "```",
        "",
    ].join("\n");
}

function renderJSON(filePaths: string[]): string {
    return JSON.stringify(filePaths, null, 2);
}

/**
 * Write out a manifest listing all generated documents that will be present in
 * `outputFolder`.
 *
 * @public
 */
export function manifestProcessor(
    options: ManifestProcessorOptions,
): Processor {
    const { markdown, json } = options;
    return {
        name: "manifestProcessor",
        before: "render",
        async handler(context) {
            const docs = context.docs.filter(haveOutput);
            const filePaths = docs.map((doc) => {
                const { fileInfo } = doc;
                return getOutputFilePath("", fileInfo);
            });
            filePaths.sort();
            if (markdown) {
                const content = renderMarkdown(filePaths);
                await fs.writeFile(markdown, content, "utf-8");
            }
            if (json) {
                const manifest: Manifest = filePaths;
                const content = renderJSON(manifest);
                await fs.writeFile(json, content, "utf-8");
            }
        },
    };
}
