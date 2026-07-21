const ENABLE_DEVTOOLS: boolean = true;
const SHOW_CONSOLE_LOG: boolean = true;

export function log(...args: any[]): void {
    if (ENABLE_DEVTOOLS) {
        if (SHOW_CONSOLE_LOG) {
            let output: string = '';
            args.forEach((element: any) => {
                output += ['string', 'number'].find(e => e == typeof (element)) ? element : JSON.stringify(element);
            });
            console.log(output);
        }
    }
}

export function delay(timeout: number, signal?: AbortSignal): Promise<void> {
    if (ENABLE_DEVTOOLS)
        return new Promise((resolve, reject) => {
            const id = setTimeout(resolve, timeout);

            signal && signal.addEventListener("abort", () => {
                clearTimeout(id);

                reject(new DOMException(
                    "Cancelled",
                    "AbortError"));
            });
        });
    return Promise.resolve();
}