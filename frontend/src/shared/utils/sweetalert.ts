import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, message: string) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#3085d6",
  });
};

export const showErrorAlert = (title: string, message: string) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#d33",
  });
};