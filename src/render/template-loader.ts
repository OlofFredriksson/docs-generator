import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { type Callback, type ILoaderAsync, type LoaderSource } from "nunjucks";

interface ResolvedTemplate {
    filePath: string;
    content: string;
}

/**
 * @internal
 */
export class TemplateLoader implements ILoaderAsync {
    public readonly async = true as const;
    private readonly folders: string[];
    private readonly templateCache: Map<string, ResolvedTemplate>;

    public constructor(folders: string[] = []) {
        this.folders = [...folders, path.join(__dirname, "../templates")];
        this.templateCache = new Map();
    }

    public async getSource(
        name: string,
        callback: Callback<Error, LoaderSource>,
    ): Promise<void> {
        try {
            const { content, filePath } = await this.resolveTemplate(name);
            callback(null, {
                src: content,
                path: filePath,
                noCache: false,
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                callback(err, null);
            } else {
                callback(new Error(String(err)), null);
            }
        }
    }

    private async resolveTemplate(name: string): Promise<ResolvedTemplate> {
        const { templateCache, folders } = this;
        const cached = templateCache.get(name);
        if (cached) {
            return cached;
        }
        const searchPaths = folders.map((it) => path.join(it, name));
        const filePath = searchPaths.find((it) => existsSync(it));
        if (!filePath) {
            const searched = folders.map((it) => `  - "${it}"`).join("\n");
            const message = `Failed to resolve template "${name}", searched in:

${searched}

Make sure the name is correct and the template file exists in one of the listed directories.`;
            throw new Error(message);
        }
        const content = await fs.readFile(filePath, "utf-8");
        const resolved = { content, filePath };
        templateCache.set(name, resolved);
        return resolved;
    }
}
