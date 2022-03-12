import { useIntl } from "react-intl";

export const useFormatMessage = (messageId: string) => {
  return useIntl().formatMessage({ id: messageId });
};
