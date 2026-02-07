import Swal, { type SweetAlertIcon } from "sweetalert2";

type AlertOptions = {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  cancelText?: string;
};

/* ======================
   Base Config
====================== */
const baseConfig = {
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
  showCloseButton: false,
  confirmButtonColor: "#2b7fff",
};

/* ======================
   Basic Alert
====================== */
export const showAlert = ({
  title,
  text,
  icon = "info",
  confirmText = "OK",
}: AlertOptions) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon,
    confirmButtonText: confirmText,
  });
};

/* ======================
   Success
====================== */
export const showSuccess = (title: string, text?: string) => {
  return showAlert({
    title,
    text,
    icon: "success",
  });
};

/* ======================
   Error
====================== */
export const showError = (title: string, text?: string) => {
  return showAlert({
    title,
    text,
    icon: "error",
  });
};

/* ======================
   Confirm Dialog
====================== */
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
    confirmButtonColor: "#e8b33e",
    cancelButtonColor: "#e8b33e",
  });
};
