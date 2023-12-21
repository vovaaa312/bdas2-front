export interface BinaryContent {
    id: number;
    fileName: string;
    fileType: string;
    fileExtension: string;
    content: Uint8Array;
    uploadDate: Date;
    modificationDate: Date;
    operationPerformed: string;
    performedBy: number;
}


