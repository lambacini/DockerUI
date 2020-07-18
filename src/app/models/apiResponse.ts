export class ApiResponse<T> {
    success: boolean;
    message: string;
    internalMessage:string;
    errors: ApiValidationError[];
    data: T;
  }
  
  export class ApiValidationError {
    code: string;
    description: string;
    field: string;
  }
  
  export class PagedResult<T> {
    nextPageUrl: string;
    offset: number;
    pageNumber: number;
    pageSize: number;
    results :T[];
    totalNumberOfPages:number;
    totalNumberOfRecords:number;
  }
  