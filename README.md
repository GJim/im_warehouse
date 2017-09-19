# im_warehouse
系所辦公室物品管理系統
## 故事
大三那年暑假在系辦當工讀生，值班期間系所機房出了點狀況，導致系所的資訊系統都無法運作，於是發揮了工程師愛自找麻煩的精神，動手做了一個暫時可以運作的系統，後來經歷了三任助理的討論與修改，才完成今天的作品。
## 專案說明
此開源專案希望提供給初學者學習網頁程式語言的題材，專案內容採用php與mysql作為後臺架構，前端使用html、javascript、css，以及jquery和materialize來簡化程式碼與優化使用者介面。

***注意*** *本專案登入部分採用了不安全的加密機制(base64_encode)，建議可更換為(md5)，但修改密碼的機制就必須重新設計。*
## 專案結構說明
> document
>>內涵系統設計文件與sql檔

> model.php
>>主要處理資料庫端的程式

> controller.php
>>主要處理系統邏輯端的程式

## 安裝說明
```
git clone https://github.com/GJim/im_warehouse.git
```
- 點擊[這個](https://www.apachefriends.org/zh_tw/download.html)下載XAMPP並完成安裝步驟
- 將從git下載下來的im_warehouse放到xampp中的htdoc資料夾底下
- 執行apache和mysql
- 點擊[這個](http://localhost/phpmyadmin)打開phpmyadmin
```
* 預設帳號: root
* 預設密碼: 無
```
- 新增一個資料庫，並取名"im_warehouse"
- 將document資料夾內的.sql檔匯入資料庫中
- 點擊[這裡](http://localhost/im_warehouse/)看成果
## 授權條款
MIT
