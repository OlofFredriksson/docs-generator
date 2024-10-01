import markdownIt from "markdown-it";
import { type Document } from "../document";
import { type ExampleResult } from "../examples/example-result";
import { processInlineTags } from "./process-inline-tags";
import inlineTags from "./inline-tags";
import {
    codeInline,
    codePreview,
    headingLevel,
    imageResources,
    containerRenderer,
    table,
} from "./markdown";
import { MarkdownEnv } from "./markdown-env";
import { SoftErrorType } from "./soft-error";

/**
 * Options for [[createMarkdownRenderer]].
 *
 * @public
 */
export interface MarkdownOptions {
    /** List of all available documents */
    readonly docs: Document[];

    /** Callback for adding a static resource */
    addResource(dst: string, src: string): void;

    /** Callback when an example should be generated */
    generateExample(options: {
        source: string;
        language: string;
        filename: string;
        tags: string[];
    }): ExampleResult;

    /**
     * Handle error which can be recovered from.
     *
     * If a string is returned it replaces the intended content but otherwise
     * continues rendering.
     *
     * If the exception is rethrown it will cause the renderer to bail out.
     *
     * @param error - The error to be handled.
     * @returns A replacement string or rethrows error.
     */
    handleSoftError(error: SoftErrorType): string;
}

/**
 * Markdown renderer.
 *
 * @public
 */
export interface MarkdownRenderer {
    /**
     * Render given markdown content to HTML
     *
     * @param doc - Document metadata.
     * @param content - Markdown content to render.
     * @returns HTML rendered from markdown content.
     */
    render(doc: Document, content: string): string;
}

/**
 * @public
 */
export function createMarkdownRenderer(
    options: MarkdownOptions,
): MarkdownRenderer {
    const { docs } = options;
    const env: MarkdownEnv = {
        fileInfo: {
            fullPath: "",
            name: "",
            path: "",
            outputName: false,
        },
        ids: new Set(),
    };

    const included = new Set<string>();
    const md = markdownIt({
        html: true,
    });
    md.use(
        codePreview({
            generateExample: options.generateExample,
        }),
    );
    md.use(headingLevel({ initialLevel: 1 }));
    md.use(
        imageResources({
            addResource: options.addResource,
        }),
    );
    md.use(containerRenderer(docs, env, included, options.handleSoftError));
    md.use(table());
    md.use(codeInline());

    return {
        render(doc: Document, content: string): string {
            included.clear();
            included.add(doc.id);
            env.fileInfo = doc.fileInfo;
            env.ids = new Set();
            const html = md.render(content, env);
            return processInlineTags(
                inlineTags,
                doc,
                docs,
                html,
                options.handleSoftError,
            );
        },
    };
}
