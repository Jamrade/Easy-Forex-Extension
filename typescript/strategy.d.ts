interface StrategyOperations {
    readUpload: () => string;
    confirmSelectedStrategy: () => undefined;
    initializeSelectedStrategy: () => undefined;
    initializeMarketConnection: () => undefined;
}
declare class Strategy implements StrategyOperations {
    createFileUploadElements(): void;
    createHeader(): HTMLElement;
    createUploadArea(): HTMLElement;
    readUpload(): string;
    confirmSelectedStrategy(): undefined;
    initializeSelectedStrategy(): undefined;
    initializeMarketConnection(): undefined;
}
//# sourceMappingURL=strategy.d.ts.map