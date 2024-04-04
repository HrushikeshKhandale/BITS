/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(["N/currentRecord", "N/log"], function (currentRecord, log) {

    function pageInit(scriptContext) {
      try {
        const currentRecordObj = currentRecord.get();
  
        // Get the location value from a body field
        const headerLocationField = currentRecordObj.getValue({
          fieldId: "location",
        });
        log.debug("headerLocationField", headerLocationField);
  
        // Set the location value to the line field
        const lineCount = currentRecordObj.getLineCount({ sublistId: "item" });
        log.debug("lineCount", lineCount);
  
          const lineLocationField = currentRecordObj.getCurrentSublistValue({
            sublistId: "item",
            fieldId: "custcol_location",
          });
  
          if (!lineLocationField) {
            currentRecordObj.setCurrentSublistValue({
              sublistId: "item",
              fieldId: "custcol_location",
              value: headerLocationField,
            });

            
  
            const updatedLineLocationField = currentRecordObj.getCurrentSublistValue({
              sublistId: "item",
              fieldId: "custcol_location",
            });
            
            log.debug(`Location Field`, updatedLineLocationField);
          }
      } catch (error) {
        log.error("error", error);
      }
    }
  
  
    return {
      pageInit: pageInit,
    };
  });
  