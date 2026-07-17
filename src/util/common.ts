const SHOW_CONSOLE_LOG: boolean = false;

export function log(...args: any[]): void {
    if (SHOW_CONSOLE_LOG) {
        console.log(args);
    }
}