/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/record', 'N/ui/serverWidget','N/query'],
    /**
 * @param{http} http
 * @param{record} record
 * @param{serverWidget} serverWidget
 * @param{query} query
 */
    (http, record, serverWidget,query) => {



        function getItems(id) {
            const sqlQuery = `select
                                    BUILTIN.DF(id) as id,
                                    fullname,
                                    BUILTIN.DF(department) as department,
                                    description,
                                    nvl(cost,0) as cost,
                                    BUILTIN.DF(subsidiary) as subsidiary,
                                    nvl(totalquantityonhand,0) as totalquantityonhand              ,
                            from
                                    item
                            where
                            id=${id}`;
                 log.debug('sql',sqlQuery)

            return query.runSuiteQL({ query: sqlQuery }).asMappedResults();
        }



        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const serverRequest = scriptContext.request;
            const serverResponse = scriptContext.response;

            if (serverRequest.method === http.Method.GET) {
                const idOfItem = serverRequest.parameters['item'] || null;
                log.debug('idOfItem',idOfItem)
                const form = serverWidget.createForm
                    ({ title: 'Item Selection' })


                const primary_info = form.addFieldGroup({
                    id: 'primary_info',
                    label: 'Primary Information'
                })


                const customForm = form.addField({
                    id: 'item',
                    label: 'Item',
                    type: serverWidget.FieldType.SELECT,
                    source: 'Item',
                    container: 'primary_info',
                    value:idOfItem
                })






                // SUBTABs

                form.addTab({
                    id: 'item',
                    label: 'Items'
                });


                // Items's sublist
                const itemsSublist = form.addSublist({
                    name: 'Item',
                    id: 'items',
                    label: 'Items',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    tab: 'item'
                })



                // const i_id = itemsSublist.addField({
                //     id: 'id',
                //     label: 'Item',
                //     type: serverWidget.FieldType.TEXT,
                // }).isReadOnly = true

                const fullName = itemsSublist.addField({
                    id: 'fullname',
                    label: 'ITEM NAME',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true

                const department = itemsSublist.addField({
                    id: 'department',
                    label: 'DEPARTMENT',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true

                
                const cost = itemsSublist.addField({
                    id: 'cost',
                    label: 'COST',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true

            
                const subsidiary = itemsSublist.addField({
                    id: 'subsidiary',
                    label: 'SUBSIDIARY',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true

                const totalquantityonhand = itemsSublist.addField({
                    id: 'totalquantityonhand',
                    label: 'ON HAND QUANTITY',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true


                form.clientScriptModulePath = '/SuiteScripts/bits_cs_itemSourceSublist.js';

                scriptContext.response.writePage(form);




                if (idOfItem) {
                    const items = getItems(idOfItem);
                    log.debug('items',items)

                    for (let i = 0; i < items.length; i++) {
                        // itemsSublist.setSublistValue({
                        //     id: 'itemid',
                        //     line: i,
                        //     value: items[i].id,
                        // });

                        itemsSublist.setSublistValue({
                            id: 'fullname',
                            line: i,
                            value: items[i].fullname,
                        });

                        itemsSublist.setSublistValue({
                            id: 'department',
                            line: i,
                            value: items[i].department,
                        });


                        itemsSublist.setSublistValue({
                            id: 'cost',
                            line: i,
                            value: items[i].cost,
                        });

                        itemsSublist.setSublistValue({
                            id: 'subsidiary',
                            line: i,
                            value: items[i].subsidiary,
                        });

                        itemsSublist.setSublistValue({
                            id: 'totalquantityonhand',
                            line: i,
                            value: items[i].totalquantityonhand,
                        });

                    }
                }

            }

        }

        return { onRequest }

    });

