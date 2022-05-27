declare module 'corpora-project' {  

  export type CorporaEntity = {
    name: string;
    isDirectory: boolean;
    get(): CorporaDictionary;
  }
  
  export type CorporaDictionary = {
    description: string;
    [key as string]: unknown;
  }

  export function getCategories(category?: string, type?: string): string[];
  
  export function getFiles(path?: string): CorporaEntity[];
  
  export function getFile(category: string, filename: string): CorporaDictionary;
}