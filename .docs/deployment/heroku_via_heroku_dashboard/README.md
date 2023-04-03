## Yêu cầu:
  1. Các theme app extension, ... (những thứ liên quan đến theme, file liquid, ...) cần move ra ngoài folder "extensions" - tốt nhất là di chuyển ra ngoài "root". <p><b><i><u>Tại sao lại phải như vậy -> Khi chạy build, @shopify-cli sẽ chạy theme app check. Cái này cần setup "Ruby" và heroku multiple buildpacks tại thời điểm file này được viết là không tìm được cách giải quyết</u></i></b></p>
  2. Gemfile cần được xoá để heroku không auto detect sang "Ruby buildpack" 

## Pros
  - Dễ dùng
  - Config nhanh, build nhanh, debug nhanh
  - Có thể build tự động hoặc manual
  - Quản lý "env variables" dễ dàng 
  
## Cons
  - Việc quản lý vào thao tác với các app trong "extensions" trở nên khó khăn khi lúc build cần move ra ngoài và lúc cần chạy @shopify-cli để push lên shopify thì lại phải kéo vào và chạy lệnh

## Các bước deploy heroku bằng giao diện dashboard của heroku 

0. Xoá file ".github/workflows/deploy-heroku.yml"

1. Setup shopify app in partner
  1.1 Tại dashboard team chọn "Create New App" ![Setup Shopify App In Partner](./images/setup-shopify-app-in-partner.png)
  1.2 Các phần còn lại (App Logic, Rule, ...) sẽ được người khác setup

2. Setup app heroku
  2.1 Tại dashboard team chọn "Create New App" ![Create new app](./images/create-app-heroku.png)
  2.2 Setup biến môi trường cần thiết ![Setup heroku env](./images/setup-heroku-env.png) 
  2.3 Deploy ![Deploy](./images/deploy-code-heroku.png)
  2.4 Theo dõi kết quả build
  2.5 Xem log xem server đã được start hay gặp lỗi



## Example
1. Kết quả của "Setup shopify app in partner"
  - Kết quả bước 1.1 ![Result 1.1](./images/result-1.1.png)
  - Kết quả bước 1.2 ![Result 1.2](./images/result-1.2.png)

2. Kết quả của "Setup app heroku"
  - Env setup ![Result setup env](./images/result-setup-env.png)
  - Build log ![Result build log](./images/result-build-log.png)

#### Deploy thành công
- Server log ![Result server log](./images/result-server-log.png)