/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/record", "N/log"], (record, log) => {
  /**
   * Defines the function definition that is executed before record is loaded.
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
   * @param {Form} scriptContext.form - Current form
   * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
   * @since 2015.2
   */
  const beforeLoad = (scriptContext) => {};

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
  const afterSubmit = (scriptContext) => {
     try {
      const newRec = scriptContext.newRecord;

      const creditMemoId = newRec.id;
      log.debug("creditMemoId", creditMemoId);

      // Get customer ID from the credit memo
      const customerId = newRec.getValue({
        fieldId: "entity",
      });
      log.debug("customerId", customerId);

      // create customer refund
      const custRefund = record.create({
        type: record.Type.CUSTOMER_REFUND,
        isDynamic: true,
      });


       
      // Set customer on the customer refund record
      custRefund.setValue({
        fieldId: "customer",
        value: customerId,
      });


         const linecount = custRefund.getLineCount({ sublistId: "apply" });
      log.debug("linecount", linecount);


      
      const apply =custRefund.selectLine({
          sublistId:'apply',
        line:0
      })
      log.debug('apply',apply)

    

      custRefund.setCurrentSublistValue({
        sublistId: "apply",
        fieldId: "apply",
        value: true,
      });


      custRefund.commitLine({ sublistId: "apply" });

      // Save the customer refund record
      const refundId = custRefund.save({
        enableSourcing: true,
        ignoreMandatoryFields: true,
      });
      log.debug("Customer Refund Created", "Refund ID: " + refundId);
    } catch (error) {
      log.error({
        title: "Error creating Customer Refund",
        details: error,
      });
    }
  };

  return {beforeLoad,beforeSubmit, afterSubmit };
});

