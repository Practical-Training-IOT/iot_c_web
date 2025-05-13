declare module 'splitting' {
    interface SplittingResult {
        el: HTMLElement
        items: Array<{
            el: HTMLElement
            wordIndex?: number
            charIndex?: number
        }>
    }

    const Splitting: {
        (): SplittingResult[]
        HTMLInit: () => void
        by: (selector: string, options: any) => void
    }

    export default Splitting
}