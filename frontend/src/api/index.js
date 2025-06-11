import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
    // Sử dụng URL đã deploy trên Render
    baseURL: 'https://thuvienonlineapi.onrender.com/api/v1', // <<<--- THAY BẰNG URL BACKEND CỦA BẠN
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Nếu có token, thêm nó vào header Authorization
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Xử lý lỗi
        return Promise.reject(error);
    }
);

export default apiClient;