
export enum View {
  UPLOAD = 'UPLOAD',
  SEARCH = 'SEARCH',
  GENERATE = 'GENERATE',
}

export interface Contract {
  id: string;
  name: string;
  content: string;
  uploadedAt: Date;
}
