//classify the item
function classify() {
  let id = $('#cip-id').val();
  //category: paper
  let r1 = new RegExp("^1[0-9]{5}$");
  //category: magazine and book
  let r21 = new RegExp("^20[0-9]{4}$");
  let r22 = new RegExp("^21[0-9]{4}$");
  let r23 = new RegExp("^2[2-3][0-9]{4}$");
  let r24 = new RegExp("^29[0-8][0-9]{3}$");
  let r25 = new RegExp("^299[0-9]{3}$");
  //category: notebook body
  let r31 = new RegExp("^3100[0-9]{2}$");
  //category: notebook accessory
  let r32 = new RegExp("^3101[0-9]{2}$");
  let r33 = new RegExp("^3102[0-9]{2}$");
  let r34 = new RegExp("^3103[0-9]{2}$");
  //category: pad body
  let r41 = new RegExp("^3200[0-9]{2}$");
  //category: pad accessory
  let r42 = new RegExp("^3201[0-9]{2}$");
  //category: other electric equipment
  let r51 = new RegExp("^3300[0-9]{2}$");
  let r52 = new RegExp("^3301[0-9]{2}$");
  let r53 = new RegExp("^3302[0-9]{2}$");
  let r54 = new RegExp("^3303[0-9]{2}$");
  let r55 = new RegExp("^3304[0-9]{2}$");
  let r61 = new RegExp("^3400[0-9]{2}$");
  let r62 = new RegExp("^3401[0-9]{2}$");
  let r63 = new RegExp("^3402[0-9]{2}$");
  let r64 = new RegExp("^3403[0-9]{2}$");
  let r65 = new RegExp("^3404[0-9]{2}$");
  let r71 = new RegExp("^3500[0-9]{2}$");
  let r72 = new RegExp("^3501[0-9]{2}$");
  let r73 = new RegExp("^3502[0-9]{2}$");
  let r81 = new RegExp("^3600[0-9]{2}$");
  let r82 = new RegExp("^3601[0-9]{2}$");
  let r83 = new RegExp("^3602[0-9]{2}$");
  let r91 = new RegExp("^3700[0-9]{2}$");
  let r92 = new RegExp("^3701[0-9]{2}$");
  let r101 = new RegExp("^3800[0-9]{2}$");
  let r102 = new RegExp("^3801[0-9]{2}$");
  let r103 = new RegExp("^3810[0-9]{2}$");
  let r104 = new RegExp("^3811[0-9]{2}$");
  let r111 = new RegExp("^3900[0-9]{2}$");
  let r112 = new RegExp("^3901[0-9]{2}$");
  let r113 = new RegExp("^3910[0-9]{2}$");
  let r114 = new RegExp("^3911[0-9]{2}$");
  let r115 = new RegExp("^3912[0-9]{2}$");
  let r121 = new RegExp("^30[0-9]{4}$");
  //category: other accessory
  let r131 = new RegExp("^4000[0-9]{2}$");
  let r132 = new RegExp("^4001[0-9]{2}$");
  let r133 = new RegExp("^4002[0-9]{2}$");
  let r141 = new RegExp("^4100[0-9]{2}$");
  let r142 = new RegExp("^4101[0-9]{2}$");
  let r151 = new RegExp("^4200[0-9]{2}$");
  let r152 = new RegExp("^4201[0-9]{2}$");
  let r153 = new RegExp("^4202[0-9]{2}$");
  let r154 = new RegExp("^4203[0-9]{2}$");
  let r155 = new RegExp("^4204[0-9]{2}$");
  let r156 = new RegExp("^4205[0-9]{2}$");
  let r161 = new RegExp("^43[0-9]{4}$");
  let r171 = new RegExp("^44[0-9]{4}$");
  let r181 = new RegExp("^45[0-9]{4}$");
  let r191 = new RegExp("^46[0-9]{4}$");
  let r201 = new RegExp("^5[0-9]{5}$");
  if(r1.test(id)) {
    let o = {};
    o.t = 1;
    o.c = '論文/'+id.substring(1,4)+'年度';
    return o;
  } else if (r21.test(id)) {
    let o = {};
    o.t = 2;
    o.c = '雜誌/期刊';
    return o;
  } else if (r22.test(id)) {
    let o = {};
    o.t = 2;
    o.c = '雜誌/資訊雜誌';
    return o;
  } else if (r23.test(id)) {
    let o = {};
    o.t = 2;
    o.c = '雜誌/商管雜誌';
    return o;
  } else if (r24.test(id)) {
    let o = {};
    o.t = 2;
    o.c = '雜誌/其他類雜誌';
    return o;
  } else if (r25.test(id)) {
    let o = {};
    o.t = 2;
    o.c = '書籍';
    return o;
  } else if (r31.test(id)) {
    let o = {};
    o.t = 1;
    o.c = '電子設備/筆記型電腦/本機';
    return o;
  } else if (r32.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/筆記型電腦/電源線,變壓器';
    return o;
  } else if (r33.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/筆記型電腦/滑鼠';
    return o;
  } else if (r34.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/筆記型電腦/光碟機';
    return o;
  } else if (r41.test(id)) {
    let o = {};
    o.t = 1;
    o.c = '電子設備/平板電腦/本機';
    return o;
  } else if (r42.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/平板電腦/電源線';
    return o;
  } else if (r51.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位相機/本機';
    return o;
  } else if (r52.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位相機/電池';
    return o;
  } else if (r53.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位相機/充電組';
    return o;
  } else if (r54.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位相機/傳輸線';
    return o;
  } else if (r55.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位相機/音訊線';
    return o;
  } else if (r61.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位攝影機/本機';
    return o;
  } else if (r62.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位攝影機/電池';
    return o;
  } else if (r63.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位攝影機/充電組';
    return o;
  } else if (r64.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位攝影機/傳輸線';
    return o;
  } else if (r65.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/數位攝影機/音訊線';
    return o;
  } else if (r71.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/投影機/本機';
    return o;
  } else if (r72.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/投影機/電源線';
    return o;
  } else if (r73.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/投影機/VGA線';
    return o;
  } else if (r81.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/錄音筆/本機';
    return o;
  } else if (r82.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/錄音筆/傳輸線';
    return o;
  } else if (r83.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/錄音筆/充電組';
    return o;
  } else if (r91.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/簡報筆/本機';
    return o;
  } else if (r92.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/簡報筆/USB接收器';
    return o;
  } else if (r101.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/麥克風/無線/本機';
    return o;
  } else if (r102.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/麥克風/無線/電池座';
    return o;
  } else if (r103.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/麥克風/有線/本機';
    return o;
  } else if (r104.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/麥克風/有線/音源線';
    return o;
  } else if (r111.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/音響/大型/本機';
    return o;
  } else if (r112.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/音響/大型/電源線';
    return o;
  } else if (r113.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/音響/桌上型/本機';
    return o;
  } else if (r114.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/音響/桌上型/電源線';
    return o;
  } else if (r115.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/音響/桌上型/音源線';
    return o;
  } else if (r121.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '電子設備/其他';
    return o;
  } else if (r131.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/儲存裝置/SD記憶卡';
    return o;
  } else if (r132.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/儲存裝置/隨身碟';
    return o;
  } else if (r133.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/儲存裝置/行動電源';
    return o;
  } else if (r141.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/延長線/長條延長線';
    return o;
  } else if (r142.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/延長線/捲筒延長線';
    return o;
  } else if (r151.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/VGA';
    return o;
  } else if (r152.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/HDMI';
    return o;
  } else if (r153.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/音源線';
    return o;
  } else if (r154.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/Micro USB傳輸線';
    return o;
  } else if (r155.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/Lighting 傳輸線';
    return o;
  } else if (r156.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/傳輸線/網路線';
    return o;
  } else if (r161.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/電源供應線';
    return o;
  } else if (r171.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/轉接頭';
    return o;
  } else if (r181.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/腳架';
    return o;
  } else if (r191.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他配件/鑰匙';
    return o;
  } else if (r201.test(id)) {
    let o = {};
    o.t = 3;
    o.c = '其他';
    return o;
  } else {
    let o = {};
    o.t = 4;
    return o;
  }
}
