/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/file', 'N/http', 'N/query', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget', 'N/render'],
    /**
 * @param{file} file
 * @param{http} http
 * @param{query} query
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (file, http, query, record, runtime, search, serverWidget, render) => {
        const salesOrderPDFTemplateId = 4592;
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                const serverRequest = scriptContext.request;
                const serverResponse = scriptContext.response;

                const recordId = serverRequest.parameters.recId || '';

                // const salesOrder = record.load({
                //     type: record.Type.SALES_ORDER,
                //     id: recordId
                // });

                // log.debug('salesOrder',salesOrder)

                // const tranId = salesOrder.getValue({
                //     fieldId: 'tranid'
                // })
                // log.debug('tranId',tranId)

                const renderer = render.create();
                log.debug('renderer', renderer)

                renderer.templateContent = file.load(salesOrderPDFTemplateId).getContents();

                // renderer.addRecord({
                //     templateName: 'record',
                //     record: salesOrder
                // });

                // const subsidiary = salesOrder.getValue({
                //     fieldId: 'subsidiary'
                // });

                // log.debug('subsidiary',subsidiary)

                // if (subsidiary) {
                //     const subsidiaryRec = record.load({
                //         type: record.Type.SUBSIDIARY,
                //         id: subsidiary,
                //         isDynamic: true
                //     })

                // log.debug('subsidiaryRec',subsidiaryRec)

                //     renderer.addRecord({
                //         templateName: 'subsidiary',
                //         record: subsidiaryRec
                //     });

                // }

                const myQuery = `select 
                                    salesOrder.tranid,
                                    salesOrder.trandate,
                                    builtin.DF(salesOrderLine.DEPARTMENT) as department,
                                    salesOrderLine.Rate,
                                    salesOrderLine.rateamount as rateamount
                            from
                                    transaction salesOrder
                            left join
                                    transactionline salesOrderLine
                            on
                                    salesOrderLine.transaction = salesOrder.id
                            where
                                    salesOrderLine.id=${recordId}
                                    `

                const queryResults = query.runSuiteQL({ query: myQuery }).asMappedResults();
                log.debug('queryResults', queryResults);

                const results = [];
                const resultObj = {};
                for (let i = 0; i < queryResults.length; i += 1) {
                    const result = {};
                    result.tranid = queryResults[i].tranid;
                    result.trandate = queryResults[i].trandate;
                    result.department = queryResults[i].department;
                    result.rate = queryResults[i].rate;
                    result.rateamount = queryResults[i].rateamount;

                    results.push(result);

                }
                resultObj.results = results;
                log.debug('resultObj  ', resultObj);



                const soDetails = resultObj.results.map((result) => {
                    for (const key in result) {
                        if (result.hasOwnProperty(key)


                            && typeof result[key] === 'string') {
                            result[key] = result[key].replace(/&/g, '&amp;');
                        }
                    }
                    return result;
                });

                renderer.addCustomDataSource({
                    format: render.DataSource.OBJECT,
                    alias: 'salesResult',
                    data: {
                        projectTask: soDetails,
                    },
                });


                const newFile = renderer.renderAsPdf();


                serverResponse.writeFile({
                    file: newFile,
                    isInline: true
                });

            } catch (error) {
                log.error('error', error)
            }


        }

        return { onRequest }

    });
