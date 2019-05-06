const getPageInfo = query => {
  const limit = query.limit || 10;
  const skip = query.start || 0;

  return { limit, skip };
}

module.exports = {
  getPageInfo
}