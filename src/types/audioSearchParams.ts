export default class AudioSearchParams {
  readonly includeTags?: Set<string>;
  readonly excludeTags?: Set<string>;
  readonly includeTagsMode?: "AND" | "OR";
  readonly pageNum?: number;
  readonly pageSize?: number;
  readonly sortBy?: "RECENT" | "LIKES" | "POPULAR" | "RELEVANT";

  constructor(params: Partial<AudioSearchParams> = {}) {
    this.includeTags = params.includeTags;
    this.excludeTags = params.excludeTags;
    this.includeTagsMode = params.includeTagsMode || "AND";
    this.pageNum = params.pageNum || 0;
    this.pageSize = params.pageSize || 20;
    this.sortBy = params.sortBy || "RECENT";
  }

  static parse(searchParams: {
    [key: string]: string | string[] | undefined;
  }): AudioSearchParams {
    const parseSet = (param: string | string[] | undefined): Set<string> => {
      const array = Array.isArray(param) ? param : [param];
      return new Set(
        array.filter((item): item is string => item !== undefined),
      );
    };

    return new AudioSearchParams({
      includeTags: parseSet(searchParams.includeTags),
      excludeTags: parseSet(searchParams.excludeTags),
      includeTagsMode: searchParams.includeTagsMode as "AND" | "OR",
      pageNum: searchParams.pageNum
        ? parseInt(searchParams.pageNum as string, 10)
        : undefined,
      pageSize: searchParams.pageSize
        ? parseInt(searchParams.pageSize as string, 10)
        : undefined,
      sortBy: searchParams.sortBy as
        | "RECENT"
        | "LIKES"
        | "POPULAR"
        | "RELEVANT",
    });
  }
}
