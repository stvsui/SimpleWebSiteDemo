// *********************************************************************************************
//  ファイル名 : disclosure.js
//	Product at howtelevision
//	2019/01/15(IRcalendarupdate,print_year_sts Update,year chenge update,print_whatsNew_all update)
//	2019/01/29(print_whatsNew_all_ir update)
//	2019/03/20(print_whatsNew_all_hash print_year_sts update)
//	2019/08/14(view_ircalender update)
//	2019/08/27(Summary_type update)
// *****************************************************************************
// 宣言
// 銘柄コード
const DESCRIPTION_CODE = 4476;

// 基準となるURL（適時開示データ取得用）
const URL_STR_Disclosure = "https://irdirect.jp/api/timelyDisclosure?code=";

// 基準となるURL（有価証券報告書データ取得用）
const URL_STR_securitiesReport = "https://irdirect.jp/api/securitiesReport?code=";

// 基準となるURL（株式株価情報データ取得用）
const URL_STR_prInfo = "https://irdirect.jp/api/prInfo?code=";

// 基準となるURL（What's New）
const URL_STR_whatsNew = "https://irdirect.jp/api/whatsNew?code=";

// 基準となるURL（よくある質問データ取得用）
const URL_STR_recruit = "https://irdirect.jp/api/recruit?code=";

// 基準となるURL（決算サマリ）
const URL_STR_closingSummary = "https://irdirect.jp/api/closingSummary?code=";

// 基準となるURL（JSONカスタマイズメニューデータ取得用）
const URL_STR_customizeMenu = "https://irdirect.jp/api/customizeMenu?code=";

// 決算タイプ
const closingSummary_type_4 = "four"; // 四半期
const closingSummary_type_consolidated = "nonconsolidated"; // 非連結

let master_cut_out = ["CG報告書", "電子公告", "コーポレート・ガバナンス"]; // 予約語（省く文字）

let url_all = URL_STR_closingSummary;
url_all = url_all + DESCRIPTION_CODE;
url_all_4 = url_all + "&type=" + closingSummary_type_4 + "&order=year_desc&cyear=5&pageSize=100";
url_all_t = url_all + "&type=" + closingSummary_type_consolidated + "&order=year_desc&cyear=5&pageSize=100";

// 選択種類
let type_value = 0;

// 年号select
let year_sel = [];
let lct = 5000;

// IRカレンダー
let ircalender_suu = 0;
let ircalender_title = [];
let ircalender_hash = [];
let ircalender_publishDateTime = [];
let ircalender_databody = [];

// print_whatsNew_all_hash
let whatshash_suu = 0;
let whatshash_title = [];
let whatshash_hash = [];
let whatshash_category = [];
let whatshash_publishDateTime = [];
let whatshash_databody = [];

// 業績ハイライトのグローバル変数
// 売上高
let G_salesAmount_ym = ['', '', '', '', ''];
let G_salesAmount_1Q = ['', '', '', '', ''];
let G_salesAmount_2Q = ['', '', '', '', ''];
let G_salesAmount_3Q = ['', '', '', '', ''];
let G_salesAmount_4Q = ['', '', '', '', ''];
// 営業利益
let G_operatingIncome_ym = ['', '', '', '', ''];
let G_operatingIncome_1Q = ['', '', '', '', ''];
let G_operatingIncome_2Q = ['', '', '', '', ''];
let G_operatingIncome_3Q = ['', '', '', '', ''];
let G_operatingIncome_4Q = ['', '', '', '', ''];
// 経常利益
let G_ordinaryIncome_ym = ['', '', '', '', ''];
let G_ordinaryIncome_1Q = ['', '', '', '', ''];
let G_ordinaryIncome_2Q = ['', '', '', '', ''];
let G_ordinaryIncome_3Q = ['', '', '', '', ''];
let G_ordinaryIncome_4Q = ['', '', '', '', ''];
// 当期純利益
let G_currentNetIncome_ym = ['', '', '', '', ''];
let G_currentNetIncome_1Q = ['', '', '', '', ''];
let G_currentNetIncome_2Q = ['', '', '', '', ''];
let G_currentNetIncome_3Q = ['', '', '', '', ''];
let G_currentNetIncome_4Q = ['', '', '', '', ''];
// 1株当たり当期純利益(円)
let G_currentNetIncomePerStock_ym = ['', '', '', '', ''];
let G_currentNetIncomePerStock_1Q = ['', '', '', '', ''];
let G_currentNetIncomePerStock_2Q = ['', '', '', '', ''];
let G_currentNetIncomePerStock_3Q = ['', '', '', '', ''];
let G_currentNetIncomePerStock_4Q = ['', '', '', '', ''];

// 自己資本当期純利益率/ROE(%)
let G_roe_ym = ['', '', '', '', ''];
let G_roe_1Q = ['', '', '', '', ''];
let G_roe_2Q = ['', '', '', '', ''];
let G_roe_3Q = ['', '', '', '', ''];
let G_roe_4Q = ['', '', '', '', ''];

// 総資産経常利益率/ROA(%)
let G_roa_ym = ['', '', '', '', ''];
let G_roa_1Q = ['', '', '', '', ''];
let G_roa_2Q = ['', '', '', '', ''];
let G_roa_3Q = ['', '', '', '', ''];
let G_roa_4Q = ['', '', '', '', ''];

// 売上高営業利益率/ROS(%)
let G_operatingMargin_ym = ['', '', '', '', ''];
let G_operatingMargin_1Q = ['', '', '', '', ''];
let G_operatingMargin_2Q = ['', '', '', '', ''];
let G_operatingMargin_3Q = ['', '', '', '', ''];
let G_operatingMargin_4Q = ['', '', '', '', ''];

// 総資産
let G_totalAssets_ym = ['', '', '', '', ''];
let G_totalAssets_1Q = ['', '', '', '', ''];
let G_totalAssets_2Q = ['', '', '', '', ''];
let G_totalAssets_3Q = ['', '', '', '', ''];
let G_totalAssets_4Q = ['', '', '', '', ''];
// 純資産
let G_netAssets_ym = ['', '', '', '', ''];
let G_netAssets_1Q = ['', '', '', '', ''];
let G_netAssets_2Q = ['', '', '', '', ''];
let G_netAssets_3Q = ['', '', '', '', ''];
let G_netAssets_4Q = ['', '', '', '', ''];
// 自己資本比率
let G_capitalRatio_ym = ['', '', '', '', ''];
let G_capitalRatio_1Q = ['', '', '', '', ''];
let G_capitalRatio_2Q = ['', '', '', '', ''];
let G_capitalRatio_3Q = ['', '', '', '', ''];
let G_capitalRatio_4Q = ['', '', '', '', ''];
// 1株当たり純資産額(円)
let G_totalAssetsPerStock_ym = ['', '', '', '', ''];
let G_totalAssetsPerStock_1Q = ['', '', '', '', ''];
let G_totalAssetsPerStock_2Q = ['', '', '', '', ''];
let G_totalAssetsPerStock_3Q = ['', '', '', '', ''];
let G_totalAssetsPerStock_4Q = ['', '', '', '', ''];
// 営業活動によるキャッシュフロー
let G_operatingCashFlow_ym = ['', '', '', '', ''];
let G_operatingCashFlow_1Q = ['', '', '', '', ''];
let G_operatingCashFlow_2Q = ['', '', '', '', ''];
let G_operatingCashFlow_3Q = ['', '', '', '', ''];
let G_operatingCashFlow_4Q = ['', '', '', '', ''];
// 投資活動によるキャッシュフロー
let G_investmentCashFlow_ym = ['', '', '', '', ''];
let G_investmentCashFlow_1Q = ['', '', '', '', ''];
let G_investmentCashFlow_2Q = ['', '', '', '', ''];
let G_investmentCashFlow_3Q = ['', '', '', '', ''];
let G_investmentCashFlow_4Q = ['', '', '', '', ''];
// 財務活動によるキャッシュフロー
let G_financialCashFlow_ym = ['', '', '', '', ''];
let G_financialCashFlow_1Q = ['', '', '', '', ''];
let G_financialCashFlow_2Q = ['', '', '', '', ''];
let G_financialCashFlow_3Q = ['', '', '', '', ''];
let G_financialCashFlow_4Q = ['', '', '', '', ''];
// 現金及び現金同等物の期末残高
let G_remainingSum_ym = ['', '', '', '', ''];
let G_remainingSum_1Q = ['', '', '', '', ''];
let G_remainingSum_2Q = ['', '', '', '', ''];
let G_remainingSum_3Q = ['', '', '', '', ''];
let G_remainingSum_4Q = ['', '', '', '', ''];

// 1株当たり配当額（円）
let G_dividendPershare_ym = ['', '', '', '', ''];
let G_dividendPershare_1Q = ['', '', '', '', ''];
let G_dividendPershare_2Q = ['', '', '', '', ''];
let G_dividendPershare_3Q = ['', '', '', '', ''];
let G_dividendPershare_4Q = ['', '', '', '', ''];

// 1株当たり配当額（円）
let G_dividendRatio_ym = ['', '', '', '', ''];
let G_dividendRatio_1Q = ['', '', '', '', ''];
let G_dividendRatio_2Q = ['', '', '', '', ''];
let G_dividendRatio_3Q = ['', '', '', '', ''];
let G_dividendRatio_4Q = ['', '', '', '', ''];

// デフォルトパラメータ
// 売上高
let salesAmount_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let salesAmount_1Q = ['-', '-', '-', '-', '-'];
let salesAmount_2Q = [636, '-', '-', '-', '-'];
let salesAmount_3Q = ['-', '-', '-', '-', '-'];
let salesAmount_4Q = ['-', 1120, 574, 392, 164];
// 営業利益
let operatingIncome_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let operatingIncome_1Q = ['-', '-', '-', '-', '-'];
let operatingIncome_2Q = [99, '-', '-', '-', '-'];
let operatingIncome_3Q = ['-', '-', '-', '-', '-'];
let operatingIncome_4Q = ['-', 100, 4, -24, -45];
// 経常利益
let ordinaryIncome_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let ordinaryIncome_1Q = ['-', '-', '-', '-', '-'];
let ordinaryIncome_2Q = [97, '-', '-', '-', '-'];
let ordinaryIncome_3Q = ['-', '-', '-', '-', '-'];
let ordinaryIncome_4Q = ['-', 95, 0, -26, -47];
// 当期純利益
let currentNetIncome_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let currentNetIncome_1Q = ['-', '-', '-', '-', '-'];
let currentNetIncome_2Q = [65, '-', '-', '-', '-'];
let currentNetIncome_3Q = ['-', '-', '-', '-', '-'];
let currentNetIncome_4Q = ['-', 87, 3, -26, -47];
// 1株当たり当期純利益(円)
let currentNetIncomePerStock_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let currentNetIncomePerStock_1Q = ['-', '-', '-', '-', '-'];
let currentNetIncomePerStock_2Q = [19.49, '-', '-', '-', '-'];
let currentNetIncomePerStock_3Q = ['-', '-', '-', '-', '-'];
let currentNetIncomePerStock_4Q = ['-', 26.07, 1.02, -8.87, -18.69];
// 自己資本当期純利益率/ROE(%)
let roe_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let roe_1Q = ['-', '-', '-', '-', '-'];
let roe_2Q = ['-', '-', '-', '-', '-'];
let roe_3Q = ['-', '-', '-', '-', '-'];
let roe_4Q = ['-', 29.6, 3.14, '-', '-'];
// 総資産
let totalAssets_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let totalAssets_1Q = ['-', '-', '-', '-', '-'];
let totalAssets_2Q = [639, '-', '-', '-', '-'];
let totalAssets_3Q = ['-', '-', '-', '-', '-'];
let totalAssets_4Q = ['-', 547, 577, 147, 102];
// 純資産
let netAssets_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let netAssets_1Q = ['-', '-', '-', '-', '-'];
let netAssets_2Q = [404, '-', '-', '-', '-'];
let netAssets_3Q = ['-', '-', '-', '-', '-'];
let netAssets_4Q = ['-', 338, 251, -51, -20];
// 自己資本比率
let capitalRatio_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let capitalRatio_1Q = ['-', '-', '-', '-', '-'];
let capitalRatio_2Q = [63.15, '-', '-', '-', '-'];
let capitalRatio_3Q = ['-', '-', '-', '-', '-'];
let capitalRatio_4Q = ['-', 61.91, 43.53, -35.19, -19.72];
// 1株当たり純資産額(円)
let totalAssetsPerStock_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let totalAssetsPerStock_1Q = ['-', '-', '-', '-', '-'];
let totalAssetsPerStock_2Q = ['-', '-', '-', '-', '-'];
let totalAssetsPerStock_3Q = ['-', '-', '-', '-', '-'];
let totalAssetsPerStock_4Q = ['-', 101.1, 75.03, -877.61, -336.35];
// 営業活動によるキャッシュフロー
let operatingCashFlow_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let operatingCashFlow_1Q = ['-', '-', '-', '-', '-'];
let operatingCashFlow_2Q = [53, '-', '-', '-', '-'];
let operatingCashFlow_3Q = ['-', '-', '-', '-', '-'];
let operatingCashFlow_4Q = ['-', 105, -20, '-', '-'];
// 投資活動によるキャッシュフロー
let investmentCashFlow_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let investmentCashFlow_1Q = ['-', '-', '-', '-', '-'];
let investmentCashFlow_2Q = [-31, '-', '-', '-', '-'];
let investmentCashFlow_3Q = ['-', '-', '-', '-', '-'];
let investmentCashFlow_4Q = ['-', -90, -33, '-', '-'];
// 財務活動によるキャッシュフロー
let financialCashFlow_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let financialCashFlow_1Q = ['-', '-', '-', '-', '-'];
let financialCashFlow_2Q = [-14, '-', '-', '-', '-'];
let financialCashFlow_3Q = ['-', '-', '-', '-', '-'];
let financialCashFlow_4Q = ['-', -26, 277, '-', '-'];
// 現金及び現金同等物の期末残高
let remainingSum_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let remainingSum_1Q = ['-', '-', '-', '-', '-'];
let remainingSum_2Q = [268, '-', '-', '-', '-'];
let remainingSum_3Q = ['-', '-', '-', '-', '-'];
let remainingSum_4Q = ['-', 261, 272, '-', '-'];

// １株当たり配当額（円）
let dividendPershare_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let dividendPershare_1Q = ['-', '-', '-', '-', '-'];
let dividendPershare_2Q = ['-', '-', '-', '-', '-'];
let dividendPershare_3Q = ['-', '-', '-', '-', '-'];
let dividendPershare_4Q = ['-', '-', '-', '-', '-'];

// 配当性向（％）
let dividendRatio_ym = ['2019/12', '2018/12', '2017/12', '2016/12', '2015/12'];
let dividendRatio_1Q = ['-', '-', '-', '-', '-'];
let dividendRatio_2Q = ['-', '-', '-', '-', '-'];
let dividendRatio_3Q = ['-', '-', '-', '-', '-'];
let dividendRatio_4Q = ['-', '-', '-', '-', '-'];

// *********************************************************************************************
//	関数 print_elec_notice(customizeMenu)
//  	電子公告出力用
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：updated_at_desc
//		menuName:	コンテンツ管理一覧のカスタマイズメニュー名
//		year:		年度(0の場合はすべて）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_elec_notice(
    pageNo,
    pageSize,
    charset,
    datestyle,
    order,
    menuName,
    year
) {
    let url = URL_STR_customizeMenu;
    url = url + DESCRIPTION_CODE;

    if (pageNo !== null || pageNo !== undefined) {
        url += "&pageNo=" + pageNo;
    } else {
        url += "&pageNo=1";
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    } else {
        url += "&order=updated_at_desc";
    }

    if (menuName !== 0) {
        url += "&menuName=" + menuName;
    }

    if (year !== 0) {
        url += "&year=" + year;
    } else {
        url += "&year=" + pramWrite();
    }

    let title = [];
    let hash = [];
    let databody = [];
    let str = "";

    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            if (data.info == "該当する内容はありません。") {
                str = '<p class="title">該当する内容はありません。</p>';
                $("#script_out").html(str); // 出力
            } else {
                if (
                    data.error !== "該当するカスタマイズメニューは存在していません。" ||
                    data.error !== "パラメーター「menuName」は未記入です" ||
                    data.error !== "パラメーター「code」は未記入です"
                ) {
                    if (data.items.length > 0) {
                        let i = 0;
                        let ct = 0;
                        str = str + "<ul>";
                        for (i = 0; i < lct; i++) {
                            // 繰り返し表示
                            if (data.items[i]["haveContent"] === true) {
                                ct++;
                                str = str + "<li>";
                                str = str + "<a href=" + data.items[i]["pdf"] + ' target="_blank">';
                                str = str + '<p class="date">' + data.items[i]["publishDate"] + '<span class="category">' + ircate_icon + "</span></p>";
                                str = str + '<p class="entry">' + data.items[i]["title"];
                                str = str + "<i>PDF</i>";
                                str = str + "</p>";
                                str = str + "</a>";
                                str = str + "</li>";
                                if (ct >= pageSize) { break; }
                            }
                        }
                        str = str + "</ul>";
                        if (i == 0) {
                            str = '<p class="inlead">掲載情報がありません。</p>';
                        }
                        $("#script_out").html(str);
                    } else {
                        str = '<p class="inlead">掲載情報がありません。</p>';
                        $("#script_out").html(str);
                    }
                } else {
                    str = '<p class="inlead">掲載情報がありません。</p>';
                    $("#script_out").html(str);
                }
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_message(customizeMenu)
//  	投資家の皆様へ出力用
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：updated_at_desc
//		menuName:	コンテンツ管理一覧のカスタマイズメニュー名
//		year:		年度(0の場合はすべて）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_message(
    pageNo,
    pageSize,
    charset,
    datestyle,
    order,
    menuName,
    year
) {
    let url = URL_STR_customizeMenu;
    url = url + DESCRIPTION_CODE;

    if (pageNo !== null || pageNo !== undefined) {
        url += "&pageNo=" + pageNo;
    } else {
        url += "&pageNo=1";
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=5";
    }

    if (order !== 0) {
        url += "&order=" + order;
    } else {
        url += "&order=updated_at_desc";
    }

    if (menuName !== 0) {
        url += "&menuName=" + menuName;
    }

    if (year !== 0) {
        url += "&year=" + year;
    } else {
        url += "&year=" + pramWrite();
    }

    let title = [];
    let hash = [];
    let databody = [];
    let str = "";

    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            if (data.info == "該当する内容はありません。") {
                str = "該当する内容はありません。";
                $("#message_body").html(str); // 出力
            } else {
                if (
                    data.error !== "該当するカスタマイズメニューは存在していません。" ||
                    data.error !== "パラメーター「menuName」は未記入です" ||
                    data.error !== "パラメーター「code」は未記入です"
                ) {
                    if (data.haveContent === true) {
                        if (data.title.length > 0) {
                            $("#message_top").html(data.title); // 出力
                        }
                        if (data.databody.length > 0) {
                            $("#message_body").html(data.databody); // 出力
                        }
                    }
                } else {
                    str = '<p class="inlead">掲載情報がありません。</p>';
                    $("#script_out").html(str); // 出力
                }
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 yearnavi_send(GETパラメータを作成して送る)
//	表示パース
//	<form action="#" method="GET" name="Form_yearnavi">
//	<select name='yearnavi_chg' onChange="yearnavi_send('xxxx.html')">
//	<option value="2018">2018</option>
//	<option value="2017">2017</option>
//	<option value="2016">2016</option>
//	<option value="2015">2015</option>
//	<option value="2014">2014</option>
//	</select>
//	</form>
//	入力
//		xxxx.html?yr=XXXX
//		yr: 年号
//		XXXX: value
//	出力：
//		0：vaslue無
//
// *****************************************************************************
function yearnavi_send() {
    let yearnavi_value = "";
    let frm = "";
    let frm_idx = "";
    let frm_val = "";
    let frm_txt = "";
    let addr = "";
    let addr_str = "";
    let addr_iti = "";

    frm = document.forms["Form_yearnavi"];
    frm_idx = frm.elements["yearnavi_chg"].selectedIndex;
    if (frm_idx === "") {
        return false;
    }
    frm_val = frm.elements["yearnavi_chg"].options[frm_idx].value;
    frm_txt = frm.elements["yearnavi_chg"].options[frm_idx].text;
    /* 年号(コード変換) */
    if (frm_val != "") {
        yearnavi_value = escape(frm_val);
    }
    let pram = "yr=" + yearnavi_value + "&tp=" + type_value;
    /* アドレスにパラメータを付加 */
    addr = location.href;
    addr_iti = addr.indexOf("?");
    if (addr_iti != -1) {
        addr_str = addr.slice(0, addr_iti);
        location.href = addr_str + "?" + pram;
        return true;
    } else {
        location.href = addr + "?yr=" + frm_val + "&tp=" + type_value;
        return true;
    }
}

// *********************************************************************************************
//	関数 print_irnewsMenu(メニュー出力コントロール) irnews用
//		tp: 種類
//	出力：
//
// *****************************************************************************
function print_irnewsMenu() {

    let yr_val = pramWrite();
    let str = '';


    if (type_value == '0') {
        str = str + '<li class="cur"><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=0' + '" class="select"><span class="ir_tabs_txt">一覧</span></a></li>';
    } else {
        str = str + '<li class=" "><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=0' + '" data-no-turbolink="true"><span class="ir_tabs_txt">一覧</span></a></li>';
    }
    if (type_value == '1') {
        str = str + '<li class="cur"><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=1' + '" class="select"><span class="ir_tabs_txt">決算</span></a></li>';
    } else {
        str = str + '<li class=" "><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=1' + '" data-no-turbolink="true"><span class="ir_tabs_txt">決算</span></a></li>';
    }
    if (type_value == '2') {
        str = str + '<li class="cur"><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=2' + '" class="select"><span class="ir_tabs_txt">適時開示</span></a></li>';
    } else {
        str = str + '<li class=" "><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=2' + '" data-no-turbolink="true"><span class="ir_tabs_txt">適時開示</span></a></li>';
    }
    if (type_value == '3') {
        str = str + '<li class="cur"><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=3' + '" class="select"><span class="ir_tabs_txt">IR資料</span></a></li>';
    } else {
        str = str + '<li class=" "><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=3' + '" data-no-turbolink="true"><span class="ir_tabs_txt">IR資料</span></a></li>';
    }
    if (type_value == '4') {
        str = str + '<li class="cur"><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=4' + '" class="select"><span class="ir_tabs_txt">お知らせ</span></a></li>';
    } else {
        str = str + '<li class=" "><div class="ir_tabs_inner"><a href="' + '?yr=' + yr_val + '&tp=4' + '" data-no-turbolink="true"><span class="ir_tabs_txt">お知らせ</span></a></li>';
    }
    $('#irnewsmenu_out').html(str); // 出力
}

// *********************************************************************************************
//	関数 print_irlibraryMenu(メニュー出力コントロール) irlibrary用
//		tp: 種類
//	出力：
//
// *****************************************************************************
function print_irlibraryMenu() {

    let yr_val = pramWrite();
    let str = '';


    if (type_value == '0') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=0' + '" class="select">全て</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=0' + '">全て</a></li>';
    }
    if (type_value == '1') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=1' + '" class="select">決算短信</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=1' + '">決算短信</a></li>';
    }
    if (type_value == '2') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=2' + '" class="select">説明会資料</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=2' + '">説明会資料</a></li>';
    }
    if (type_value == '3') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=3' + '" class="select">有価証券報告書</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=3' + '">有価証券報告書</a></li>';
    }
    if (type_value == '4') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=4' + '" class="select">株主総会</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=4' + '">株主総会</a></li>';
    }
    if (type_value == '5') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=5' + '" class="select">適時開示</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=5' + '">適時開示</a></li>';
    }
    if (type_value == '6') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=6' + '" class="select">プレスリリース</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=6' + '">プレスリリース</a></li>';
    }
    if (type_value == '7') {
        str = str + '<li class="ir_current"><a href="' + '?yr=' + yr_val + '&tp=7' + '" class="select">その他資料</a></li>';
    } else {
        str = str + '<li><a href="' + '?yr=' + yr_val + '&tp=7' + '">その他資料</a></li>';
    }
    $('#irlibrarymenu_out').html(str); // 出力
}

// *********************************************************************************************
//	関数 pramWrite(パラメータを受取る)
//		xxxx.html?yr=XXXX
//		yr: 年号
//		XXXX: value
//	出力：
//		0：vaslue無
//
// *****************************************************************************
function pramWrite() {
    let yearnavi_value = "";
    let dt = new Date();
    let year = dt.getFullYear();
    let year_str = year;
    let type_str = 0;
    let page_str = 0;

    let pram = location.search;
    if (!pram) {
        type_value = type_str;
        page_value = page_str;
        return year_str;
    }
    /* 先頭の?をカット */
    pram = pram.substring(1);
    /* 「&」で引数を分割して配列に */
    let pair = pram.split("&");
    let i = (temp = "");
    let key = new Array();
    for (i = 0; i < pair.length; i++) {
        /* 配列の値を「=」で分割 */
        temp = pair[i].split("=");
        keyName = temp[0];
        keyValue = temp[1];
        /* キーと値の連想配列を生成 */
        key[keyName] = keyValue;
    }
    /* 年号 */
    if (!key["yr"] || key["yr"] == "") {
        yearnavi_value = year_str;
    } else {
        yearnavi_value = unescape(key["yr"]);
    }
    /* 種類 */
    if (!key["tp"] || key["tp"] == "") {
        type_value = type_str;
    } else {
        type_value = unescape(key["tp"]);
    }
    /* ページ */
    if (!key["pg"] || key["pg"] == "") {
        page_value = page_str;
    } else {
        page_value = unescape(key["pg"]);
    }
    return yearnavi_value;
}
// *********************************************************************************************
//	関数 pramWrite_tp(パラメータを受取る)
//		xxxx.html?tp=XXXX
//		tp: タイプ
//		XXXX: value
//	出力：
//		0：vaslue無
//
// *****************************************************************************
function pramWrite_tp() {
    let type_str = 0;

    let pram = location.search;
    if (!pram) {
        type_value = type_str;
        return type_value;
    }
    /* 先頭の?をカット */
    pram = pram.substring(1);
    /* 「&」で引数を分割して配列に */
    let pair = pram.split("&");
    let i = (temp = "");
    let key = new Array();
    for (i = 0; i < pair.length; i++) {
        /* 配列の値を「=」で分割 */
        temp = pair[i].split("=");
        keyName = temp[0];
        keyValue = temp[1];
        /* キーと値の連想配列を生成 */
        key[keyName] = keyValue;
    }
    /* 種類 */
    if (!key["tp"] || key["tp"] == "") {
        type_value = type_str;
    } else {
        type_value = unescape(key["tp"]);
    }
    return type_value;
}
// *********************************************************************************************
//	関数 print_year_sts_all(記事の年数を抽出)
//	base_urlを使って年数を全て抽出する
//	入力:
//  出力:
//		<div id="yearnavi_out"></div>
// *****************************************************************************
function print_year_sts_all(base_url) {

    let dt = new Date();
    let year = dt.getFullYear();

    let year_str = year;
    let year_str1 = year;

    let url = base_url;

    $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000,
        })
        .done(function(data) {
            let year_str_seleced = pramWrite();
            let items = '';
            let selected = 0;
            let first_year = tp_sts = my_url = '';
            items = items + '<div class="yearnavi">';
            items = items + '<form action="#" method="GET" name="Form_yearnavi">';
            items = items + '<select class="input-state-select ir_year_select" name="yearnavi_chg" onChange="yearnavi_send()">';
            if (data.items.length) {
                for (let i = 0; i < data.items.length; i++) { // 繰り返し表示
                    year_str = data.items[i]['publishDate'];
                    year_str = year_str.substr(0, 4);
                    if ((year_str - 0) > 2005) {
                        if (year_str !== year_str1) {
                            year_str1 = data.items[i]['publishDate'];
                            year_str1 = year_str1.substr(0, 4);
                            if (year_str_seleced == year_str1) {
                                selected = 1;
                                items = items + '<option value="' + year_str1 + '" selected>' + year_str1 + '</option>';
                            } else {
                                items = items + '<option value="' + year_str1 + '">' + year_str1 + '</option>';
                            }
                        }
                    }
                }
                if (selected == 0) { // 年号が一つしかない場合は
                    first_year = data.items[0]['publishDate'];
                    first_year = first_year.substr(0, 4);
                    tp_sts = pramWrite_tp();
                    my_url = location.href;
                    my_url = my_url.replace(/\?.*$/, "");
                    if (typeof first_year !== "undefined") {
                        window.location.href = my_url + '?yr=' + first_year + '&tp=' + tp_sts;
                    }
                }
            }
            items = items + '</select>';
            items = items + "</div>";
            if (data.items.length) {
                $('#yearnavi_out').html(items); // 出力
                $('#fadeIn_content').fadeIn('fast'); // ハイドしてあるコンテンツをフェードインする
                $('#fadeIn_loading').fadeOut('fast');
            }
        })
        .fail(function(data) {
            let str = '<div class="yearnavi"><select class="input-state-select"><option value="' + year + '">' + year + '</option></select></div>';
            $('#yearnavi_out').html(str);
        })
        .always(function(data) {
            return (0);
        });

}
// *********************************************************************************************
//	関数 print_year_sts(記事の変数を抽出)
//	timelyDisclosure（適時開示データ取得用）を使って年数を抽出する
//	入力:
//		base_url:		検索APIのurl
//	出力パース
//	<div class="yearnavi">
//	<form action="#" method="GET" name="Form_yearnavi">
//	<select name='yearnavi_chg' onChange="yearnavi_send()">
//	<option value="2018">2018</option>
//	<option value="2017">2017</option>
//	<option value="2016">2016</option>
//	</select>
//	</form>
//	</div>
//  出力:
//		<div id="yearnavi_out"></div>
//
// *****************************************************************************
function print_year_sts(base_url, ct_value) {
    let dt = new Date();
    let year = dt.getFullYear();

    let year_str = year;
    let year_str1 = year;

    let url = base_url;

    let ct = (cta = 0);
    if (ct_value !== undefined) {
        ct = ct_value;
    } else {
        ct = 0;
    }

    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let year_str_seleced = pramWrite();
            let items = "";
            let selected = 0;
            let first_year = (tp_sts = my_url = "");
            items = items + '<div class="yearnavi">';
            items = items + '<form action="#" method="GET" name="Form_yearnavi">';
            items = items + '<select class="input-state-select" name="yearnavi_chg" onChange="yearnavi_send()">';
            if (data.items.length) {
                for (let i = 0; i < data.items.length; i++) {
                    // 繰り返し表示
                    year_str = data.items[i]["publishDate"];
                    year_str = year_str.substr(0, 4);
                    if (year_str !== year_str1) {
                        cta++;
                        year_str1 = data.items[i]["publishDate"];
                        year_str1 = year_str1.substr(0, 4);
                        if (year_str_seleced == year_str1) {
                            selected = 1;
                            items = items + '<option value="' + year_str1 + '" selected>' + year_str1 + "</option>";
                        } else {
                            items = items + '<option value="' + year_str1 + '">' + year_str1 + "</option>";
                        }
                    }
                    if (ct != 0) {
                        if (cta >= ct) {
                            break;
                        }
                    }
                }
                if (selected == 0) {
                    // 年号が一つしかない場合は
                    first_year = data.items[0]["publishDate"];
                    first_year = first_year.substr(0, 4);
                    tp_sts = pramWrite_tp();
                    my_url = location.href;
                    my_url = my_url.replace(/\?.*$/, "");
                    if (typeof first_year !== "undefined") {
                        window.location.href = my_url + "?yr=" + first_year + "&tp=" + tp_sts;
                    }
                }
            }
            items = items + "</select>";
            items = items + "</div>";
            if (data.items.length) {
                $('#yearnavi_out').html(items); // 出力
                $('#fadeIn_content').fadeIn('fast'); // ハイドしてあるコンテンツをフェードインする
                $('#fadeIn_loading').fadeOut('fast');
            }
        })
        .fail(function(data) {
            let str = '<div class="yearnavi"><select class="input-state-select"><option value="' + year + '">' + year + "</option></select></div>";
            $("#yearnavi_out").html(str);
        })
        .always(function(data) {
            return 0;
        });
}
// *********************************************************************************************
//	関数 print_year_sts_cut(記事の変数を抽出)
//	timelyDisclosure（適時開示データ取得用）を使って年数を抽出する
//	入力:
//		base_url:		検索APIのurl
//  出力:
//		<div id="yearnavi_out"></div>
//
// *****************************************************************************
function print_year_sts_cut(base_url, ct_value, cut_out) {
    let dt = new Date();
    let year = dt.getFullYear();
    let m_cut_out = [];

    let year_str = year;
    let year_str1 = year;

    let url = base_url;
    let get_year;

    let ct = (cta = 0);
    if (ct_value !== undefined) {
        ct = ct_value;
    } else {
        ct = 0;
    }

    if (cut_out !== null || cut_out !== undefined) {
        m_cut_out = cut_out.split(",");
    }

    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let year_str_seleced = pramWrite();
            let items = "";
            let selected = 0;
            let ircate = "";

            let first_year = (tp_sts = my_url = "");
            items = items + '<div class="yearnavi">';
            items = items + '<form action="#" method="GET" name="Form_yearnavi">';
            items =
                items +
                '<select class="input-state-select" name="yearnavi_chg" onChange="yearnavi_send()">';
            if (data.items.length) {
                for (let i = 0; i < data.items.length; i++) {
                    // 繰り返し表示
                    ircate = data.items[i]["category"];
                    if (m_cut_out.indexOf(ircate) == -1) {
                        // 予約語以外なら
                        year_str = data.items[i]["publishDate"];
                        year_str = year_str.substr(0, 4);
                        if (year_str !== year_str1) {
                            if (cta == 0) {
                                get_year = year_str;
                            }
                            cta++;
                            year_str1 = data.items[i]["publishDate"];
                            year_str1 = year_str1.substr(0, 4);
                            if (year_str_seleced == year_str1) {
                                selected = 1;
                                items = items + '<option value="' + year_str1 + '" selected>' + year_str1 + "</option>";
                            } else {
                                items = items + '<option value="' + year_str1 + '">' + year_str1 + "</option>";
                            }
                        }
                        if (ct != 0) {
                            if (cta >= ct) {
                                break;
                            }
                        }
                    }
                }
                if (selected == 0) {
                    tp_sts = pramWrite_tp();
                    my_url = location.href;
                    my_url = my_url.replace(/\?.*$/, "");
                    if (typeof get_year !== "undefined") {
                        window.location.href = my_url + "?yr=" + get_year + "&tp=" + tp_sts;
                    }
                }
            }
            items = items + "</select>";
            items = items + "</div>";

            $("#yearnavi_out").html(items); // 出力
            $("#fadeIn_content").fadeIn("fast"); // ハイドしてあるコンテンツをフェードインする
            $("#fadeIn_loading").fadeOut("fast");
        })
        .fail(function(data) {
            let str = '<div class="yearnavi"><select class="input-state-select"><option value="' + year + '">' + year + "</option></select></div>";
            $("#yearnavi_out").html(str);
        })
        .always(function(data) {
            return 0;
        });
}
// *********************************************************************************************
//	関数 print_year_sts2(記事の年数を抽出)
//	base_urlを使って年数を抽出する
//	入力:
//		base_url:	検索APIのurl
//		pageSize:	読み込み最大数
//		cut_out:	省く予約語
//		outputTag:	出力タグ名
//					引数outputTagがない場合デフォルト値:#script_out
//  出力:
//		outputTag
// *****************************************************************************
function print_year_sts2(base_url, pageSize, cut_out, outputTag) {

    let dt = new Date();
    let year = dt.getFullYear();
    let m_cut_out = [];
    if (cut_out !== null || cut_out !== undefined) {
        m_cut_out = cut_out.split(',');
    }
    let year_str = year;
    let year_str1 = year;

    let url = base_url;

    $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000,
        })
        .done(function(data) {
            let year_str_seleced = pramWrite();
            let selected = 0;
            let items = '';
            let ct = 0;
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                if (data.items.length) {
                    items = items + '<div class="yearnavi">';
                    items = items + '<form action="#" method="GET" name="Form_yearnavi">';
                    items = items + '<select class="input-state-select" name="yearnavi_chg" onChange="yearnavi_send()">';
                    for (let i = 0; i < max_itemcount; i++) { // 繰り返し表示
                        let ircate = ircate_icon = data.items[i]['category'];
                        if (m_cut_out.indexOf(ircate) == -1) {
                            if (master_cut_out.indexOf(ircate) == -1) { // 予約語以外なら
                                year_str = data.items[i]['publishDate'];
                                year_str = year_str.substr(0, 4);
                                if (year_str !== year_str1) {
                                    ct++;
                                    year_str1 = data.items[i]['publishDate'];
                                    year_str1 = year_str1.substr(0, 4);
                                    if (year_str_seleced == year_str1) {
                                        selected = 1;
                                        items = items + '<option value="' + year_str1 + '" selected>' + year_str1 + '</option>';
                                    } else {
                                        items = items + '<option value="' + year_str1 + '">' + year_str1 + '</option>';
                                    }
                                }
                                if (ct >= pageSize) { break; }
                            }
                        }
                    }
                    items = items + '</select>';
                    items = items + '</div>';
                    if (selected == 0) { // 年号が一つしかない場合は
                        first_year = data.items[0]['publishDate'];
                        first_year = first_year.substr(0, 4);
                        tp_sts = pramWrite_tp();
                        my_url = location.href;
                        my_url = my_url.replace(/\?.*$/, "");
                        window.location.href = my_url + '?yr=' + first_year + '&tp=' + tp_sts;
                    }
                }
            }
            if (data.items.length) {
                if (outputTag !== null || outputTag !== undefined || outputTag.length > 0) {
                    $(outputTag).html(items); // 出力
                } else {
                    $('#script_out').html(items); // 出力
                }
                $('#fadeIn_content').fadeIn('fast'); // ハイドしてあるコンテンツをフェードインする
                $('#fadeIn_loading').fadeOut('fast');
            }
        })
        .fail(function(data) {
            let str = '<div class="yearnavi"><select><option value="' + year + '">' + year + '</option></select></div>';
            $(outputTag).html(str);
        })
        .always(function(data) {

        });

}
// *********************************************************************************************
//	関数 print_timelydisclosure(IRニュース)
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_desc
//		year:		年度
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_timelydisclosure(pageNo, pageSize, charset, datestyle, order, year, year_select_count, year_select_all) {

    let url = URL_STR_Disclosure;
    let url_1 = '';
    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== null || order !== undefined) {
        url += "&order=" + order;
    } else {
        url += "&order=published_at_desc";
    }
    url_1 = url;
    // 年度
    if (year !== null || year !== undefined) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                if (pageSize > max_itemcount) {
                    pageSize = max_itemcount;
                }
                items = items + '<ul>';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) { break; }
                        ct++;
                        let ircate = (ircate_icon = data.items[i]["category"]);
                        if (ircate == "その他") {
                            ircate_icon = "適時開示";
                        } else {
                            ircate_icon = ircate;
                        }
                        items = items + "<li>";
                        items = items + "<a href=" + data.items[i]["pdf"] + ' target="_blank">';
                        items = items + '<p class="date">' + data.items[i]["publishDate"] + '</p><p class="cate"><span>' + ircate_icon + "</span></p>";
                        items = items + '<p class="entry">' + data.items[i]["title"];
                        items = items + "</p>";
                        items = items + "</a>";
                        items = items + "</li>";
                        if (ct >= pageSize) { break; }
                    }
                }
                items = items + "</ul>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }

            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts(url_1, ys_ct);
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_timelydisclosure_category(カテゴリ絞り込み)
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8e
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			0: 全て
//			1: その他
//			2: 決算短信（非連結）
//			3: 決算短信（連結）
//			4: その他適時開示
//			5: 追加・訂正
//			6: ＰＲ情報等
//			7: 英文資料
//			8: 数値データ
//			9: CG報告書
//		year:		年度(0の場合はすべて）
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_timelydisclosure_category(pageNo, pageSize, charset, datestyle, order, category, year, year_select_count, year_select_all) {

    let url = URL_STR_Disclosure;
    let url_1 = '';
    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== null || order !== undefined) {
        url += "&order=" + order;
    } else {
        url += "&order=published_at_asc";
    }

    if (category !== 0) {
        url += "&category=" + category;
    }
    url_1 = url;

    // 年度
    if (year !== 0) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let max_itemcount = data.paging.itemCount;

            if (max_itemcount > 0) {
                if (pageSize > max_itemcount) {
                    pageSize = max_itemcount;
                }
                items = items + '<div style="width:100%; min-height:200px; position:relative;"><div id="fadeIn_loading" style="width:100%; height:50px; background:url(asset/img/loading01.gif) center center no-repeat; background-size:25px 25px; position:absolute; top:20px; left:0px;"></div><div id="fadeIn_content">';
                items = items + '<ul class="top-news irnews">';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) { break; }
                        ct++;
                        let p_date = data.items[i]['publishDate'];
                        let result = p_date.replace('/', '.');
                        while (result !== p_date) {
                            p_date = p_date.replace('/', '.');
                            result = result.replace('/', '.');
                        }

                        let ircate = (ircate_icon = data.items[i]["category"]);
                        if (ircate == "その他") {
                            ircate_icon = "適時開示";
                        } else if (ircate == "有価証券報告書") {
                            ircate_icon = "有価証券報告書";
                        } else if (ircate == "決算短信（非連結）") {
                            ircate_icon = "決算短信";
                        } else if (ircate == "決算短信（連結）") {
                            ircate_icon = "決算短信";
                        } else if (ircate == "PR情報等") {
                            ircate_icon = "プレスリリース";
                        } else {
                            ircate_icon = ircate;
                        }

                        items = items + '<li class="top-news-item">';
                        items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                        items = items + '</dl></a>';
                        items = items + '</li>';
                        if (ct >= pageSize) { break; }
                    }
                }
                items = items + "</ul></div></div>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }
            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts(url_1, ys_ct);
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_securitiesReport(有価証券報告書)
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			0: 全て
//			a:有価証券報告書
//			b:訂正有価証券報告書
//			c1:第1四半期報告書
//			c2:第2四半期報告書
//			c3:第3四半期報告書
//			c4:第4四半期報告書
//			cq:四半期報告書
//			d1:第1四半期訂正報告書
//			d2:第2四半期訂正報告書
//			d3:第3四半期訂正報告書
//			d4:第4四半期訂正報告書
//			dq:訂正四半期報告書
//			e:半期報告書
//			f:訂正半期報告書
//			g:臨時報告書
//			h:訂正臨時報告書
//			i:有価証券届出書
//			j:訂正有価証券届出書
//		year:		年度(0の場合はすべて）
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_securitiesReport(pageNo, pageSize, charset, datestyle, order, category, year, year_select_count, year_select_all) {

    let url = URL_STR_securitiesReport;
    let url_1 = url;
    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    } else {
        url += "&order=published_at_asc";
    }

    if (category !== 0) {
        url += "&category=" + category;
    }
    url_1 = url;
    // 年度
    if (year !== 0) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                if (pageSize > max_itemcount) {
                    pageSize = max_itemcount;
                }
                items = items + '<div style="width:100%; min-height:200px; position:relative;"><div id="fadeIn_loading" style="width:100%; height:50px; background:url(asset/img/loading01.gif) center center no-repeat; background-size:25px 25px; position:absolute; top:20px; left:0px;"></div><div id="fadeIn_content">';
                items = items + '<ul class="top-news irnews">';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) { break; }
                        ct++;
                        let p_date = data.items[i]['publishDate'];
                        let result = p_date.replace('/', '.');
                        while (result !== p_date) {
                            p_date = p_date.replace('/', '.');
                            result = result.replace('/', '.');
                        }

                        items = items + '<li class="top-news-item">';
                        items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                        items = items + '<dt>' + p_date + '<i>有価証券報告書</i></dt>';
                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                        items = items + '</dl></a>';
                        items = items + '</li>';
                        if (ct >= pageSize) { break; }
                    }
                }
                items = items + "</ul></div></div>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }

            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts(url_1, ys_ct);
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_whatsNew(What's New)
//	note:2018/03/04
//			category=9の抽出が不安定なためcategorySubは、js内で一致させる
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			1:適時開示
//			2:有価証券報告書
//			3:アナリストレポート
//			4:会社情報
//			5:株式・株価情報
//			6:よくある質問
//			7:株主優待情報
//			8:IR資料一括ダウンロード
//			9:カスタマイズメニュー
//		categorySub:	子カテゴリ
//			※適時開示(category=1)
//				0: 全て
//				1: その他
//				2: 決算短信（非連結）
//				3: 決算短信（連結）
//				4: その他適時開示
//				5: 追加・訂正
//				6: ＰＲ情報等
//				7: 英文資料
//				8: 数値データ
//				9: CG報告書
//			※有価証券報告書(category=2)
//				0: 全て
//				a:有価証券報告書
//				b:訂正有価証券報告書
//				c1:第1四半期報告書
//				c2:第2四半期報告書
//				c3:第3四半期報告書
//				c4:第4四半期報告書
//				cq:四半期報告書
//				d1:第1四半期訂正報告書
//				d2:第2四半期訂正報告書
//				d3:第3四半期訂正報告書
//				d4:第4四半期訂正報告書
//				dq:訂正四半期報告書
//				e:半期報告書
//				f:訂正半期報告書
//				g:臨時報告書
//				h:訂正臨時報告書
//				i:有価証券届出書
//				j:訂正有価証券届出書
//			※カスタマイズメニュー(category=9)
//				categorySubはメニュー名を指定できる
//				例)category=9&categorySub=アンケート,電子公告
//		year:		年度(0の場合はすべて）
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_whatsNew(pageNo, pageSize, charset, datestyle, order, category, categorySub, year, year_select_count, year_select_all) {

    let url = URL_STR_whatsNew;
    let url_1 = '';
    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    }

    if (category !== 0) {
        url += "&category=" + category;
    }

    if (category == 1 || category == 2) {
        if (categorySub !== 0) {
            url += "&categorySub=" + categorySub;
        }
    }

    if (categorySub !== 0) {
        url += "&categorySub=" + categorySub;
    }

    url_1 = url;
    // 年度
    if (year !== 0) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                if (pageSize > max_itemcount) {
                    pageSize = max_itemcount;
                }
                items = items + '<div style="width:100%; min-height:200px; position:relative;"><div id="fadeIn_loading" style="width:100%; height:50px; background:url(asset/img/loading01.gif) center center no-repeat; background-size:25px 25px; position:absolute; top:20px; left:0px;"></div><div id="fadeIn_content">';
                items = items + '<ul class="top-news irnews">';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) { break; }
                        ct++;
                        let ircate = (ircate_icon = data.items[i]["category"]);
                        if (category == "1,9") {
                            // コーポレートガバナンス			
                            items = items + '<li class="top-news-item">';
                            items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                            items = items + '<dt>' + data.items[i]['publishDate'] + '<i>' + ircate_icon + '</i></dt>';
                            items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                            items = items + '</dl></a>';
                            items = items + '</li>';

                        } else {
                            if (ircate != "CG報告書") {
                                // CG報告書以外なら

                                if (ircate == "決算短信（非連結）") {
                                    ircate_icon = '決算短信';
                                } else if (ircate == "決算短信（連結）") {
                                    ircate_icon = '決算短信';
                                } else {
                                    //ircate_icon = '適時開示';
                                    ircate_icon = ircate;
                                }

                                // haveContent/pdf/url切り替え
                                if (data.items[i]["haveContent"] == false) {

                                    let p_date = data.items[i]['publishDate'];
                                    let result = p_date.replace('/', '.');
                                    while (result !== p_date) {
                                        p_date = p_date.replace('/', '.');
                                        result = result.replace('/', '.');
                                    }

                                    // 詳細無
                                    if (data.items[i]["pdf"] != "") {
                                        // pdf				
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else if (data.items[i]["url"] != "") {
                                        // url
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['url'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else {
                                        // titleのみ
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<div class="inset"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></div>';
                                        items = items + '</li>';
                                    }
                                } else {
                                    // 詳細ページ
                                    items = items + '<li class="top-news-item">';
                                    items = items + '<a href="##" target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                    items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                    items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                    items = items + '</dl></a>';
                                    items = items + '</li>';
                                }
                            }
                        }
                        if (ct >= pageSize) { break; }
                    }
                }
                items = items + "</ul></div></div>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }
            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts(url_1, ys_ct);
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_whatsNew_all(What's New)
//  What's New内の特定カテゴリーを省いて表示
//  CG報告書は無条件で省く
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			1:適時開示
//			2:有価証券報告書
//			3:アナリストレポート
//			4:会社情報
//			5:株式・株価情報
//			6:よくある質問
//			7:株主優待情報
//			8:IR資料一括ダウンロード
//			9:カスタマイズメニュー
//		cut_out:	省くカテゴリ名
//		year:		年度(0の場合はすべて）
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_whatsNew_all(pageNo, pageSize, charset, datestyle, order, category, cut_out, year, year_select_count, year_select_all) {

    let url = URL_STR_whatsNew;
    let url_1;
    let m_cut_out = [];

    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    }

    if (category !== 0) {
        url += "&category=" + category;
    }
    // 省く文字を配列に入れる
    if (cut_out !== null || cut_out !== undefined) {
        m_cut_out = cut_out.split(",");
    }
    url_1 = url;
    // 年度
    if (year !== 0) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let ircate = "";
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                items = items + '<div style="width:100%; min-height:200px; position:relative;"><div id="fadeIn_loading" style="width:100%; height:50px; background:url(asset/img/loading01.gif) center center no-repeat; background-size:25px 25px; position:absolute; top:20px; left:0px;"></div><div id="fadeIn_content">';
                items = items + '<ul class="top-news irnews">';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) {
                            break;
                        }
                        ircate = ircate_icon = data.items[i]["category"];
                        if (m_cut_out.indexOf(ircate) == -1) {
                            if (master_cut_out.indexOf(ircate) == -1) {
                                // 予約語以外なら
                                ct++;

                                if (ircate == "決算短信（非連結）") {
                                    ircate_icon = '決算短信';
                                } else if (ircate == "決算短信（連結）") {
                                    ircate_icon = '決算短信';
                                } else if (ircate == "PR情報等") {
                                    ircate_icon = 'プレスリリース';
                                } else {
                                    //ircate_icon = '適時開示';
                                    ircate_icon = ircate;
                                }

                                // haveContent/pdf/url切り替え
                                if (data.items[i]["haveContent"] == false || data.items[i]["haveContent"] == undefined) { // 詳細無

                                    let p_date = data.items[i]['publishDate'];
                                    let result = p_date.replace('/', '.');
                                    while (result !== p_date) {
                                        p_date = p_date.replace('/', '.');
                                        result = result.replace('/', '.');
                                    }

                                    if (data.items[i]["pdf"] != "") {
                                        // pdf
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else if (data.items[i]["url"] != "") {
                                        // url
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['url'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else {
                                        // titleのみ
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<div class="inset"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                        items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></div>';
                                        items = items + '</li>';
                                    }
                                } else {
                                    // 詳細ページ
                                    items = items + '<li class="top-news-item">';
                                    items = items + '<a href="##" target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                    items = items + '<dt>' + p_date + '<i>' + ircate_icon + '</i></dt>';
                                    items = items + '<dd>' + data.items[i]['title'] + '</dd>';
                                    items = items + '</dl></a>';
                                    items = items + '</li>';
                                }
                            }
                        }
                        if (ct >= pageSize) {
                            break;
                        }
                    }
                }
                items = items + "</ul></div></div>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }
            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts2(url_1, ys_ct, cut_out, '#yearnavi_out');
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_whatsNew_all_top(What's New)
//  What's New内の特定カテゴリーを省いて表示
//  CG報告書は無条件で省く
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			1:適時開示
//			2:有価証券報告書
//			3:アナリストレポート
//			4:会社情報
//			5:株式・株価情報
//			6:よくある質問
//			7:株主優待情報
//			8:IR資料一括ダウンロード
//			9:カスタマイズメニュー
//		cut_out:	省くカテゴリ名
//		year:		年度(0の場合はすべて）
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1: year_select_count数）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_whatsNew_all_top(pageNo, pageSize, charset, datestyle, order, category, cut_out, year, year_select_count, year_select_all) {

    let url = URL_STR_whatsNew;
    let url_1;
    let m_cut_out = [];

    url = url + DESCRIPTION_CODE;

    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    }

    if (category !== 0) {
        url += "&category=" + category;
    }
    // 省く文字を配列に入れる
    if (cut_out !== null || cut_out !== undefined) {
        m_cut_out = cut_out.split(",");
    }
    url_1 = url;
    // 年度
    if (year !== 0) {
        url += "&year=" + year;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let ct = 0;
            let ircate = "";
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                items = items + '<div style="width:100%; position:relative;"><div id="fadeIn_loading" style="width:100%; height:50px; background:url(asset/img/loading01.gif) center center no-repeat; background-size:25px 25px; position:absolute; top:20px; left:0px;"></div><div id="fadeIn_content">';
                items = items + '<ul class="top-news">';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) {
                        // 繰り返し表示
                        if (i >= max_itemcount) {
                            break;
                        }
                        ircate = ircate_icon = data.items[i]["category"];
                        if (m_cut_out.indexOf(ircate) == -1) {
                            if (master_cut_out.indexOf(ircate) == -1) {
                                // 予約語以外なら
                                ct++;

                                if (ircate == "決算短信（非連結）") {
                                    ircate_icon = '決算短信';
                                } else if (ircate == "決算短信（連結）") {
                                    ircate_icon = '決算短信';
                                } else if (ircate == "PR情報等") {
                                    ircate_icon = 'プレスリリース';
                                } else {
                                    //ircate_icon = '適時開示';
                                    ircate_icon = ircate;
                                }

                                // haveContent/pdf/url切り替え
                                if (data.items[i]["haveContent"] == false || data.items[i]["haveContent"] == undefined) { // 詳細無

                                    let p_date = data.items[i]['publishDate'];
                                    let result = p_date.replace('/', '.');
                                    while (result !== p_date) {
                                        p_date = p_date.replace('/', '.');
                                        result = result.replace('/', '.');
                                    }

                                    if (data.items[i]["pdf"] != "") {
                                        // pdf
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['pdf'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '</dt>';
                                        items = items + '<dd>[' + ircate_icon + ']  ' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else if (data.items[i]["url"] != "") {
                                        // url
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<a href=' + data.items[i]['url'] + ' target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '</dt>';
                                        items = items + '<dd>[' + ircate_icon + ']  ' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></a>';
                                        items = items + '</li>';
                                    } else {
                                        // titleのみ
                                        items = items + '<li class="top-news-item">';
                                        items = items + '<div class="inset"><dl class="top-news-dl">';
                                        items = items + '<dt>' + p_date + '</dt>';
                                        items = items + '<dd>[' + ircate_icon + ']  ' + data.items[i]['title'] + '</dd>';
                                        items = items + '</dl></div>';
                                        items = items + '</li>';
                                    }
                                } else {
                                    // 詳細ページ
                                    items = items + '<li class="top-news-item">';
                                    items = items + '<a href="##" target="_blank" class="top-news-link"><dl class="top-news-dl">';
                                    items = items + '<dt>' + p_date + '</dt>';
                                    items = items + '<dd>[' + ircate_icon + ']  ' + data.items[i]['title'] + '</dd>';
                                    items = items + '</dl></a>';
                                    items = items + '</li>';
                                }
                            }
                        }
                        if (ct >= pageSize) {
                            break;
                        }
                    }
                }
                items = items + "</ul></div></div>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }
            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts2(url_1, ys_ct, cut_out, '#yearnavi_out');
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 print_ircalender(customizeMenu)
//  	IRカレンダー出力用
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：updated_at_desc
//		menuName:	コンテンツ管理一覧のカスタマイズメニュー名
//		year:		年度(0の場合はすべて）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_ircalender(
    pageNo,
    pageSize,
    charset,
    datestyle,
    order,
    menuName,
    year
) {
    let url = URL_STR_customizeMenu;
    url = url + DESCRIPTION_CODE;

    if (pageNo !== null || pageNo !== undefined) {
        url += "&pageNo=" + pageNo;
    } else {
        url += "&pageNo=1";
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += "&charset=" + charset;
    } else {
        url += "&charset=1";
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += "&datestyle=" + datestyle;
    } else {
        url += "&datestyle=1";
    }

    if (order !== 0) {
        url += "&order=" + order;
    } else {
        url += "&order=updated_at_desc";
    }

    url += "&menuName=" + menuName;

    if (year !== 0) {
        url += "&year=" + year;
    } else {
        url += "&year=" + pramWrite();
    }

    let title = [];
    let hash = [];
    let databody = [];
    let publishDateTime = [];
    let str = "";

    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            if (data.error !== "該当するカスタマイズメニューは存在していません。") {
                let max_itemcount = data.paging.itemCount;
                for (i = 0; i < max_itemcount; i++) {
                    ircalender_title[i] = "";
                    ircalender_hash[i] = "";
                    ircalender_databody[i] = "";
                    ircalender_publishDateTime[i] = "";
                }
                if (max_itemcount) {
                    for (let i = 0; i < max_itemcount; i++) {
                        // 繰り返し表示
                        title[i] = data.items[i]["title"];
                        hash[i] = data.items[i]["hash"];
                        publishDateTime[i] = data.items[i]['publishDateTime'];
                    }
                }
                ircalender_suu = max_itemcount;
                ircalender_title = title;
                ircalender_hash = hash;
                ircalender_publishDateTime = publishDateTime;
                for (i = 0; i < max_itemcount; i++) {
                    get_hash_databody(i, menuName, hash[i]);
                }
            } else {
                str = '<p class="inlead">掲載情報がありません。</p>';
                $("#script_out").html(str); // 出力
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// *********************************************************************************************
//	関数 get_hash_databody(num, menuName, hash_tag)
//  	ハッシュタグ取込ircalender_databody[]に書き込む
//	入力:
//		num:		配列
//		menuName:	コンテンツ管理一覧のカスタマイズメニュー名
//		hash_tag:	ハッシュタグ
//  出力:
//		databody
// *****************************************************************************
function get_hash_databody(num, menuName, hash_tag) {
    let url_hash = URL_STR_customizeMenu;
    url_hash = url_hash + DESCRIPTION_CODE;
    url_hash = url_hash + "&menuName=" + menuName;
    url_hash = url_hash + "&hash=" + hash_tag;

    $.ajax({
            type: "GET",
            url: url_hash,
            dataType: "jsonp",
            async: false,
            jsonp: "callback",
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data_hash) {
            if (
                data_hash.error !== "該当するカスタマイズメニューは存在していません。"
            ) {
                ircalender_databody[num] = data_hash.items[0]["databody"];
            }
            view_ircalender();
        })
        .fail(function(data_hash) {
            str = "情報は表示できません";
            return str;
        })
        .always(function(data_hash) {});
}
// *********************************************************************************************
//	関数 view_ircalender()
//  	タイトル、ハッシュ、値をircalender_data_allに格納してタイトル順に並び変えて出力
//	入力:
//		void
//  出力:
//		$('#script_out').html(str)
// *****************************************************************************
function view_ircalender() {
    let ircalender_data_all = [];
    let data_max = [];
    for (let i = 0; i < ircalender_suu; i++) {
        ircalender_data_all[i] = [];
    }
    for (let i = 0; i < ircalender_suu; i++) {
        ircalender_data_all[i][0] = ircalender_title[i];
        ircalender_data_all[i][1] = ircalender_hash[i];
        ircalender_data_all[i][2] = ircalender_databody[i];
        ircalender_data_all[i][3] = ircalender_title[i];
        ircalender_data_all[i][4] = ircalender_publishDateTime[i];
    }
    // 年号の格納
    for (let i = 0; i < ircalender_suu; i++) {
        data_max[i] = ircalender_data_all[i][3].slice(0, 4);
    }
    let ym_max = String(Math.max.apply(null, data_max));
    //  publishDateTimeを使って日付順に並び替え
    ircalender_data_all.sort(function(a, b) {
        let aa = a[4];
        let bb = b[4];
        if (aa < bb) {
            return 1;
        }
        if (aa > bb) {
            return -1;
        }
        return 0;
    });
    // 年を抽出(マージする)
    let ym_str = [];
    let k = 0;
    ym_str[0] = ym_max;
    for (let i = 0; i < ircalender_suu; i++) {
        if (ym_str.indexOf(ircalender_data_all[i][3].slice(0, 4)) == -1) { // 配列内の年号の判定（無ければ）
            k++;
            ym_str[k] = ircalender_data_all[i][3].slice(0, 4);
        }
    }
    str = "";
    for (let i = 0; i < ym_str.length; i++) {
        str = str + '<div class="irr_calendar">';
        str = str + '<h2 class="c-h3">' + ym_str[i].slice(0, 4) + '年</h2>';
        str = str + '<div class="c-split-desc"><table class="c-table"><tbody>';
        for (let k = 0; k < ircalender_suu; k++) {
            if (ym_str[i] == ircalender_data_all[k][3].slice(0, 4)) {
                str = str + "<tr>";
                str = str + '<th>' + ircalender_data_all[k][0] + '</th>';
                str = str + '<td>';
                str = str + ircalender_data_all[k][2].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                str = str + "</td>";
                str = str + "</tr>";
            }
        }
        str = str + "</tbody></table></div>";
        str = str + "</div>";
    }
    $("#script_out").html(str); // 出力
}
// *********************************************************************************************
//	関数 print_whatsNew_all_hash(What's New)
//  What's New内の特定カテゴリーを省いて表示Hashタグ出力（print_whatsNew_allを流用）
//	customizeMenuを使用
//  CG報告書は無条件で省く
//	入力:
//		pageNo:		ページ番号　デフォルトは1
//		pageSize:	ページ毎に表示する件数　デフォルトは10
//		charset:	エンコード　デフォルト値：1　1:UTF-8
//		datestyle:	日付表示スタイル　デフォルト値：5
//		order:		ソート順　デフォルト値：published_at_asc
//		category:	カテゴリ
//			1:適時開示
//			2:有価証券報告書
//			3:アナリストレポート
//			4:会社情報
//			5:株式・株価情報
//			6:よくある質問
//			7:株主優待情報
//			8:IR資料一括ダウンロード
//			9:カスタマイズメニュー
//		cut_out:	省くカテゴリ名
//		year:		年度(0の場合はすべて）
//  出力:
//		<div id="script_out"></div>
// *****************************************************************************
function print_whatsNew_all_hash(pageNo, pageSize, charset, datestyle, order, category, cut_out, year) {

    let url = URL_STR_whatsNew;
    let url_1;
    let m_cut_out = [];

    url = url + DESCRIPTION_CODE;

    if (pageNo !== null || pageNo !== undefined) {
        url += '&pageNo=' + pageNo;
    } else {
        url += '&pageNo=1';
    }

    url += '&pageSize=' + lct;

    if (charset !== null || charset !== undefined) {
        url += '&charset=' + charset;
    } else {
        url += '&charset=1';
    }

    if (datestyle !== null || datestyle !== undefined) {
        url += '&datestyle=' + datestyle;
    } else {
        url += '&datestyle=5';
    }

    if (order !== 0) {
        url += '&order=' + order;
    }

    if (category !== 0) {
        url += '&category=' + category;
    }
    // 省く文字を配列に入れる
    if (cut_out !== null || cut_out !== undefined) {
        m_cut_out = cut_out.split(',');
    }
    url_1 = url;
    // 年度
    if (year !== 0) {
        url += '&year=' + year;
    }

    let title = [];
    let hash = [];
    let databody = [];
    let category_name = [];
    let publishDateTime = [];

    $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000,
        })
        .done(function(data) {
            let items = '';
            let ct = 0;
            let ircate = '';
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                items = items + '<ul>';
                if (data.items.length) {
                    for (let i = 0; i < lct; i++) { // 繰り返し表示
                        if (i >= max_itemcount) { break; }
                        ircate = ircate_icon = data.items[i]['category'];
                        if (m_cut_out.indexOf(ircate) == -1) {
                            if (master_cut_out.indexOf(ircate) == -1) { // 予約語以外なら
                                ct++;
                                // haveContent条件(true)
                                if (data.items[i]['haveContent'] == true) { // HTML コンテンツが含まれる場合、true
                                    for (i = 0; i < max_itemcount; i++) {
                                        whatshash_title[i] = '';
                                        whatshash_hash[i] = '';
                                        whatshash_category[i] = '';
                                        whatshash_databody[i] = '';
                                        whatshash_publishDateTime[i] = '';
                                    }
                                    if (max_itemcount) {
                                        for (let i = 0; i < max_itemcount; i++) { // 繰り返し
                                            title[i] = data.items[i]['title'];
                                            hash[i] = data.items[i]['hash'];
                                            category_name[i] = data.items[i]['category'];
                                            publishDateTime[i] = data.items[i]['publishDateTime'];
                                        }
                                    }
                                    whatshash_suu = max_itemcount;
                                    whatshash_title = title;
                                    whatshash_hash = hash;
                                    whatshash_category = category_name;
                                    whatshash_publishDateTime = publishDateTime;
                                    for (i = 0; i < max_itemcount; i++) {
                                        get_hash_databody_whatsnew(i, whatshash_category[i], hash[i]);
                                    }
                                }
                            }
                        }
                        if (ct >= pageSize) { break; }
                    }
                }
            } else {
                $('#script_out').html('<p class="leadL pb50">掲載情報がありません。</p>');
            }
        })
        .fail(function(data) {
            $('#script_out').html('<p class="leadL pb50">掲載情報がありません。</p>');
        })
        .always(function(data) {

        });
}
// *********************************************************************************************
//	関数 get_hash_databody_whatsnew(num, menuName, hash_tag)
//  		
//	入力:
//		num:		配列
//		menuName:	コンテンツ管理一覧のカスタマイズメニュー名
//		hash_tag:	ハッシュタグ
//  出力:
//		databody
// *****************************************************************************
function get_hash_databody_whatsnew(num, menuName, hash_tag) {

    let url_hash = URL_STR_customizeMenu;
    url_hash = url_hash + DESCRIPTION_CODE;
    url_hash = url_hash + '&menuName=' + menuName;
    url_hash = url_hash + '&hash=' + hash_tag;

    $.ajax({
            type: 'GET',
            url: url_hash,
            dataType: 'jsonp',
            async: false,
            jsonp: "callback",
            crossDomain: true,
            timeout: 1000,
        })
        .done(function(data_hash) {
            if (data_hash.error !== '該当するカスタマイズメニューは存在していません。') {
                whatshash_databody[num] = data_hash.items[0]['databody'];
            }
            view_whatsnew_hash();
        })
        .fail(function(data_hash) {
            str = '情報はありません';
            return (str);
        })
        .always(function(data_hash) {});
}
// *********************************************************************************************
//	関数 view_whatsnew_hash()
//  	タイトル、ハッシュ、値をwhatsnew_data_allに格納してタイトル順に並び変えて出力
//	入力:
//		void
//  出力:
//		$('#script_out').html(str)
// *****************************************************************************
function view_whatsnew_hash() {
    let whatsnew_data_all = [];
    for (let i = 0; i < whatshash_suu; i++) {
        whatsnew_data_all[i] = [];
    }
    for (let i = 0; i < whatshash_suu; i++) {
        whatsnew_data_all[i][0] = whatshash_title[i];
        whatsnew_data_all[i][1] = whatshash_hash[i];
        whatsnew_data_all[i][2] = whatshash_databody[i];
        whatsnew_data_all[i][3] = whatshash_title[i];
        whatsnew_data_all[i][4] = whatshash_publishDateTime[i];
        whatsnew_data_all[i][5] = whatshash_category[i];
    }
    //  publishDateTimeを使って日付順に並び替え
    whatsnew_data_all.sort(function(a, b) {
        let aa = a[4];
        let bb = b[4];
        if (aa < bb) { return 1; }
        if (aa > bb) { return -1; }
        return 0;
    });
    // 年を抽出(マージする)
    let ym_str = [];
    let k = 0;
    ym_str[0] = whatsnew_data_all[0][3].slice(0, 4);
    for (let i = 0; i < whatshash_suu; i++) {
        if (ym_str[k] != whatsnew_data_all[i][3].slice(0, 4)) {
            k++;
            ym_str[k] = whatsnew_data_all[i][3].slice(0, 4);
        }
    }
    str = '';
    for (let i = 0; i < ym_str.length; i++) {
        str = str + '<div class="bgttl">';
        str = str + '<p class="ttl">' + ym_str[i].slice(0, 4) + '年</p></div>';
        str = str + '<ul class="clearfix">';
        for (let k = 0; k < whatshash_suu; k++) {
            if (ym_str[i] == whatsnew_data_all[k][3].slice(0, 4)) {
                str = str + '<li><div>';
                str = str + '<p class="category">' + whatsnew_data_all[k][5];
                str = str + '</p>';
                str = str + '<p class="date">' + whatsnew_data_all[k][0];
                str = str + '</p>';
                str = str + '<p class="entry">';
                str = str + whatsnew_data_all[k][2].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
                str = str + '</p>';
                str = str + '</div></li>';
            }
        }
        str = str + '</ul>';
    }
    $('#script_out').html(str); // 出力
}
// *********************************************************************************************
//	関数 toHalfWidth(半角変換)
//	入力:
//		strVal: 値
//  出力:
//		半角文字
// *********************************************************************************************
function toHalfWidth(strVal) {
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
        function(tmpStr) {
            return String.fromCharCode(tmpStr.charCodeAt(0) - 0xFEE0);
        }
    );

    // 文字コードシフトで対応できない文字の変換
    return halfVal.replace(/”/g, "\"")
        .replace(/’/g, "'")
        .replace(/‘/g, "`")
        .replace(/￥/g, "\\")
        .replace(/　/g, " ")
        .replace(/〜/g, "~");
}
// *********************************************************************************************
//	関数 print_prInfo(株式株価情報データ取得用)
//	入力:
//		year_select_count: 年度セレクト数(0:全て）
//		year_select_all: 年度セレクト全年度表示フラグ（1:全表示）
//  出力:
//		<div id="stockCode"></div>					証券コード
//		<div id="market"></div>						公開市場
//		<div id="closingSummaryPeriod"></div>		決算期
//		<div id="shareDateDescrib"></div>			配当基準日
//		<div id="receiveStockDateDescrib"></div>	受領株主確定日
//		<div id="srockManager"></div>				株主名簿管理人
//		<div id="noticeMethod"></div>				公告方法
//		<div id="closingSummaryNotice"></div>		決算公告
//		<div id="deliveryStation"></div>			取次所
//		<div id="generalMeeting"></div>				定時株主総会
// *****************************************************************************
function print_prInfo(year_select_count, year_select_all) {
    let url = URL_STR_prInfo;
    let url_1 = '';

    url = url + DESCRIPTION_CODE;
    url_1 = url;
    if (year_select_all === null || year_select_all === undefined) {
        year_select_all = 0;
    } else {
        year_select_all = 1;
    }
    $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            let items = "";
            let max_itemcount = data.paging.itemCount;
            if (max_itemcount > 0) {
                if (pageSize > max_itemcount) {
                    pageSize = max_itemcount;
                }
                items = items + "<ul>";
                if (data.items.length) {
                    for (let i = 0; i < pageSize; i++) {
                        // 繰り返し表示
                        items = items + "<li>";
                        items = items + "<a href=" + data.items[i]["pdf"] + ' target="_blank">';
                        items = items + '<p class="date">' + data.items[i]["publishDate"] + '<span class="category">' + ircate_icon + "</span></p>";
                        items = items + '<p class="entry">' + data.items[i]["title"];
                        items = items + "<i>PDF</i>";
                        items = items + "</p>";
                        items = items + "</a>";
                        items = items + "</li>";
                    }
                }
                items = items + "</ul>";
            } else {
                items = '<p class="inlead">掲載情報がありません。</p>';
            }

            $("#script_out").html(items); // 出力
            $("#fadeIn_content").hide();
            // 年度セレクト数
            let ys_ct = 0;
            if (year_select_count !== undefined) {
                ys_ct = year_select_count;
            } else {
                ys_ct = max_itemcount;
            }
            if (year_select_all != 0 || year_select_count == undefined) {
                print_year_sts_all(url_1);
            } else {
                print_year_sts(url_1, ys_ct);
            }
        })
        .fail(function(data) {
            $("#script_out").html('<p class="inlead">掲載情報がありません。</p>');
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 カンマ区切り
// *********************************************************************************************
function thousandsSeparator(value, index, values) {
    value = value.toString().split(/(?=(?:...)*$)/).join(',');
    return value;
}
// 12345
// ********************************************************************************************* //
//	関数 salesAmount(売上高)
//  出力:
// *****************************************************************************
//	関数 get_salesAmount_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_salesAmount_year(datanumber) {
    // 連結データの取得
    let param = "salesAmount";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_salesAmount(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_salesAmount
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_salesAmount(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart01";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = salesAmount_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = salesAmount_ym.length;
                for (i = 0; i < 5; i++) {
                    if (salesAmount_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = salesAmount_ym[i].slice(
                            salesAmount_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = salesAmount_ym[i].slice(
                            0,
                            salesAmount_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (salesAmount_1Q[i] != undefined) {
                        data_1q[i] = salesAmount_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (salesAmount_2Q[i] != undefined) {
                        data_2q[i] = salesAmount_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (salesAmount_3Q[i] != undefined) {
                        data_3q[i] = salesAmount_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (salesAmount_4Q[i] != undefined) {
                        data_4q[i] = salesAmount_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_salesAmount_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_salesAmount_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_salesAmount_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_salesAmount_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_salesAmount_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_salesAmount_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_salesAmount_ym[i] != "-") {
                    d_ym_1[j] = G_salesAmount_ym[i];
                    d_1Q_1[j] = G_salesAmount_1Q[i];
                    d_2Q_1[j] = G_salesAmount_2Q[i];
                    d_3Q_1[j] = G_salesAmount_3Q[i];
                    d_4Q_1[j] = G_salesAmount_4Q[i];
                    j++;
                }
            }

            G_salesAmount_ym = d_ym_1;
            G_salesAmount_1Q = d_1Q_1;
            G_salesAmount_2Q = d_2Q_1;
            G_salesAmount_3Q = d_3Q_1;
            G_salesAmount_4Q = d_4Q_1;

            // Bodyにテーブル数のクラスを追加する
            j = G_salesAmount_ym.length;
            if (j < 5) {
                $("body").removeClass("1st");
                $("body").removeClass("2ed");
                $("body").removeClass("3rd");
                $("body").removeClass("4th");
                switch (j) {
                    case 1:
                        $("body").addClass("1st");
                        break;
                    case 2:
                        $("body").addClass("2ed");
                        break;
                    case 3:
                        $("body").addClass("3rd");
                        break;
                    case 4:
                        $("body").addClass("4th");
                        break;
                }
            } else {
                $("body").removeClass("1st");
                $("body").removeClass("2ed");
                $("body").removeClass("3rd");
                $("body").removeClass("4th");
            }
            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_salesAmount_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_salesAmount_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_salesAmount_ym[i] != undefined) {
                    if (G_salesAmount_1Q[i] != "-") {
                        dat = String(G_salesAmount_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_salesAmount_2Q[i] != "-") {
                        dat = String(G_salesAmount_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_salesAmount_3Q[i] != "-") {
                        dat = String(G_salesAmount_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_salesAmount_4Q[i] != "-") {
                        dat = String(G_salesAmount_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_salesAmount_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_salesAmount_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_salesAmount_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_salesAmount_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_salesAmount_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 operatingIncome(営業利益)
//	関数 operatingIncome(営業利益)
//  出力:
// *****************************************************************************
//	関数 get_operatingIncome_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_operatingIncome_year(datanumber) {
    // 連結データの取得
    let param = "operatingIncome";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_operatingIncome(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_operatingIncome
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_operatingIncome(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart02";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = operatingIncome_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = operatingIncome_ym.length;
                for (i = 0; i < 5; i++) {
                    if (operatingIncome_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = operatingIncome_ym[i].slice(
                            operatingIncome_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = operatingIncome_ym[i].slice(
                            0,
                            operatingIncome_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (operatingIncome_1Q[i] != undefined) {
                        data_1q[i] = operatingIncome_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (operatingIncome_2Q[i] != undefined) {
                        data_2q[i] = operatingIncome_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (operatingIncome_3Q[i] != undefined) {
                        data_3q[i] = operatingIncome_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (operatingIncome_4Q[i] != undefined) {
                        data_4q[i] = operatingIncome_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_operatingIncome_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_operatingIncome_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_operatingIncome_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_operatingIncome_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_operatingIncome_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_operatingIncome_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_operatingIncome_ym[i] != "-") {
                    d_ym_1[j] = G_operatingIncome_ym[i];
                    d_1Q_1[j] = G_operatingIncome_1Q[i];
                    d_2Q_1[j] = G_operatingIncome_2Q[i];
                    d_3Q_1[j] = G_operatingIncome_3Q[i];
                    d_4Q_1[j] = G_operatingIncome_4Q[i];
                    j++;
                }
            }

            G_operatingIncome_ym = d_ym_1;
            G_operatingIncome_1Q = d_1Q_1;
            G_operatingIncome_2Q = d_2Q_1;
            G_operatingIncome_3Q = d_3Q_1;
            G_operatingIncome_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_operatingIncome_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_operatingIncome_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_operatingIncome_ym[i] != undefined) {
                    if (G_operatingIncome_1Q[i] != "-") {
                        dat = String(G_operatingIncome_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_operatingIncome_2Q[i] != "-") {
                        dat = String(G_operatingIncome_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_operatingIncome_3Q[i] != "-") {
                        dat = String(G_operatingIncome_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_operatingIncome_4Q[i] != "-") {
                        dat = String(G_operatingIncome_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_operatingIncome_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingIncome_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingIncome_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingIncome_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_operatingIncome_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 ordinaryIncome(売上高)
//	関数 ordinaryIncome(経常利益)
//  出力:
// *****************************************************************************
//	関数 get_ordinaryIncome_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_ordinaryIncome_year(datanumber) {
    // 連結データの取得
    let param = "ordinaryIncome";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_ordinaryIncome(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_ordinaryIncome
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_ordinaryIncome(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart03";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = ordinaryIncome_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = ordinaryIncome_ym.length;
                for (i = 0; i < 5; i++) {
                    if (ordinaryIncome_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = ordinaryIncome_ym[i].slice(
                            ordinaryIncome_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = ordinaryIncome_ym[i].slice(
                            0,
                            ordinaryIncome_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (ordinaryIncome_1Q[i] != undefined) {
                        data_1q[i] = ordinaryIncome_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (ordinaryIncome_2Q[i] != undefined) {
                        data_2q[i] = ordinaryIncome_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (ordinaryIncome_3Q[i] != undefined) {
                        data_3q[i] = ordinaryIncome_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (ordinaryIncome_4Q[i] != undefined) {
                        data_4q[i] = ordinaryIncome_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_ordinaryIncome_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_ordinaryIncome_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_ordinaryIncome_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_ordinaryIncome_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_ordinaryIncome_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_ordinaryIncome_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_ordinaryIncome_ym[i] != "-") {
                    d_ym_1[j] = G_ordinaryIncome_ym[i];
                    d_1Q_1[j] = G_ordinaryIncome_1Q[i];
                    d_2Q_1[j] = G_ordinaryIncome_2Q[i];
                    d_3Q_1[j] = G_ordinaryIncome_3Q[i];
                    d_4Q_1[j] = G_ordinaryIncome_4Q[i];
                    j++;
                }
            }

            G_ordinaryIncome_ym = d_ym_1;
            G_ordinaryIncome_1Q = d_1Q_1;
            G_ordinaryIncome_2Q = d_2Q_1;
            G_ordinaryIncome_3Q = d_3Q_1;
            G_ordinaryIncome_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_ordinaryIncome_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_ordinaryIncome_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_ordinaryIncome_ym[i] != undefined) {
                    if (G_ordinaryIncome_1Q[i] != "-") {
                        dat = String(G_ordinaryIncome_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_ordinaryIncome_2Q[i] != "-") {
                        dat = String(G_ordinaryIncome_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_ordinaryIncome_3Q[i] != "-") {
                        dat = String(G_ordinaryIncome_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_ordinaryIncome_4Q[i] != "-") {
                        dat = String(G_ordinaryIncome_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_ordinaryIncome_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_ordinaryIncome_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_ordinaryIncome_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_ordinaryIncome_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_ordinaryIncome_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 currentNetIncome(売上高)
//	関数 currentNetIncome(当期純利益)
//  出力:
// *****************************************************************************
//	関数 get_currentNetIncome_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_currentNetIncome_year(datanumber) {
    // 連結データの取得
    let param = "currentNetIncome";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_currentNetIncome(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_currentNetIncome
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_currentNetIncome(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart04";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = currentNetIncome_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = currentNetIncome_ym.length;
                for (i = 0; i < 5; i++) {
                    if (currentNetIncome_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = currentNetIncome_ym[i].slice(
                            currentNetIncome_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = currentNetIncome_ym[i].slice(
                            0,
                            currentNetIncome_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (currentNetIncome_1Q[i] != undefined) {
                        data_1q[i] = currentNetIncome_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (currentNetIncome_2Q[i] != undefined) {
                        data_2q[i] = currentNetIncome_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (currentNetIncome_3Q[i] != undefined) {
                        data_3q[i] = currentNetIncome_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (currentNetIncome_4Q[i] != undefined) {
                        data_4q[i] = currentNetIncome_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_currentNetIncome_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_currentNetIncome_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_currentNetIncome_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_currentNetIncome_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_currentNetIncome_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_currentNetIncome_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_currentNetIncome_ym[i] != "-") {
                    d_ym_1[j] = G_currentNetIncome_ym[i];
                    d_1Q_1[j] = G_currentNetIncome_1Q[i];
                    d_2Q_1[j] = G_currentNetIncome_2Q[i];
                    d_3Q_1[j] = G_currentNetIncome_3Q[i];
                    d_4Q_1[j] = G_currentNetIncome_4Q[i];
                    j++;
                }
            }

            G_currentNetIncome_ym = d_ym_1;
            G_currentNetIncome_1Q = d_1Q_1;
            G_currentNetIncome_2Q = d_2Q_1;
            G_currentNetIncome_3Q = d_3Q_1;
            G_currentNetIncome_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_currentNetIncome_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_currentNetIncome_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_currentNetIncome_ym[i] != undefined) {
                    if (G_currentNetIncome_1Q[i] != "-") {
                        dat = String(G_currentNetIncome_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_currentNetIncome_2Q[i] != "-") {
                        dat = String(G_currentNetIncome_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_currentNetIncome_3Q[i] != "-") {
                        dat = String(G_currentNetIncome_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_currentNetIncome_4Q[i] != "-") {
                        dat = String(G_currentNetIncome_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_currentNetIncome_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncome_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncome_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncome_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_currentNetIncome_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 currentNetIncomePerStock(売上高)
//	関数 currentNetIncomePerStock(1株当たり当期純利益金額)
//  出力:
// *****************************************************************************
//	関数 get_currentNetIncomePerStock_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_currentNetIncomePerStock_year(datanumber) {
    // 連結データの取得
    let param = "currentNetIncomePerStock";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_currentNetIncomePerStock(
                datanumber,
                param,
                j_data_cons_ym,
                j_data_cons_value
            );
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_currentNetIncomePerStock
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_currentNetIncomePerStock(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart05";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = currentNetIncomePerStock_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = currentNetIncomePerStock_ym.length;
                for (i = 0; i < 5; i++) {
                    if (currentNetIncomePerStock_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = currentNetIncomePerStock_ym[i].slice(
                            currentNetIncomePerStock_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = currentNetIncomePerStock_ym[i].slice(
                            0,
                            currentNetIncomePerStock_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (currentNetIncomePerStock_1Q[i] != undefined) {
                        data_1q[i] = currentNetIncomePerStock_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (currentNetIncomePerStock_2Q[i] != undefined) {
                        data_2q[i] = currentNetIncomePerStock_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (currentNetIncomePerStock_3Q[i] != undefined) {
                        data_3q[i] = currentNetIncomePerStock_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (currentNetIncomePerStock_4Q[i] != undefined) {
                        data_4q[i] = currentNetIncomePerStock_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_currentNetIncomePerStock_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_currentNetIncomePerStock_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_currentNetIncomePerStock_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_currentNetIncomePerStock_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_currentNetIncomePerStock_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_currentNetIncomePerStock_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_currentNetIncomePerStock_ym[i] != "-") {
                    d_ym_1[j] = G_currentNetIncomePerStock_ym[i];
                    d_1Q_1[j] = G_currentNetIncomePerStock_1Q[i];
                    d_2Q_1[j] = G_currentNetIncomePerStock_2Q[i];
                    d_3Q_1[j] = G_currentNetIncomePerStock_3Q[i];
                    d_4Q_1[j] = G_currentNetIncomePerStock_4Q[i];
                    j++;
                }
            }

            G_currentNetIncomePerStock_ym = d_ym_1;
            G_currentNetIncomePerStock_1Q = d_1Q_1;
            G_currentNetIncomePerStock_2Q = d_2Q_1;
            G_currentNetIncomePerStock_3Q = d_3Q_1;
            G_currentNetIncomePerStock_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_currentNetIncomePerStock_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_currentNetIncomePerStock_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_currentNetIncomePerStock_ym[i] != undefined) {
                    if (G_currentNetIncomePerStock_1Q[i] != "-") {
                        dat = String(G_currentNetIncomePerStock_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_currentNetIncomePerStock_2Q[i] != "-") {
                        dat = String(G_currentNetIncomePerStock_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_currentNetIncomePerStock_3Q[i] != "-") {
                        dat = String(G_currentNetIncomePerStock_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_currentNetIncomePerStock_4Q[i] != "-") {
                        dat = String(G_currentNetIncomePerStock_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_currentNetIncomePerStock_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncomePerStock_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncomePerStock_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_currentNetIncomePerStock_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_currentNetIncomePerStock_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 roe(売上高)
//	関数 roe(自己資本利益率)
//  出力:
// *****************************************************************************
//	関数 get_roe_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_roe_year(datanumber) {
    // 連結データの取得
    let param = "roe";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_roe(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_roe
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_roe(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart06";
    let chart_type = "line";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = roe_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = roe_ym.length;
                for (i = 0; i < 5; i++) {
                    if (roe_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = roe_ym[i].slice(roe_ym[i].indexOf("/") + 1);
                        let month = ("0" + pram).slice(-2);
                        let year = roe_ym[i].slice(0, roe_ym[i].indexOf("/"));
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (roe_1Q[i] != undefined) {
                        data_1q[i] = roe_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (roe_2Q[i] != undefined) {
                        data_2q[i] = roe_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (roe_3Q[i] != undefined) {
                        data_3q[i] = roe_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (roe_4Q[i] != undefined) {
                        data_4q[i] = roe_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_roe_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_roe_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_roe_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_roe_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_roe_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_roe_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_roe_ym[i] != "-") {
                    d_ym_1[j] = G_roe_ym[i];
                    d_1Q_1[j] = G_roe_1Q[i];
                    d_2Q_1[j] = G_roe_2Q[i];
                    d_3Q_1[j] = G_roe_3Q[i];
                    d_4Q_1[j] = G_roe_4Q[i];
                    j++;
                }
            }

            G_roe_ym = d_ym_1;
            G_roe_1Q = d_1Q_1;
            G_roe_2Q = d_2Q_1;
            G_roe_3Q = d_3Q_1;
            G_roe_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_roe_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_roe_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_roe_ym[i] != undefined) {
                    if (G_roe_1Q[i] != "-") {
                        dat = String(G_roe_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_roe_2Q[i] != "-") {
                        dat = String(G_roe_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_roe_3Q[i] != "-") {
                        dat = String(G_roe_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_roe_4Q[i] != "-") {
                        dat = String(G_roe_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // Lineの場合先頭にNullを入れる
            let d_ym_2 = [];
            let d_1Q_2 = [];
            let d_2Q_2 = [];
            let d_3Q_2 = [];
            let d_4Q_2 = [];

            d_ym_2 = G_roe_ym;
            d_1Q_2 = G_roe_1Q;
            d_2Q_2 = G_roe_2Q;
            d_3Q_2 = G_roe_3Q;
            d_4Q_2 = G_roe_4Q;

            d_ym_2.unshift("");
            d_1Q_2.unshift(null);
            d_2Q_2.unshift(null);
            d_3Q_2.unshift(null);
            d_4Q_2.unshift(null);

            G_roe_ym = d_ym_2;
            G_roe_1Q = d_1Q_2;
            G_roe_2Q = d_2Q_2;
            G_roe_3Q = d_3Q_2;
            G_roe_4Q = d_4Q_2;

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_roe_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0)",
                            //グラフのデータ
                            data: G_roe_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.3)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_roe_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.5)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_roe_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",

                            pointBackgroundColor: "rgba(45,136,185,1)",

                            //グラフのデータ
                            data: G_roe_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ％"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },

                    elements: {
                        line: {
                            tension: 0 // ベジェ曲線無効化
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 roa(売上高)
//	関数 roa(自己資本利益率)
//  出力:
// *****************************************************************************
//	関数 get_roa_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_roa_year(datanumber) {
    // 連結データの取得
    let param = "roa";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_roa(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_roa
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_roa(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart15";
    let chart_type = "line";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = roa_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = roa_ym.length;
                for (i = 0; i < 5; i++) {
                    if (roa_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = roa_ym[i].slice(roa_ym[i].indexOf("/") + 1);
                        let month = ("0" + pram).slice(-2);
                        let year = roa_ym[i].slice(0, roa_ym[i].indexOf("/"));
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (roa_1Q[i] != undefined) {
                        data_1q[i] = roa_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (roa_2Q[i] != undefined) {
                        data_2q[i] = roa_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (roa_3Q[i] != undefined) {
                        data_3q[i] = roa_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (roa_4Q[i] != undefined) {
                        data_4q[i] = roa_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_roe_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_roa_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_roa_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_roa_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_roa_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_roa_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_roe_ym[i] != "-") {
                    d_ym_1[j] = G_roa_ym[i];
                    d_1Q_1[j] = G_roa_1Q[i];
                    d_2Q_1[j] = G_roa_2Q[i];
                    d_3Q_1[j] = G_roa_3Q[i];
                    d_4Q_1[j] = G_roa_4Q[i];
                    j++;
                }
            }

            G_roa_ym = d_ym_1;
            G_roa_1Q = d_1Q_1;
            G_roa_2Q = d_2Q_1;
            G_roa_3Q = d_3Q_1;
            G_roa_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_roa_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_roa_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_roa_ym[i] != undefined) {
                    if (G_roa_1Q[i] != "-") {
                        dat = String(G_roa_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_roa_2Q[i] != "-") {
                        dat = String(G_roa_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_roa_3Q[i] != "-") {
                        dat = String(G_roa_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_roa_4Q[i] != "-") {
                        dat = String(G_roa_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // Lineの場合先頭にNullを入れる
            let d_ym_2 = [];
            let d_1Q_2 = [];
            let d_2Q_2 = [];
            let d_3Q_2 = [];
            let d_4Q_2 = [];

            d_ym_2 = G_roa_ym;
            d_1Q_2 = G_roa_1Q;
            d_2Q_2 = G_roa_2Q;
            d_3Q_2 = G_roa_3Q;
            d_4Q_2 = G_roa_4Q;

            d_ym_2.unshift("");
            d_1Q_2.unshift(null);
            d_2Q_2.unshift(null);
            d_3Q_2.unshift(null);
            d_4Q_2.unshift(null);

            G_roa_ym = d_ym_2;
            G_roa_1Q = d_1Q_2;
            G_roa_2Q = d_2Q_2;
            G_roa_3Q = d_3Q_2;
            G_roa_4Q = d_4Q_2;

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_roa_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0)",
                            //グラフのデータ
                            data: G_roa_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.3)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_roa_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.5)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_roa_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,0)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",

                            pointBackgroundColor: "rgba(45,136,185,1)",

                            //グラフのデータ
                            data: G_roa_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ％"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },

                    elements: {
                        line: {
                            tension: 0 // ベジェ曲線無効化
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}

// ********************************************************************************************* //
//	関数 ros(売上高)
//	関数 ros(自己資本利益率)
//  出力:
// *****************************************************************************
//	関数 get_operatingMargin_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_operatingMargin_year(datanumber) {
    // 連結データの取得
    let param = "operatingMargin";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_operatingMargin(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_roa
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_operatingMargin(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart16";
    let chart_type = "line";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = operatingMargin_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = roa_ym.length;
                for (i = 0; i < 5; i++) {
                    if (operatingMargin_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = operatingMargin_ym[i].slice(
                            operatingMargin_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = operatingMargin_ym[i].slice(
                            0,
                            operatingMargin_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (roa_1Q[i] != undefined) {
                        data_1q[i] = operatingMargin_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (roa_2Q[i] != undefined) {
                        data_2q[i] = operatingMargin_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (roa_3Q[i] != undefined) {
                        data_3q[i] = operatingMargin_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (roa_4Q[i] != undefined) {
                        data_4q[i] = operatingMargin_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_operatingMargin_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_operatingMargin_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_operatingMargin_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_operatingMargin_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_operatingMargin_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_operatingMargin_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_roe_ym[i] != "-") {
                    d_ym_1[j] = G_operatingMargin_ym[i];
                    d_1Q_1[j] = G_operatingMargin_1Q[i];
                    d_2Q_1[j] = G_operatingMargin_2Q[i];
                    d_3Q_1[j] = G_operatingMargin_3Q[i];
                    d_4Q_1[j] = G_operatingMargin_4Q[i];
                    j++;
                }
            }

            G_operatingMargin_ym = d_ym_1;
            G_operatingMargin_1Q = d_1Q_1;
            G_operatingMargin_2Q = d_2Q_1;
            G_operatingMargin_3Q = d_3Q_1;
            G_operatingMargin_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_operatingMargin_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_operatingMargin_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_operatingMargin_ym[i] != undefined) {
                    if (G_operatingMargin_1Q[i] != "-") {
                        dat = String(G_operatingMargin_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_operatingMargin_2Q[i] != "-") {
                        dat = String(G_operatingMargin_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_operatingMargin_3Q[i] != "-") {
                        dat = String(G_operatingMargin_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_operatingMargin_4Q[i] != "-") {
                        dat = String(G_operatingMargin_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // Lineの場合先頭にNullを入れる
            let d_ym_2 = [];
            let d_1Q_2 = [];
            let d_2Q_2 = [];
            let d_3Q_2 = [];
            let d_4Q_2 = [];

            d_ym_2 = G_operatingMargin_ym;
            d_1Q_2 = G_operatingMargin_1Q;
            d_2Q_2 = G_operatingMargin_2Q;
            d_3Q_2 = G_operatingMargin_3Q;
            d_4Q_2 = G_operatingMargin_4Q;

            d_ym_2.unshift("");
            d_1Q_2.unshift(null);
            d_2Q_2.unshift(null);
            d_3Q_2.unshift(null);
            d_4Q_2.unshift(null);

            G_operatingMargin_ym = d_ym_2;
            G_operatingMargin_1Q = d_1Q_2;
            G_operatingMargin_2Q = d_2Q_2;
            G_operatingMargin_3Q = d_3Q_2;
            G_operatingMargin_4Q = d_4Q_2;

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_operatingMargin_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0)",
                            //グラフのデータ
                            data: G_operatingMargin_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.3)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingMargin_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.5)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingMargin_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,0)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",

                            pointBackgroundColor: "rgba(45,136,185,1)",

                            //グラフのデータ
                            data: G_operatingMargin_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ％"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },

                    elements: {
                        line: {
                            tension: 0 // ベジェ曲線無効化
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}

// ********************************************************************************************* //
//	関数 totalAssets(売上高)
//	関数 totalAssets(総資産額)
//  出力:
// *****************************************************************************
//	関数 get_totalAssets_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_totalAssets_year(datanumber) {
    // 連結データの取得
    let param = "totalAssets";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_totalAssets(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_totalAssets
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_totalAssets(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart07";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = totalAssets_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = totalAssets_ym.length;
                for (i = 0; i < 5; i++) {
                    if (totalAssets_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = totalAssets_ym[i].slice(
                            totalAssets_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = totalAssets_ym[i].slice(
                            0,
                            totalAssets_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (totalAssets_1Q[i] != undefined) {
                        data_1q[i] = totalAssets_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (totalAssets_2Q[i] != undefined) {
                        data_2q[i] = totalAssets_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (totalAssets_3Q[i] != undefined) {
                        data_3q[i] = totalAssets_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (totalAssets_4Q[i] != undefined) {
                        data_4q[i] = totalAssets_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_totalAssets_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_totalAssets_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_totalAssets_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_totalAssets_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_totalAssets_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_totalAssets_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_totalAssets_ym[i] != "-") {
                    d_ym_1[j] = G_totalAssets_ym[i];
                    d_1Q_1[j] = G_totalAssets_1Q[i];
                    d_2Q_1[j] = G_totalAssets_2Q[i];
                    d_3Q_1[j] = G_totalAssets_3Q[i];
                    d_4Q_1[j] = G_totalAssets_4Q[i];
                    j++;
                }
            }

            G_totalAssets_ym = d_ym_1;
            G_totalAssets_1Q = d_1Q_1;
            G_totalAssets_2Q = d_2Q_1;
            G_totalAssets_3Q = d_3Q_1;
            G_totalAssets_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_totalAssets_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_totalAssets_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_totalAssets_ym[i] != undefined) {
                    if (G_totalAssets_1Q[i] != "-") {
                        dat = String(G_totalAssets_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_totalAssets_2Q[i] != "-") {
                        dat = String(G_totalAssets_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_totalAssets_3Q[i] != "-") {
                        dat = String(G_totalAssets_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_totalAssets_4Q[i] != "-") {
                        dat = String(G_totalAssets_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_totalAssets_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssets_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssets_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssets_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_totalAssets_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 netAssets(売上高)
//	関数 netAssets(純資産額)
//  出力:
// *****************************************************************************
//	関数 get_netAssets_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_netAssets_year(datanumber) {
    // 連結データの取得
    let param = "netAssets";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_netAssets(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_netAssets
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_netAssets(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart08";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = netAssets_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = netAssets_ym.length;
                for (i = 0; i < 5; i++) {
                    if (netAssets_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = netAssets_ym[i].slice(netAssets_ym[i].indexOf("/") + 1);
                        let month = ("0" + pram).slice(-2);
                        let year = netAssets_ym[i].slice(0, netAssets_ym[i].indexOf("/"));
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (netAssets_1Q[i] != undefined) {
                        data_1q[i] = netAssets_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (netAssets_2Q[i] != undefined) {
                        data_2q[i] = netAssets_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (netAssets_3Q[i] != undefined) {
                        data_3q[i] = netAssets_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (netAssets_4Q[i] != undefined) {
                        data_4q[i] = netAssets_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_netAssets_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_netAssets_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_netAssets_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_netAssets_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_netAssets_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_netAssets_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_netAssets_ym[i] != "-") {
                    d_ym_1[j] = G_netAssets_ym[i];
                    d_1Q_1[j] = G_netAssets_1Q[i];
                    d_2Q_1[j] = G_netAssets_2Q[i];
                    d_3Q_1[j] = G_netAssets_3Q[i];
                    d_4Q_1[j] = G_netAssets_4Q[i];
                    j++;
                }
            }

            G_netAssets_ym = d_ym_1;
            G_netAssets_1Q = d_1Q_1;
            G_netAssets_2Q = d_2Q_1;
            G_netAssets_3Q = d_3Q_1;
            G_netAssets_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_netAssets_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_netAssets_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_netAssets_ym[i] != undefined) {
                    if (G_netAssets_1Q[i] != "-") {
                        dat = String(G_netAssets_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_netAssets_2Q[i] != "-") {
                        dat = String(G_netAssets_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_netAssets_3Q[i] != "-") {
                        dat = String(G_netAssets_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_netAssets_4Q[i] != "-") {
                        dat = String(G_netAssets_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_netAssets_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_netAssets_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_netAssets_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_netAssets_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_netAssets_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 capitalRatio(売上高)
//	関数 capitalRatio(自己資本利益率)
//  出力:
// *****************************************************************************
//	関数 get_capitalRatio_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_capitalRatio_year(datanumber) {
    // 連結データの取得
    let param = "capitalRatio";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合

                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_capitalRatio(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_capitalRatio
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_capitalRatio(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart09";
    let chart_type = "line";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = capitalRatio_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = capitalRatio_ym.length;
                for (i = 0; i < 5; i++) {
                    if (capitalRatio_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = capitalRatio_ym[i].slice(
                            capitalRatio_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = capitalRatio_ym[i].slice(
                            0,
                            capitalRatio_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (capitalRatio_1Q[i] != undefined) {
                        data_1q[i] = capitalRatio_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (capitalRatio_2Q[i] != undefined) {
                        data_2q[i] = capitalRatio_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (capitalRatio_3Q[i] != undefined) {
                        data_3q[i] = capitalRatio_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (capitalRatio_4Q[i] != undefined) {
                        data_4q[i] = capitalRatio_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_capitalRatio_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_capitalRatio_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_capitalRatio_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_capitalRatio_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_capitalRatio_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_capitalRatio_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_capitalRatio_ym[i] != "-") {
                    d_ym_1[j] = G_capitalRatio_ym[i];
                    d_1Q_1[j] = G_capitalRatio_1Q[i];
                    d_2Q_1[j] = G_capitalRatio_2Q[i];
                    d_3Q_1[j] = G_capitalRatio_3Q[i];
                    d_4Q_1[j] = G_capitalRatio_4Q[i];
                    j++;
                }
            }

            G_capitalRatio_ym = d_ym_1;
            G_capitalRatio_1Q = d_1Q_1;
            G_capitalRatio_2Q = d_2Q_1;
            G_capitalRatio_3Q = d_3Q_1;
            G_capitalRatio_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_capitalRatio_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_capitalRatio_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_capitalRatio_ym[i] != undefined) {
                    if (G_capitalRatio_1Q[i] != "-") {
                        dat = String(G_capitalRatio_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_capitalRatio_2Q[i] != "-") {
                        dat = String(G_capitalRatio_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_capitalRatio_3Q[i] != "-") {
                        dat = String(G_capitalRatio_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_capitalRatio_4Q[i] != "-") {
                        dat = String(G_capitalRatio_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // Lineの場合先頭にNullを入れる
            let d_ym_2 = [];
            let d_1Q_2 = [];
            let d_2Q_2 = [];
            let d_3Q_2 = [];
            let d_4Q_2 = [];

            d_ym_2 = G_capitalRatio_ym;
            d_1Q_2 = G_capitalRatio_1Q;
            d_2Q_2 = G_capitalRatio_2Q;
            d_3Q_2 = G_capitalRatio_3Q;
            d_4Q_2 = G_capitalRatio_4Q;

            d_ym_2.unshift("");
            d_1Q_2.unshift(null);
            d_2Q_2.unshift(null);
            d_3Q_2.unshift(null);
            d_4Q_2.unshift(null);

            G_capitalRatio_ym = d_ym_2;
            G_capitalRatio_1Q = d_1Q_2;
            G_capitalRatio_2Q = d_2Q_2;
            G_capitalRatio_3Q = d_3Q_2;
            G_capitalRatio_4Q = d_4Q_2;

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_capitalRatio_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0)",

                            pointBackgroundColor: "rgba(0,0,0,0.4)",

                            //グラフのデータ
                            data: G_capitalRatio_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.3)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",

                            pointBackgroundColor: "rgba(0,0,0,0.4)",

                            //グラフのデータ
                            data: G_capitalRatio_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.5)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",

                            pointBackgroundColor: "rgba(0,0,0,0.4)",

                            //グラフのデータ
                            data: G_capitalRatio_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(235,97,0,0)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",

                            pointBackgroundColor: "rgba(45,136,185,1)",

                            //グラフのデータ
                            data: G_capitalRatio_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ％"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },

                    elements: {
                        line: {
                            tension: 0 // ベジェ曲線無効化
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 totalAssetsPerStock(売上高)
//	関数 totalAssetsPerStock(1株当たり純資産額)
//  出力:
// *****************************************************************************
//	関数 get_totalAssetsPerStock_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_totalAssetsPerStock_year(datanumber) {
    // 連結データの取得
    let param = "totalAssetsPerStock";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_totalAssetsPerStock(
                datanumber,
                param,
                j_data_cons_ym,
                j_data_cons_value
            );
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_totalAssetsPerStock
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_totalAssetsPerStock(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart10";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = totalAssetsPerStock_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = totalAssetsPerStock_ym.length;
                for (i = 0; i < 5; i++) {
                    if (totalAssetsPerStock_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = totalAssetsPerStock_ym[i].slice(
                            totalAssetsPerStock_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = totalAssetsPerStock_ym[i].slice(
                            0,
                            totalAssetsPerStock_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (totalAssetsPerStock_1Q[i] != undefined) {
                        data_1q[i] = totalAssetsPerStock_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (totalAssetsPerStock_2Q[i] != undefined) {
                        data_2q[i] = totalAssetsPerStock_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (totalAssetsPerStock_3Q[i] != undefined) {
                        data_3q[i] = totalAssetsPerStock_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (totalAssetsPerStock_4Q[i] != undefined) {
                        data_4q[i] = totalAssetsPerStock_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_totalAssetsPerStock_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_totalAssetsPerStock_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_totalAssetsPerStock_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_totalAssetsPerStock_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_totalAssetsPerStock_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_totalAssetsPerStock_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_totalAssetsPerStock_ym[i] != "-") {
                    d_ym_1[j] = G_totalAssetsPerStock_ym[i];
                    d_1Q_1[j] = G_totalAssetsPerStock_1Q[i];
                    d_2Q_1[j] = G_totalAssetsPerStock_2Q[i];
                    d_3Q_1[j] = G_totalAssetsPerStock_3Q[i];
                    d_4Q_1[j] = G_totalAssetsPerStock_4Q[i];
                    j++;
                }
            }

            G_totalAssetsPerStock_ym = d_ym_1;
            G_totalAssetsPerStock_1Q = d_1Q_1;
            G_totalAssetsPerStock_2Q = d_2Q_1;
            G_totalAssetsPerStock_3Q = d_3Q_1;
            G_totalAssetsPerStock_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_totalAssetsPerStock_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_totalAssetsPerStock_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_totalAssetsPerStock_ym[i] != undefined) {
                    if (G_totalAssetsPerStock_1Q[i] != "-") {
                        dat = String(G_totalAssetsPerStock_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_totalAssetsPerStock_2Q[i] != "-") {
                        dat = String(G_totalAssetsPerStock_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_totalAssetsPerStock_3Q[i] != "-") {
                        dat = String(G_totalAssetsPerStock_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_totalAssetsPerStock_4Q[i] != "-") {
                        dat = String(G_totalAssetsPerStock_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_totalAssetsPerStock_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssetsPerStock_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssetsPerStock_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_totalAssetsPerStock_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_totalAssetsPerStock_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 operatingCashFlow(売上高)
//	関数 operatingCashFlow(営業活動によるキャッシュ・フロー)
//  出力:
// *****************************************************************************
//	関数 get_operatingCashFlow_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_operatingCashFlow_year(datanumber) {
    // 連結データの取得
    let param = "operatingCashFlow";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_operatingCashFlow(
                datanumber,
                param,
                j_data_cons_ym,
                j_data_cons_value
            );
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_operatingCashFlow
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_operatingCashFlow(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart11";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = operatingCashFlow_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = operatingCashFlow_ym.length;
                for (i = 0; i < 5; i++) {
                    if (operatingCashFlow_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = operatingCashFlow_ym[i].slice(
                            operatingCashFlow_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = operatingCashFlow_ym[i].slice(
                            0,
                            operatingCashFlow_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (operatingCashFlow_1Q[i] != undefined) {
                        data_1q[i] = operatingCashFlow_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (operatingCashFlow_2Q[i] != undefined) {
                        data_2q[i] = operatingCashFlow_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (operatingCashFlow_3Q[i] != undefined) {
                        data_3q[i] = operatingCashFlow_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (operatingCashFlow_4Q[i] != undefined) {
                        data_4q[i] = operatingCashFlow_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_operatingCashFlow_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_operatingCashFlow_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_operatingCashFlow_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_operatingCashFlow_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_operatingCashFlow_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_operatingCashFlow_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_operatingCashFlow_ym[i] != "-") {
                    d_ym_1[j] = G_operatingCashFlow_ym[i];
                    d_1Q_1[j] = G_operatingCashFlow_1Q[i];
                    d_2Q_1[j] = G_operatingCashFlow_2Q[i];
                    d_3Q_1[j] = G_operatingCashFlow_3Q[i];
                    d_4Q_1[j] = G_operatingCashFlow_4Q[i];
                    j++;
                }
            }

            G_operatingCashFlow_ym = d_ym_1;
            G_operatingCashFlow_1Q = d_1Q_1;
            G_operatingCashFlow_2Q = d_2Q_1;
            G_operatingCashFlow_3Q = d_3Q_1;
            G_operatingCashFlow_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_operatingCashFlow_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_operatingCashFlow_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_operatingCashFlow_ym[i] != undefined) {
                    if (G_operatingCashFlow_1Q[i] != "-") {
                        dat = String(G_operatingCashFlow_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_operatingCashFlow_2Q[i] != "-") {
                        dat = String(G_operatingCashFlow_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_operatingCashFlow_3Q[i] != "-") {
                        dat = String(G_operatingCashFlow_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_operatingCashFlow_4Q[i] != "-") {
                        dat = String(G_operatingCashFlow_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_operatingCashFlow_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingCashFlow_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingCashFlow_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_operatingCashFlow_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_operatingCashFlow_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 investmentCashFlow(売上高)
//	関数 investmentCashFlow(投資活動によるキャッシュ・フロー)
//  出力:
// *****************************************************************************
//	関数 get_investmentCashFlow_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_investmentCashFlow_year(datanumber) {
    // 連結データの取得
    let param = "investmentCashFlow";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_investmentCashFlow(
                datanumber,
                param,
                j_data_cons_ym,
                j_data_cons_value
            );
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_investmentCashFlow
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_investmentCashFlow(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart12";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = investmentCashFlow_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = investmentCashFlow_ym.length;
                for (i = 0; i < 5; i++) {
                    if (investmentCashFlow_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = investmentCashFlow_ym[i].slice(
                            investmentCashFlow_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = investmentCashFlow_ym[i].slice(
                            0,
                            investmentCashFlow_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (investmentCashFlow_1Q[i] != undefined) {
                        data_1q[i] = investmentCashFlow_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (investmentCashFlow_2Q[i] != undefined) {
                        data_2q[i] = investmentCashFlow_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (investmentCashFlow_3Q[i] != undefined) {
                        data_3q[i] = investmentCashFlow_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (investmentCashFlow_4Q[i] != undefined) {
                        data_4q[i] = investmentCashFlow_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_investmentCashFlow_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_investmentCashFlow_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_investmentCashFlow_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_investmentCashFlow_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_investmentCashFlow_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_investmentCashFlow_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_investmentCashFlow_ym[i] != "-") {
                    d_ym_1[j] = G_investmentCashFlow_ym[i];
                    d_1Q_1[j] = G_investmentCashFlow_1Q[i];
                    d_2Q_1[j] = G_investmentCashFlow_2Q[i];
                    d_3Q_1[j] = G_investmentCashFlow_3Q[i];
                    d_4Q_1[j] = G_investmentCashFlow_4Q[i];
                    j++;
                }
            }

            G_investmentCashFlow_ym = d_ym_1;
            G_investmentCashFlow_1Q = d_1Q_1;
            G_investmentCashFlow_2Q = d_2Q_1;
            G_investmentCashFlow_3Q = d_3Q_1;
            G_investmentCashFlow_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_investmentCashFlow_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_investmentCashFlow_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_investmentCashFlow_ym[i] != undefined) {
                    if (G_investmentCashFlow_1Q[i] != "-") {
                        dat = String(G_investmentCashFlow_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_investmentCashFlow_2Q[i] != "-") {
                        dat = String(G_investmentCashFlow_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_investmentCashFlow_3Q[i] != "-") {
                        dat = String(G_investmentCashFlow_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_investmentCashFlow_4Q[i] != "-") {
                        dat = String(G_investmentCashFlow_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_investmentCashFlow_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_investmentCashFlow_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_investmentCashFlow_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_investmentCashFlow_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_investmentCashFlow_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 financialCashFlow(売上高)
//	関数 financialCashFlow(財務活動によるキャッシュ・フロー)
//  出力:
// *****************************************************************************
//	関数 get_financialCashFlow_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_financialCashFlow_year(datanumber) {
    // 連結データの取得
    let param = "financialCashFlow";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_financialCashFlow(
                datanumber,
                param,
                j_data_cons_ym,
                j_data_cons_value
            );
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_financialCashFlow
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_financialCashFlow(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart13";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = financialCashFlow_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = financialCashFlow_ym.length;
                for (i = 0; i < 5; i++) {
                    if (financialCashFlow_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = financialCashFlow_ym[i].slice(
                            financialCashFlow_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = financialCashFlow_ym[i].slice(
                            0,
                            financialCashFlow_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (financialCashFlow_1Q[i] != undefined) {
                        data_1q[i] = financialCashFlow_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (financialCashFlow_2Q[i] != undefined) {
                        data_2q[i] = financialCashFlow_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (financialCashFlow_3Q[i] != undefined) {
                        data_3q[i] = financialCashFlow_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (financialCashFlow_4Q[i] != undefined) {
                        data_4q[i] = financialCashFlow_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_financialCashFlow_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_financialCashFlow_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_financialCashFlow_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_financialCashFlow_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_financialCashFlow_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_financialCashFlow_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_financialCashFlow_ym[i] != "-") {
                    d_ym_1[j] = G_financialCashFlow_ym[i];
                    d_1Q_1[j] = G_financialCashFlow_1Q[i];
                    d_2Q_1[j] = G_financialCashFlow_2Q[i];
                    d_3Q_1[j] = G_financialCashFlow_3Q[i];
                    d_4Q_1[j] = G_financialCashFlow_4Q[i];
                    j++;
                }
            }

            G_financialCashFlow_ym = d_ym_1;
            G_financialCashFlow_1Q = d_1Q_1;
            G_financialCashFlow_2Q = d_2Q_1;
            G_financialCashFlow_3Q = d_3Q_1;
            G_financialCashFlow_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_financialCashFlow_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_financialCashFlow_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_financialCashFlow_ym[i] != undefined) {
                    if (G_financialCashFlow_1Q[i] != "-") {
                        dat = String(G_financialCashFlow_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_financialCashFlow_2Q[i] != "-") {
                        dat = String(G_financialCashFlow_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_financialCashFlow_3Q[i] != "-") {
                        dat = String(G_financialCashFlow_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_financialCashFlow_4Q[i] != "-") {
                        dat = String(G_financialCashFlow_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_financialCashFlow_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_financialCashFlow_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_financialCashFlow_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_financialCashFlow_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_financialCashFlow_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// ********************************************************************************************* //
//	関数 remainingSum(売上高)
//	関数 remainingSum(現金及び現金同等物の期末残高)
//  出力:
// *****************************************************************************
//	関数 get_remainingSum_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_remainingSum_year(datanumber) {
    // 連結データの取得
    let param = "remainingSum";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_remainingSum(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_remainingSum
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_remainingSum(datanumber, param, j_data_cons_ym, j_data_cons_value) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart14";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = remainingSum_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = remainingSum_ym.length;
                for (i = 0; i < 5; i++) {
                    if (remainingSum_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = remainingSum_ym[i].slice(
                            remainingSum_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = remainingSum_ym[i].slice(
                            0,
                            remainingSum_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (remainingSum_1Q[i] != undefined) {
                        data_1q[i] = remainingSum_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (remainingSum_2Q[i] != undefined) {
                        data_2q[i] = remainingSum_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (remainingSum_3Q[i] != undefined) {
                        data_3q[i] = remainingSum_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (remainingSum_4Q[i] != undefined) {
                        data_4q[i] = remainingSum_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_remainingSum_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_remainingSum_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_remainingSum_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_remainingSum_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_remainingSum_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_remainingSum_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_remainingSum_ym[i] != "-") {
                    d_ym_1[j] = G_remainingSum_ym[i];
                    d_1Q_1[j] = G_remainingSum_1Q[i];
                    d_2Q_1[j] = G_remainingSum_2Q[i];
                    d_3Q_1[j] = G_remainingSum_3Q[i];
                    d_4Q_1[j] = G_remainingSum_4Q[i];
                    j++;
                }
            }

            G_remainingSum_ym = d_ym_1;
            G_remainingSum_1Q = d_1Q_1;
            G_remainingSum_2Q = d_2Q_1;
            G_remainingSum_3Q = d_3Q_1;
            G_remainingSum_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_remainingSum_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_remainingSum_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_remainingSum_ym[i] != undefined) {
                    if (G_remainingSum_1Q[i] != "-") {
                        dat = String(G_remainingSum_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_remainingSum_2Q[i] != "-") {
                        dat = String(G_remainingSum_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_remainingSum_3Q[i] != "-") {
                        dat = String(G_remainingSum_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_remainingSum_4Q[i] != "-") {
                        dat = String(G_remainingSum_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_remainingSum_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_remainingSum_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_remainingSum_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_remainingSum_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_remainingSum_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 百万円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}

// ********************************************************************************************* //
//	関数 dividendPershare(売上高)
//	関数 dividendPershare(営業活動によるキャッシュ・フロー)
//  出力:
// *****************************************************************************
//	関数 get_dividendPershare_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_dividendPershare_year(datanumber) {
    // 連結データの取得
    let param = "dividendPershare";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_dividendPershare(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_dividendPershare
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_dividendPershare(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart17";
    let chart_type = "bar";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = dividendPershare_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = dividendPershare_ym.length;
                for (i = 0; i < 5; i++) {
                    if (dividendPershare_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = dividendPershare_ym[i].slice(
                            dividendPershare_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = dividendPershare_ym[i].slice(
                            0,
                            dividendPershare_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (dividendPershare_1Q[i] != undefined) {
                        data_1q[i] = dividendPershare_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (dividendPershare_2Q[i] != undefined) {
                        data_2q[i] = dividendPershare_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (dividendPershare_3Q[i] != undefined) {
                        data_3q[i] = dividendPershare_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (dividendPershare_4Q[i] != undefined) {
                        data_4q[i] = dividendPershare_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_dividendPershare_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_dividendPershare_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_dividendPershare_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_dividendPershare_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_dividendPershare_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_dividendPershare_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_dividendPershare_ym[i] != "-") {
                    d_ym_1[j] = G_dividendPershare_ym[i];
                    d_1Q_1[j] = G_dividendPershare_1Q[i];
                    d_2Q_1[j] = G_dividendPershare_2Q[i];
                    d_3Q_1[j] = G_dividendPershare_3Q[i];
                    d_4Q_1[j] = G_dividendPershare_4Q[i];
                    j++;
                }
            }

            G_dividendPershare_ym = d_ym_1;
            G_dividendPershare_1Q = d_1Q_1;
            G_dividendPershare_2Q = d_2Q_1;
            G_dividendPershare_3Q = d_3Q_1;
            G_dividendPershare_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_dividendPershare_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_dividendPershare_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_dividendPershare_ym[i] != undefined) {
                    if (G_dividendPershare_1Q[i] != "-") {
                        dat = String(G_dividendPershare_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_dividendPershare_2Q[i] != "-") {
                        dat = String(G_dividendPershare_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_dividendPershare_3Q[i] != "-") {
                        dat = String(G_dividendPershare_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_dividendPershare_4Q[i] != "-") {
                        dat = String(G_dividendPershare_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_dividendPershare_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.1)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_dividendPershare_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.3)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_dividendPershare_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0.5)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.4)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_dividendPershare_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,9)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 0.5,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,1)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",
                            //グラフのデータ
                            data: G_dividendPershare_4Q
                        }
                    ]
                },
                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 円"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}

//// ********************************************************************************************* //
//	関数 dividendRatio(売上高)
//	関数 dividendRatio(自己資本利益率)
//  出力:
// *****************************************************************************
//	関数 get_dividendRatio_year(売上高)
//		過去５年の決算年を取得する
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//  出力:
//		void
// *****************************************************************************
function get_dividendRatio_year(datanumber) {
    // 連結データの取得
    let param = "dividendRatio";
    let j_data_cons_ym = [];
    let j_data_cons_value = [];
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let data_yn_suu;
    let i = 0;
    let j_ym = [];
    let j_value = [];

    $.ajax({
            type: "GET",
            url: url_t,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            data_yn_suu = data.paging.itemCount;
            if (data_yn_suu > 0) {
                // 通期データがある場合
                for (i = 0; i < data_yn_suu; i++) {
                    j_ym[i] =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    j_value[i] = data.items[i][param];
                }
                let dd_ym1 = j_ym;
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                for (i = 0; i < dd_ym2.length; i++) {
                    let ym = dd_ym2[i];
                    let ii = j_ym.indexOf(ym);
                    if (ii != -1) {
                        j_data_cons_value[i] = j_value[ii];
                        j_data_cons_ym[i] = ym;
                    }
                }
            }
            // グラフ表示
            pr_dividendRatio(datanumber, param, j_data_cons_ym, j_data_cons_value);
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}
// *****************************************************************************
//	関数 pr_dividendRatio
//		グラフ表示
//	入力
//		datanumber: グラフに使用しているデータの出力項目
//		param: データの出力項目名
//		j_data_cons_ym: 通期データ(年月)
//		j_data_cons_value: 通期データ(値)
//  出力:
//		グラフ
// *****************************************************************************
function pr_dividendRatio(
    datanumber,
    param,
    j_data_cons_ym,
    j_data_cons_value
) {
    let pageSize = 100;
    let sa_yr_val = new Array();
    let ret_data = new Array();
    let ret_data1 = "";
    let i = 0;
    let j = 0;
    let k = 0;
    let url_4 =
        url_all_4 + "&datanumber=" + datanumber + "&order=year_quarter_desc";
    let url_t =
        url_all_t + "&datanumber=" + datanumber + "&order=year_quarter_desc";

    let chart_element = "Chart18";
    let chart_type = "line";

    let data_ym = [];
    let data_1q = [];
    let data_2q = [];
    let data_3q = [];
    let data_4q = [];
    let j_data_ym = [];
    let j_data_1q = [];
    let j_data_2q = [];
    let j_data_3q = [];
    let j_data_4q = [];
    let mg_data_ym = [];
    let mg_data_1q = [];
    let mg_data_2q = [];
    let mg_data_3q = [];
    let mg_data_4q = [];
    let data_yn_suu = 0;
    let j_data_yn_suu = 0;
    let j_ret_data1;
    let j_ret_data = [];

    let value;
    let ct;
    let ym_check = [];
    ym_check = dividendRatio_ym;

    $.ajax({
            type: "GET",
            url: url_4,
            dataType: "jsonp",
            async: false,
            jsonp: "callback", // jsonpのコールバック関数キー（default: callback）
            crossDomain: true,
            timeout: 1000
        })
        .done(function(data) {
            for (i = 0; i < 5; i++) {
                data_ym[i] = "-";
                data_1q[i] = "-";
                data_2q[i] = "-";
                data_3q[i] = "-";
                data_4q[i] = "-";
                j_data_ym[i] = "-";
                j_data_1q[i] = "-";
                j_data_2q[i] = "-";
                j_data_3q[i] = "-";
                j_data_4q[i] = "-";
            }

            // デフォルト変数の精査(数値が格納されているかどうか)
            let flg = ym_check.some(function(value) {
                if (
                    value != undefined &&
                    value != null &&
                    value != "-" &&
                    value != ""
                ) {
                    return true; // データがある場合
                } else {
                    return false;
                }
            });
            if (flg == true) {
                // データが格納されている
                // デフォルト変数の精査
                data_yn_suu = dividendRatio_ym.length;
                for (i = 0; i < 5; i++) {
                    if (dividendRatio_ym[i] != undefined) {
                        // 年月をYYYY/MMにそろえる
                        let pram = dividendRatio_ym[i].slice(
                            dividendRatio_ym[i].indexOf("/") + 1
                        );
                        let month = ("0" + pram).slice(-2);
                        let year = dividendRatio_ym[i].slice(
                            0,
                            dividendRatio_ym[i].indexOf("/")
                        );
                        data_ym[i] = year + "/" + month;
                    } else {
                        data_ym[i] = "-";
                    }
                    if (dividendRatio_1Q[i] != undefined) {
                        data_1q[i] = dividendRatio_1Q[i];
                    } else {
                        data_1q[i] = "-";
                    }
                    if (dividendRatio_2Q[i] != undefined) {
                        data_2q[i] = dividendRatio_2Q[i];
                    } else {
                        data_2q[i] = "-";
                    }
                    if (dividendRatio_3Q[i] != undefined) {
                        data_3q[i] = dividendRatio_3Q[i];
                    } else {
                        data_3q[i] = "-";
                    }
                    if (dividendRatio_4Q[i] != undefined) {
                        data_4q[i] = dividendRatio_4Q[i];
                    } else {
                        data_4q[i] = "-";
                    }
                }
            }

            // APIデータの確認
            let max_itemcount = data.paging.itemCount; // APIデータ数
            if (max_itemcount > 0) {
                k = 0;
                j_ret_data[k] =
                    data.items[k]["year"].slice(0, 4) +
                    "/" +
                    data.items[k]["month"].slice(0, 2); // 最新の年号
                for (i = 0; i < max_itemcount; i++) {
                    j_ret_data1 =
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2);
                    if (j_ret_data[k] != j_ret_data1) {
                        k++;
                        j_ret_data[k] = j_ret_data1;
                    }
                }
                j_data_ym = j_ret_data;
                j_data_yn_suu = j_data_ym.length;
                // valueの格納
                for (i = 0; i < max_itemcount; i++) {
                    let qt = data.items[i]["yearQuarter"];
                    let vl = data.items[i][param];
                    let iti = j_ret_data.indexOf(
                        data.items[i]["year"].slice(0, 4) +
                        "/" +
                        data.items[i]["month"].slice(0, 2)
                    );
                    switch (qt) {
                        case "1Q":
                            j_data_1q[iti] = vl;
                            break;
                        case "2Q":
                            j_data_2q[iti] = vl;
                            break;
                        case "3Q":
                            j_data_3q[iti] = vl;
                            break;
                        case "4Q":
                            j_data_4q[iti] = vl;
                            break;
                    }
                }
            }

            // データのマージ
            let dd_ym = [];
            let dd_1q = [];
            let dd_2q = [];
            let dd_3q = [];
            let dd_4q = [];
            if (j_data_yn_suu == 0) {
                // APIデータがない場合(defaultを使用する）
                for (i = 0; i < 5; i++) {
                    if (data_ym[i] != "-") {
                        mg_data_ym[i] = data_ym[i];
                        mg_data_1q[i] = data_1q[i];
                        mg_data_2q[i] = data_2q[i];
                        mg_data_3q[i] = data_3q[i];
                        mg_data_4q[i] = data_4q[i];
                    } else {
                        mg_data_ym[i] = "-";
                        mg_data_1q[i] = "-";
                        mg_data_2q[i] = "-";
                        mg_data_3q[i] = "-";
                        mg_data_4q[i] = "-";
                    }
                }
            } else {
                // APIにデータがある場合
                let dd_ym1 = j_data_ym.concat(data_ym);
                // 配列内の文字列を昇順
                dd_ym1.sort(function(a, b) {
                    return a > b ? -1 : 1;
                });
                // 同じものを詰める
                let dd_ym2 = dd_ym1.filter(function(x, i, self) {
                    return self.indexOf(x) === i;
                });
                // 5年分を切り出す
                for (i = 0; i < 5; i++) {
                    if (dd_ym2[i] != undefined) {
                        if (dd_ym2[i] != "-") {
                            dd_ym[i] = dd_ym2[i];
                        }
                    }
                }

                // データをマージする
                for (i = 0; i < 5; i++) {
                    if (dd_ym[i] != undefined) {
                        let ym = dd_ym[i]; //年月
                        let ii = j_data_ym.indexOf(ym); // APIデータの検査(-1以外:あり）
                        let ii_m = dd_ym.indexOf(ym); // デフォルトデータの検査(-1以外:あり）
                        if (ii != -1) {
                            // APIあり
                            if (j_data_1q[ii] != "-") {
                                if (j_data_1q[ii] != undefined) {
                                    dd_1q[ii_m] = j_data_1q[ii];
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_1q[ii] != undefined) {
                                        dd_1q[ii_m] = data_1q[kk];
                                    } else {
                                        dd_1q[ii_m] = "-";
                                    }
                                } else {
                                    dd_1q[ii_m] = "-";
                                }
                            }
                            if (j_data_2q[ii] != "-") {
                                if (j_data_2q[ii] != undefined) {
                                    dd_2q[ii_m] = j_data_2q[ii];
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_2q[ii] != undefined) {
                                        dd_2q[ii_m] = data_2q[kk];
                                    } else {
                                        dd_2q[ii_m] = "-";
                                    }
                                } else {
                                    dd_2q[ii_m] = "-";
                                }
                            }
                            if (j_data_3q[ii] != "-") {
                                if (j_data_3q[ii] != undefined) {
                                    dd_3q[ii_m] = j_data_3q[ii];
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_3q[ii] != undefined) {
                                        dd_3q[ii_m] = data_3q[kk];
                                    } else {
                                        dd_3q[ii_m] = "-";
                                    }
                                } else {
                                    dd_3q[ii_m] = "-";
                                }
                            }
                            if (j_data_4q[ii] != "-") {
                                if (j_data_4q[ii] != undefined) {
                                    dd_4q[ii_m] = j_data_4q[ii];
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            } else {
                                // JSONに値がない場合
                                let kk = data_ym.indexOf(ym);
                                if (kk != -1) {
                                    if (data_4q[ii] != undefined) {
                                        dd_4q[ii_m] = data_4q[kk];
                                    } else {
                                        dd_4q[ii_m] = "-";
                                    }
                                } else {
                                    dd_4q[ii_m] = "-";
                                }
                            }
                        } else {
                            //API無
                            let ym2 = dd_ym[i]; //年月
                            let ii2 = data_ym.indexOf(ym2); // デフォルトデータの検査(-1以外:あり）
                            let ii_m = dd_ym.indexOf(ym2);
                            if (ii2 != -1) {
                                dd_1q[ii_m] = data_1q[ii2];
                                dd_2q[ii_m] = data_2q[ii2];
                                dd_3q[ii_m] = data_3q[ii2];
                                dd_4q[ii_m] = data_4q[ii2];
                            }
                        }
                    }
                }
                mg_data_ym = dd_ym;
                mg_data_1q = dd_1q;
                mg_data_2q = dd_2q;
                mg_data_3q = dd_3q;
                mg_data_4q = dd_4q;
            }

            // 連結データの検査
            if (j_data_cons_ym.length) {
                for (i = 0; i < j_data_cons_ym.length; i++) {
                    let ym = j_data_cons_ym[i];
                    let ii = mg_data_ym.indexOf(ym);
                    if (ii != -1) {
                        // 連結データを代入する年月があれば
                        mg_data_4q[ii] = j_data_cons_value[i];
                    } else {
                        // 連結データがない場合 かつ 取込データが最新ならば
                        let max_ym = mg_data_ym[0];
                        if (max_ym < ym) {
                            mg_data_ym.unshift(ym);
                            mg_data_4q.unshift(j_data_cons_value[i]);
                        }
                    }
                }
            }
            if (j_data_cons_ym.length) {
                for (i = 0, j = 0; i < 5; i++) {
                    if (mg_data_ym[i] == "-") {
                        j++;
                    }
                }
                if (j == 5) {
                    mg_data_ym = j_data_cons_ym;
                    mg_data_4q = j_data_cons_value;
                }
            }

            // グローバル変数に格納
            G_dividendRatio_ym = mg_data_ym;
            let d_ym = [];
            let d_1Q = [];
            let d_2Q = [];
            let d_3Q = [];
            let d_4Q = [];
            k = 0;
            let m = 0;

            m = mg_data_ym.length;
            for (k = 0; k < mg_data_ym.length; k++) {
                m--;
                d_ym[m] = mg_data_ym[k];
            }
            G_dividendRatio_ym = d_ym;

            m = mg_data_1q.length;
            for (k = 0; k < mg_data_1q.length; k++) {
                m--;
                d_1Q[m] = mg_data_1q[k];
            }
            G_dividendRatio_1Q = d_1Q;

            m = mg_data_2q.length;
            for (k = 0; k < mg_data_2q.length; k++) {
                m--;
                d_2Q[m] = mg_data_2q[k];
            }
            G_dividendRatio_2Q = d_2Q;

            m = mg_data_3q.length;
            for (k = 0; k < mg_data_3q.length; k++) {
                m--;
                d_3Q[m] = mg_data_3q[k];
            }
            G_dividendRatio_3Q = d_3Q;

            m = mg_data_4q.length;
            for (k = 0; k < mg_data_4q.length; k++) {
                m--;
                d_4Q[m] = mg_data_4q[k];
            }
            G_dividendRatio_4Q = d_4Q;

            let d_ym_1 = [];
            let d_1Q_1 = [];
            let d_2Q_1 = [];
            let d_3Q_1 = [];
            let d_4Q_1 = [];
            j = 0;
            for (i = 0; i < mg_data_ym.length; i++) {
                if (G_dividendRatio_ym[i] != "-") {
                    d_ym_1[j] = G_dividendRatio_ym[i];
                    d_1Q_1[j] = G_dividendRatio_1Q[i];
                    d_2Q_1[j] = G_dividendRatio_2Q[i];
                    d_3Q_1[j] = G_dividendRatio_3Q[i];
                    d_4Q_1[j] = G_dividendRatio_4Q[i];
                    j++;
                }
            }

            G_dividendRatio_ym = d_ym_1;
            G_dividendRatio_1Q = d_1Q_1;
            G_dividendRatio_2Q = d_2Q_1;
            G_dividendRatio_3Q = d_3Q_1;
            G_dividendRatio_4Q = d_4Q_1;

            // 年度の表示
            j = 1;
            for (i = 0; i < 5; i++) {
                if (G_dividendRatio_ym[i] != undefined) {
                    $("#" + param + "_year" + j).html(G_dividendRatio_ym[i]);
                }
                j++;
            }

            // 各クォーター・年度の値を表示
            j = 1;
            let dat = "";
            for (i = 0; i < 5; i++) {
                if (G_dividendRatio_ym[i] != undefined) {
                    if (G_dividendRatio_1Q[i] != "-") {
                        dat = String(G_dividendRatio_1Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_1Q").html(dat);
                    if (G_dividendRatio_2Q[i] != "-") {
                        dat = String(G_dividendRatio_2Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_2Q").html(dat);
                    if (G_dividendRatio_3Q[i] != "-") {
                        dat = String(G_dividendRatio_3Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_3Q").html(dat);
                    if (G_dividendRatio_4Q[i] != "-") {
                        dat = String(G_dividendRatio_4Q[i]).replace(
                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1,"
                        );
                        dat = String(Number(dat).toFixed(2));
                    } else {
                        dat = "-";
                    }
                    $("#" + param + "_" + String(j) + "_4Q").html(dat);
                }
                j++;
            }

            // Lineの場合先頭にNullを入れる
            let d_ym_2 = [];
            let d_1Q_2 = [];
            let d_2Q_2 = [];
            let d_3Q_2 = [];
            let d_4Q_2 = [];

            d_ym_2 = G_dividendRatio_ym;
            d_1Q_2 = G_dividendRatio_1Q;
            d_2Q_2 = G_dividendRatio_2Q;
            d_3Q_2 = G_dividendRatio_3Q;
            d_4Q_2 = G_dividendRatio_4Q;

            d_ym_2.unshift("");
            d_1Q_2.unshift(null);
            d_2Q_2.unshift(null);
            d_3Q_2.unshift(null);
            d_4Q_2.unshift(null);

            G_dividendRatio_ym = d_ym_2;
            G_dividendRatio_1Q = d_1Q_2;
            G_dividendRatio_2Q = d_2Q_2;
            G_dividendRatio_3Q = d_3Q_2;
            G_dividendRatio_4Q = d_4Q_2;

            // グラフを表示
            // Chartデータセット
            let ctx01 = document.getElementById(chart_element).getContext("2d");
            let chart = new Chart(ctx01, {
                // 作成するグラフの種類
                type: chart_type,

                // ラベルとデータセットを設定
                data: {
                    labels: G_dividendRatio_ym,
                    datasets: [{
                            type: chart_type,
                            //凡例
                            label: "1Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0.4)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0)",
                            //グラフのデータ
                            data: G_dividendRatio_1Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "2Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.3)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_dividendRatio_2Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "3Q",
                            //背景色
                            backgroundColor: "rgba(0,0,0,0)",
                            //枠線の色
                            borderColor: "rgba(0,0,0,0.5)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(0,0,0,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(0,0,0,0.4)",
                            //グラフのデータ
                            data: G_dividendRatio_3Q
                        },
                        {
                            type: chart_type,
                            //凡例
                            label: "通期",
                            //背景色
                            backgroundColor: "rgba(45,136,185,0)",
                            //枠線の色
                            borderColor: "rgba(45,136,185,1)",
                            //枠線の太さ
                            borderWidth: 4,
                            //背景色（ホバーしたときに）
                            hoverBackgroundColor: "rgba(45,136,185,0)",
                            //枠線の色（ホバーしたときに）
                            hoverBorderColor: "rgba(45,136,185,1)",

                            pointBackgroundColor: "rgba(45,136,185,1)",

                            //グラフのデータ
                            data: G_dividendRatio_4Q
                        }
                    ]
                },

                // オプション設定
                options: {
                    responsive: true,

                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (
                                    tooltipItem.yLabel
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ％"
                                );
                            }
                        }
                    },
                    scales: {
                        //縦軸の設定
                        yAxes: [{
                            //目盛りの設定
                            ticks: {
                                //max:15000,
                                suggestedMin: 0,
                                //stepSize:5000,
                                fontSize: 10,
                                userCallback: thousandsSeparator
                            }
                        }],
                        xAxes: [{
                            //目盛りの設定
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontSize: 10,
                            padding: 20
                        }
                    },

                    layout: {
                        //レイアウト
                        padding: {
                            //余白設定
                            left: 100,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },

                    elements: {
                        line: {
                            tension: 0 // ベジェ曲線無効化
                        }
                    }
                }
            });
            return true;
        })
        .fail(function(data) {
            return false;
        })
        .always(function(data) {});
}