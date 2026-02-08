import Swal, { type SweetAlertIcon } from "sweetalert2";

type AlertOptions = {
  title: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  cancelText?: string;
};

const baseConfig = {
  allowOutsideClick: false,
  allowEscapeKey: false,
  showCloseButton: false,
  confirmButtonColor: "#2b7fff",
};

export const showAlert = ({
  title,
  text,
  html,
  icon = "info",
  confirmText = "OK",
}: AlertOptions) => {
  const formattedHtml =
    html ?? (text ? text.replace(/\n/g, "<br/>") : undefined);

  return Swal.fire({
    ...baseConfig,
    title,
    text: formattedHtml ? undefined : text,
    html: formattedHtml,
    icon,
    confirmButtonText: confirmText,
  });
};

export const showSuccess = (title: string, text?: string) => {
  return showAlert({
    title,
    text,
    icon: "success",
  });
};

export const showError = (title: string, text?: string) => {
  return showAlert({
    title,
    text,
    icon: "error",
  });
};

export const showConfirm = ({
  title,
  text,
  confirmText = "Yes",
  cancelText = "Cancel",
}: AlertOptions) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#2b7fff",
    cancelButtonColor: "#e8b33e",
  });
};
