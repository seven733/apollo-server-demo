export const getPageInfo = (query: any) => {
  const limit = query.limit || 10;
  const skip = query.start || 0;

  return { limit, skip };
};
