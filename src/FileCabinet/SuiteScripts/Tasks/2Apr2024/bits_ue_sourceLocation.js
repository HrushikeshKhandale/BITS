/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/record"], /**
 * @param{record} record
 */ (record) => {
  /**
   * Defines the function definition that is executed before record is loaded.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @param {Form} scriptContext.form - Current form
   * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
   * @since 2015.2
   */
  const beforeLoad = (scriptContext) => {
    try {
      log.debug("scriptContext.type", scriptContext.type);
      const newRecord = scriptContext.newRecord;

      // Get the location value from a body field
      newRecord.setValue({
        fieldId: "location",
        value: 2,
      });

      const headerLocationField = newRecord.getValue({
        fieldId: "location",
      });

      log.debug("headerLocationField", headerLocationField);

      // Set the location value to the line field
      const lineCount = newRecord.getLineCount({ sublistId: "item" });
      log.debug("lineCount", lineCount);

      const lineLocationField = newRecord.getSublistValue({
        sublistId: "item",
        fieldId: "custcol_location",
        line: 0,
      });
      if (!lineLocationField) {
        newRecord.setSublistValue({
          sublistId: "item",
          fieldId: "custcol_location",
          line: 0,
          value: headerLocationField,
        });

           const lineLocationField = newRecord.getSublistValue({
        sublistId: "item",
        fieldId: "custcol_location",
        line: 0,
      });
      log.debug(`lineLocationField`, lineLocationField);
      }else{
        return true
      }

    } catch (error) {
      log.error("error", error);
    }
  };

  /**
   * Defines the function definition that is executed before record is submitted.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @since 2015.2
   */
  const beforeSubmit = (scriptContext) => {};

  /**
   * Defines the function definition that is executed after record is submitted.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @since 2015.2
   */
  const afterSubmit = (scriptContext) => {};

  return { beforeLoad, beforeSubmit, afterSubmit };
});
