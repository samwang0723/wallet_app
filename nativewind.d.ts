/// <reference types="nativewind/types" />

declare module 'nativewind' {
    export const NativeWindStyleSheet: {
        setOutput: (config: { default: string }) => void;
    };
}