// Status: 1 - pending, 2 - prepared, 3 - taken, 4 - in transport, 5 - arrived, 6 - completed

const statuses: { [index: string]: string } = {
  "1": "Pending",
  "2": "Prepared",
  "3": "Taken",
  "4": "In Transport",
  "5": "Arrived",
  "6": "Completed",
};

export const getTransportOrderStatusLabel = (status?: number) => {
  if (!status || (status && (status > 6 || status < 1))) {
    throw Error("Status can be int from 1 to 6");
  }
  return statuses[status];
};
