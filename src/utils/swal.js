import Swal from 'sweetalert2';

// Basic configuration for consistent styling
const swalConfig = {
    background: '#1e293b', // slate-800
    color: '#e2e8f0', // slate-200
    confirmButtonColor: '#06b6d4', // cyan-500
    cancelButtonColor: '#ef4444', // red-500
    iconColor: '#06b6d4',
};

export const showSuccess = (title, text) => {
    return Swal.fire({
        ...swalConfig,
        icon: 'success',
        title,
        text,
        timer: 2000,
        showConfirmButton: false,
    });
};

export const showError = (title, text) => {
    return Swal.fire({
        ...swalConfig,
        icon: 'error',
        title,
        text,
        iconColor: '#ef4444',
    });
};

export const showConfirm = async (title, text, confirmButtonText = 'Yes, delete it!') => {
    const result = await Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
    });
    return result.isConfirmed;
};

export const showLoading = (title = 'Loading...') => {
    Swal.fire({
        ...swalConfig,
        title,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

export const closeLoading = () => {
    Swal.close();
};
