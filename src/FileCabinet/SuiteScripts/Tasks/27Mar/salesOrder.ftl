<?xml version="1.0"?>
<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
<pdf>
    <head>
        <link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}"
            src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}"
            src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />
        <#if .locale == "zh_CN">
        <link name="NotoSansCJKsc" type="font" subtype="opentype"
            src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />
        <#elseif .locale == "zh_TW">
        <link name="NotoSansCJKtc" type="font" subtype="opentype"
            src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />
        <#elseif .locale == "ja_JP">
        <link name="NotoSansCJKjp" type="font" subtype="opentype"
            src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />
        <#elseif .locale == "ko_KR">
        <link name="NotoSansCJKkr" type="font" subtype="opentype"
            src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />
        <#elseif .locale == "th_TH">
            <link name="NotoSansThai" type="font" subtype="opentype"
                src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}"
                bytes="2" />
        </#if>
        <style>table { font-size: 9pt; table-layout: fixed; width: 100%; }
            th { font-weight: bold; font-size: 8pt; vertical-align: middle; padding: 5px 6px 3px;
            background-color: #e3e3e3; color: #333333; padding-bottom: 10px; padding-top: 10px; }
            td { padding: 4px 6px; }
            b { font-weight: bold; color: #333333; }
</style>
    </head>
    <body padding="0.5in 0.5in 0.5in 0.5in" size="Letter">
        <table style="width: 100%; font-size: 10pt;">
            <tr>
                <td>${companyInformation.companyName}</td>
                <td rowspan="2">
                    <span style="font-size: 28pt;">${record@title}</span>
                </td>
            </tr>
            <tr>
                <td>${companyInformation.addressText}</td>
            </tr>
        </table>
        <br />
        <table>
            <tr>
                <td>
                    <strong>${record.custrecord_date_lsa@label}</strong>
                </td>
                <td>${record.custrecord_date_lsa}</td>
                <td style="width: 10%;">&nbsp;</td>
                <td>
                    <strong>${record.externalid@label}</strong>
                </td>
                <td>${record.externalid}</td>
            </tr>
            <tr>
                <td>
                    <strong>${record.custrecord_link_lsa@label}</strong>
                </td>
                <td>${record.custrecord_link_lsa}</td>
                <td style="width: 10%;">&nbsp;</td>
                <td>
                    <strong>${record.scriptid@label}</strong>
                </td>
                <td>${record.scriptid}</td>
            </tr>
            <tr>
                <th  align="center" colspan="4" style="padding: 10px 6px;">Tran Id</th>
                <th  align="center" colspan="4" style="padding: 10px 6px;">Trandate</th>
                <th  align="center" colspan="4" style="padding: 10px 6px;">Department</th>
                <th  align="center" colspan="4" style="padding: 10px 6px;">Rate</th>
                <th  align="center" colspan="4" style="padding: 10px 6px;">Amount</th>
            </tr>
            <#list salesResult.projectTask as sodetails>
                <!-- <tr>
        <td><strong>abc ${record.id@label}</strong></td>
        <th>${sodetails.tranid}</th>
        <td style="width: 10%;">&nbsp;</td>
        <td><strong>${record.custrecord_link_name_lsa@label}</strong></td>
        <td>${record.custrecord_link_name_lsa}</td>
    </tr> -->

              
                <tr>
                    <td align="center" colspan="4" style="padding: 10px 6px;">${sodetails.tranid}</td>
                    <td align="center" colspan="4" style="padding: 10px 6px;">${sodetails.trandate}</td>
                    <td align="center" colspan="4" line-height="150%">${sodetails.department}</td>
                    <td align="center" colspan="4" line-height="150%">${sodetails.rate}</td>
                    <td align="center" colspan="4" line-height="150%">${sodetails.rateamount}</td>
                </tr>

             
            </#list>
            <tr>
                <td>
                    <strong>${record.custrecord_entity_opp_id_lsa@label}</strong>
                </td>
                <td>${record.custrecord_entity_opp_id_lsa}</td>
                <td style="width: 10%;">&nbsp;</td>
                <td>
                    <strong>${record.isinactive@label}</strong>
                </td>
                <td>${record.isinactive}</td>
            </tr>
            <tr>
                <td>
                    <strong>${record.customform@label}</strong>
                </td>
                <td>${record.customform}</td>
                <td style="width: 10%;">&nbsp;</td>
                <td>
                    <strong>${record.custrecord_mode_lsa@label}</strong>
                </td>
                <td>${record.custrecord_mode_lsa}</td>
            </tr>
        </table>
        <br />
        <#if record.usernotes?has_content>
            <table>
                <#list record.usernotes as usernotes>
                    <#if usernotes_index == 0>
                        <thead>
                            <tr>
                                <th>${usernotes.title@label}</th>
                                <th>${usernotes.note@label}</th>
                                <th>${usernotes.notedate@label}</th>
                                <th>${usernotes.time@label}</th>
                                <th>${usernotes.notetype@label}</th>
                                <th>${usernotes.direction@label}</th>
                            </tr>
                        </thead>
                    </#if>
                    <tr>
                        <td>${usernotes.title}</td>
                        <td>${usernotes.note}</td>
                        <td>${usernotes.notedate}</td>
                        <td>${usernotes.time}</td>
                        <td>${usernotes.notetype}</td>
                        <td>${usernotes.direction}</td>
                    </tr>
                </#list>
            </table>
        </#if>
        <br />
        <#if record.mediaitem?has_content>
            <table>
                <#list record.mediaitem as mediaitem>
                    <#if mediaitem_index == 0>
                        <thead>
                            <tr>
                                <th>${mediaitem.mediaitem@label}</th>
                                <th>${mediaitem.folder@label}</th>
                                <th>${mediaitem.filesize@label}</th>
                                <th>${mediaitem.lastmodifieddate@label}</th>
                                <th>${mediaitem.filetype@label}</th>
                            </tr>
                        </thead>
                    </#if>
                    <tr>
                        <td>${mediaitem.mediaitem}</td>
                        <td>${mediaitem.folder}</td>
                        <td>${mediaitem.filesize}</td>
                        <td>${mediaitem.lastmodifieddate}</td>
                        <td>${mediaitem.filetype}</td>
                    </tr>
                </#list>
            </table>
        </#if>
    </body>
</pdf>