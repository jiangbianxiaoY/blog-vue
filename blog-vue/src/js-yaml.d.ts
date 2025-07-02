



declare module 'js-yaml' {
    export function load(text: string): any;

    export function dump(input: any, options?: any): string;

}


declare module 'markdown-it' {
    export default class MarkdownIt {
        constructor(options?: any);
        render(text: string): string;
    }   
}