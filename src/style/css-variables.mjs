export default {
    "*": {
        description: "Global styling, e.g. default values.",
        variables: {
            "font-family": {
                description: "Default `font-family`.",
                type: "font",
                value: `arial, "Helvetica Neue", sans-serif`,
            },
            "font-weight": {
                description: "Default `font-weight`.",
                value: "normal",
            },
            "text-color-default": {
                description: "Default text color for regular text.",
                type: "color",
                value: "#1b1e23",
            },
            "text-color-discrete": {
                description:
                    "Default text color for discrete text (text that is less important, usually appears a bit dimmer than regular text",
                type: "color",
                value: "#5f6165",
            },
            "text-color-link": {
                description: "Link text color.",
                type: "color",
                value: "#4a52b6",
            },
            "text-color-link-hover": {
                description: "Link text color.",
                type: "color",
                value: "#1b1e23",
            },
            "info-color": {
                description: "Default info color.",
                type: "color",
                value: "#4a52b6",
            },
            "info-background": {
                description: "Default info background.",
                type: "color",
                value: "#f5f6fa",
            },
            "warning-color": {
                description: "Default warning color.",
                type: "color",
                value: "#ffbe10",
            },
            "warning-background": {
                description: "Default warning background.",
                type: "color",
                value: "#fffcf3",
            },
            "error-color": {
                description: "Default warning color.",
                type: "color",
                value: "#ca1515",
            },
            "error-background": {
                description: "Default warning background.",
                type: "color",
                value: "#fcf3f3",
            },
        },
    },

    heading: {
        description: "Headings h1, h2, etc.",
        variables: {
            "font-family": {
                type: "font",
                value: `var(--docs-font-family)`,
            },
            "font-weight": { value: "var(--docs-font-weight)" },
            "line-height": { value: "1.4" },
        },
    },

    header: {
        description: "Style related to page header",
        variables: {
            "text-color-default": {
                description:
                    "`--docs-text-color-default` is overridden with this value.",
                type: "color",
                value: "#1b1e23",
            },
            "text-color-discrete": {
                description:
                    "`--docs-text-color-discrete` is overridden with this value.",
                type: "color",
                value: "#5f6165",
            },
        },
    },

    menu: {
        description: "Style related to the sidebar menu.",
        variables: {
            "width-expanded": {
                description: "Width of sidebar in desktop resolution.",
                value: "230px",
            },
        },
    },

    messagebox: {
        description: "Style related to markdown messageboxes.",
        variables: {
            "info-border": {
                description: "Border color for info variant",
                type: "color",
                value: "var(--docs-info-color)",
            },
            "info-background": {
                description: "Background color for info variant",
                type: "color",
                value: "var(--docs-info-background)",
            },
            "warning-border": {
                description: "Border color for warning variant",
                type: "color",
                value: "var(--docs-warning-color)",
            },
            "warning-background": {
                description: "Background color for warning variant",
                type: "color",
                value: "var(--docs-warning-background)",
            },
            "danger-border": {
                description: "Border color for danger variant",
                type: "color",
                value: "var(--docs-error-color)",
            },
            "danger-background": {
                description: "Background color for danger variant",
                type: "color",
                value: "var(--docs-error-background)",
            },
        },
    },

    tags: {
        description: "Style for documentation tags",
        variables: {
            "optional-background-color": {
                description: "Optional tag background color",
                type: "color",
                value: "transparent",
            },
            "optional-border-color": {
                description: "Optional tag border color",
                type: "color",
                value: "#5f6165",
            },
            "optional-text-color": {
                description: "Optional tag text color",
                type: "color",
                value: "var(--docs-text-color-discrete)",
            },
        },
    },

    version: {
        description: "Version processor",
        variables: {
            "text-color": {
                description: "Text color",
                type: "color",
                value: "var(--docs-text-color-discrete)",
            },
            "link-color": {
                description: "Link color",
                type: "color",
                value: "var(--docs-text-color-discrete)",
            },
            "hover-color": {
                description: "Link color",
                type: "color",
                value: "var(--docs-text-color-default)",
            },
        },
    },

    cookie: {
        description: "Cookie processor",
        variables: {
            "background-color": {
                description: "Background color",
                type: "color",
                value: "#f5f6fa",
            },
            "border-color": {
                description: "Border color",
                type: "color",
                value: "#4a52b6",
            },
        },
    },
};
