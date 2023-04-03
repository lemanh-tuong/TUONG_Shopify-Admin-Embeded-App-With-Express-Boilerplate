# Các lỗi thường gặp

## Lỗi "failed to parser session ... 'nbf' claim timestamp check failed" 
- MacOS: Format hợp lệ
![MacOS Valid date format](./images/macos_valid_date_format.png)

- Windows: Format hợp lệ ![Windows Valid date format](./images/windows_valid_date_format.png)

## Lỗi webhook process failed
- Lưu ý khi đổi endpoint cho webhook vì shopify không tự động update theo -> Cần viết tool để update webhook bằng REST API và GraphQL


## Lỗi shopify không redirect đến trang cài app
- Tiến hành login vào partner và cài app bằng tay
- Tại giao diện quản lý app chọn "Select store" ![Select store](./images/install_app_to_dev_store.png)