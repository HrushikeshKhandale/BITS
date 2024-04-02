/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/url'],
    /**
 * @param{url} url
 */
    (url) => {
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
            const newRecord = scriptContext.newRecord;

            if (scriptContext.type === scriptContext.UserEventType.VIEW) {
                const suiteletUrl = `${url.resolveScript({
                    scriptId: 'customscript_bits_mr_createcsvfile',
                    deploymentId: 'customdeploy_bits_mr_createcsvfile',
                    returnExternalUrl: false,
                })}&recId=${scriptContext.newRecord.id}`;



                const mapreduce = `window.open('${suiteletUrl}','_self');`;

                scriptContext.form.addButton({
                    id: 'custpage_create_item_csv',
                    label: 'Create CSV',
                    functionName: mapreduce,
                });
            }

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
