export const getTransportOrderArticleStatus = (status?: number) => {
  if (status === 2) {
    return "Added";
  }

  return "Pending";
};
