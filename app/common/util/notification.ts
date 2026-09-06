import { notification } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

const showNotification = (
  type: NotificationType,
  title: string,
  description?: string
) => {
  notification[type]({
    title,
    description,
    placement: "topRight",
  });
};

export const notify = {
  success: (title: string, description?: string) =>
    showNotification("success", title, description),

  error: (title: string, description?: string) =>
    showNotification("error", title, description),

  warning: (title: string, description?: string) =>
    showNotification("warning", title, description),

  info: (title: string, description?: string) =>
    showNotification("info", title, description),
};