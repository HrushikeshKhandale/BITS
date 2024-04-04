
/**
 *@NApiVersion 2.1
*@NScriptType ClientScript
*/
define(["N/currentRecord", "N/record", "N/url"], function (currentRecord, record, url) {

    function redirectToSuiteLet(currentRec) {
        const params = {};
        params['item'] = currentRec.getValue({ fieldId:'item'}) || '';
        alert(params['item'] + ' is the item');
        
        const redirectUrl = url.resolveScript({
            scriptId: 'customscript_bits_sl_itemselectsourcesl',
            deploymentId: 'customdeploy_bits_sl_itemselectsourcesl',
            params,
            isExternal: true,
        });
        window.onbeforeunload = null;
        window.open(redirectUrl, '_self');  
    }


    function fieldChanged(scriptContext) {
        const currentRec = currentRecord.get();
        if (scriptContext.fieldId === 'item') {
            redirectToSuiteLet(currentRec);
        }
    }





    return {
        fieldChanged: fieldChanged,
    };
});



