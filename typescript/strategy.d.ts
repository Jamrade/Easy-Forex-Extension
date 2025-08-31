interface StrategyOperations {
    createFileUploadElements: () => undefined;
    readUpload: (file: File) => undefined;
    confirmSelectedStrategy: () => undefined;
}
declare class Strategy implements StrategyOperations {
    createFileUploadElements(): undefined;
    createHeader(): HTMLElement;
    createUploadArea(): HTMLElement;
    readUpload(file: File): undefined;
    confirmSelectedStrategy(): undefined;
}
//# sourceMappingURL=strategy.d.ts.map