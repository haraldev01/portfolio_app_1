type BatchRequest<RequestType, ResponseType> = {
  payload: RequestType;
  resolve: (value: ResponseType | PromiseLike<ResponseType>) => void;
  reject: (reason?: any) => void;
};

export function createBatchProcessor<RequestType, ResponseType>(
  batchFunction: (payload: RequestType[]) => Promise<ResponseType[]>,
  timeout: number = 10,
  getId: (item: RequestType | ResponseType) => any, // Function to extract ID from request and response items
) {
  let pendingRequests: BatchRequest<RequestType, ResponseType>[] = [];
  let timeoutId: NodeJS.Timeout | null = null;
  let isBatchingInProgress = false;

  async function processBatch() {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      const batchPayload = pendingRequests.map((req) => req.payload);
      const currentPendingRequests = pendingRequests;
      pendingRequests = [];

      try {
        const response = await batchFunction(batchPayload);

        currentPendingRequests.forEach((req) => {
          const responseData = response.find(
            (item) => getId(item) === getId(req.payload),
          );
          if (responseData) {
            req.resolve(responseData);
          } else {
            req.reject(new Error("Response data not found"));
          }
        });
      } catch (error) {
        currentPendingRequests.forEach((req) => req.reject(error));
      } finally {
        isBatchingInProgress = false;

        // If there are new pending requests, process the next batch
        if (pendingRequests.length > 0) {
          processBatch();
        }
      }
    }, timeout);
  }

  return function requestBatch({
    payload,
  }: {
    payload: RequestType;
  }): Promise<ResponseType> {
    return new Promise((resolve, reject) => {
      pendingRequests.push({ payload, resolve, reject });

      if (!isBatchingInProgress) {
        isBatchingInProgress = true;
        processBatch();
      }
    });
  };
}
