/* c8 ignore start */
export type Json = Record<string, unknown>;

export interface PagingCursor {
  before?: string;
  after?: string;
}

export interface Paging {
  cursors?: PagingCursor;
}

export interface ListResponse<T> extends Json {
  items: T[];
  paging?: Paging;
}

export interface VerifyPlayerTokenRequest extends Json {
  token: string;
}

export interface VerifyPlayerTokenResponse extends Json {
  tag?: string;
  token?: string;
  status?: string;
}
/* c8 ignore stop */
