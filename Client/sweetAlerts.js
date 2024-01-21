import Swal from 'sweetalert2'

export const successAlert = (notificationMessage) => {
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: `${notificationMessage}`,
    showConfirmButton: false,
    timer: 1000
  });
}

export const errorAlert = (notificationMessage) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${notificationMessage}`,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}

export const confirmationAlert = (notificationMessage) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: `${notificationMessage}`,
        icon: "success"
      });
    }
  });
}