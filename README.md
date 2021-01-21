# 📆 Manage Your Life
[109-1] Web Programming Final  
`Group 26` 📆 Manage Your Life
- 組員：
    - 電機四 B05901003 徐敏倩
    - 電機四 B06901006 毛慕庭
    - 電機四 B06901013 黃珮欣
## Deployed link: [http://www.mhsuab.tw/](http://www.mhsuab.tw/)
## Demo 影片連結： [影片](https://youtu.be/t-fYYjHhSO0)
## 服務內容
提供使用者私人之整合月曆、週曆、筆記欄以及代辦事項之多功能行事曆，讓使用者可依需求迅速取得所需資訊，並協助隨時掌握其排程。
## 使用/操作方式：
### 前端
- 初次使用時，使用者需先註冊帳號，經登錄享受個人服務
- 經註冊之帳號密碼登錄後，畫面分為月曆(左上)、週曆(中上)、活動類別欄(右側)、筆記(左下)及代辦事項(中下)
- 月曆(左上):若有新增"顯示於月曆"之活動，該日期將顯示紅色標註，方便使用者掌握行程概覽
- 週曆(中上):
    - 新增方式:從右方(活動類別欄)拖曳活動至該日期
    - 使用者可設定之基本項目:活動名稱、活動日期、活動起始及結束時間、活動顏色
    - 使用者可設定之進階項目:活動類別、是否標記於左上月曆、活動是否重複/重複週期、是否於當日結束前提醒檢視成果
- 筆記(左下):點擊即編輯，自動存檔之自由筆記欄
- 代辦事項(中下):
    - 分為代辦(Todo)、進行中(Doing)、已完成(Completed)三欄，各欄間可直接拖曳改變事項狀態。
    - 新增方式:於該欄右上角點擊編輯符號進入編輯視窗
    - 使用者可設定之基本項目:事項名稱、事項死線、事項類別、事項顏色
### 後端
使用者註冊後會為其設定基本資訊，並在所有與之相關的 data 都使其利用 user 的 id reference 該使用者，而所有的使用者都只有權取得屬於自己的資料。
每天固定 0 點時，會主動 iterate 資料庫中所有的資料，Todo 部分當被標為 Completed 後幾天，便會自動刪除；活動依照是否被加至行事曆中，有不同的刪除時間。

## 其他說明：
- 瀏覽器支援:Google Chrome, Microsoft Edge, Safari
- 裝置建議:桌上型電腦、筆記型電腦(若使用手機請以橫向觀看)

## 專題製作心得
身在幾乎從小就能接觸網路的時代，使用的網頁順暢精美根本就是default。雖然在修課之前就很常聽到有關於網頁工程師的笑話，然而直到與網頁撰寫的相處漸深，才真能體會其中的荒謬、無奈、複雜與成就感。在專題製作的過程中，真的能感受到網頁撰寫的「大勢」與現代資訊之繁雜。當網路上充滿了yarn一下就能取得的精美package，Error一搜就有撲天蓋地的零碎「解答」，每天滑過的每個網頁都精美而成熟，要怎麼在完成專案的同時「覺得自由」就是件十分值得思考的事情。
### 使用之第三方套件、框架、程式碼
#### 第三方套件、框架
- Front end
    - React
    - react-router-dom
    - react-dnd
    - react-color
    - HTML5 Canvas
    - Semantic-UI
    - Material-UI
    - @fullcalendar
- Back end
    - graphql-yoga
    - bcrypt
    - jsonwebtoken
    - corn
- Database
    - MongoDB
- Deploy
    - docker, docker-compose
#### 參考程式碼
- [awesome-compose](https://github.com/docker/awesome-compose)
    - 參考 `react-express-mongodb` 中 Dockerfile, docker-compose.yml 的寫法
- [classsed-graphql-mern-apollo](https://github.com/hidjou/classsed-graphql-mern-apollo)
    - 參考 jwt authentication 的部分
    
### 分工
- 徐敏倩
    - Backend
    - Frontend
    - Deploy
    - UI Design
- 毛慕庭
    - Frontend
    - UI Design
- 黃珮欣
    - middleware/Authorization
    - Frontend
