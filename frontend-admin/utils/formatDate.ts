import moment from "moment";

export const formatDateToDDMMYYYY = (dateString: Date | string | number): string => {
  return moment(dateString).format("DD MMMM YYYY");
};

export const formatDateToRelative = (dateString: Date | string | number): string => {
  return moment(dateString).fromNow();
};
