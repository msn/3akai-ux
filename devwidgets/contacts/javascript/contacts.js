/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
/*
 * Dependencies
 *
 * /dev/lib/misc/trimpath.template.js (TrimpathTemplates)
 */
/*global $ */

require(["jquery", "sakai/sakai.api.core"], function($, sakai){

    /**
     * @name sakai_global.contacts
     *
     * @class contacts
     *
     * @description
     * Initialize the contacts widget
     *
     * @version 0.0.1
     * @param {String} tuid Unique id of the widget
     * @param {Boolean} showSettings Show the settings of the widget or not
     */
    sakai_global.contacts = function(tuid, showSettings){

        var contactsContainer = "#contacts_container";
        var contactsTemplate = "contacts_template";
        var contacts = {  // global data for contacts widget
            totalItems: 0,
            itemsPerPage: 10,
            currentPagenum: 1,
            sortBy: "_lastModified",
            sortOrder: "desc",
            accepted: false,
            pending: false,
            invited: false
        };

        var acceptRequest = function(user){
            sakai.api.User.acceptContactInvite(user);
        };

        var removeRequest = function(user){
            $.ajax({
                url: "/~" + sakai.api.Util.safeURL(sakai.data.me.user.userid) + "/contacts.remove.html",
                type: "POST",
                data: {
                    "targetUserId": user
                },
                success: function(data){
                    $(window).trigger("lhnav.updateCount", ["contacts", -1]);
                    $("#contacts_delete_contacts_dialog").jqmHide();
                    getContacts();
                }
            });
        };

        var bindEvents = function(){
            $(".contacts_add_to_contacts").live("click", function(){
                acceptRequest($(this)[0].id.split("contacts_add_to_contacts_")[1]);
            });

            $("#contacts_delete_contacts_dialog").jqm({
                modal: true,
                overlay: 20,
                toTop: true,
            });

            $(".s3d-actions-delete").live("click", function(){
                $("#contacts_contact_to_delete").text($(this).data("sakai-entityname"));
                $("#contacts_delete_contact_confirm").data("sakai-entityid", $(this).data("sakai-entityid"));
                $("#contacts_delete_contacts_dialog").jqmShow();
            });

            $("#contacts_delete_contact_confirm").live("click", function(){
                removeRequest($(this).data("sakai-entityid"));
            });

            $(window).bind("contacts.accepted.sakai", getContacts);
        };

        var renderContacts = function(dataObj){
            $(contactsContainer).html(sakai.api.Util.TemplateRenderer(contactsTemplate, dataObj));
            showPager(contacts.currentPagenum);
        };

        var determineRenderContacts = function(){
            if (sakai_global.profile.main.mode.value !== "view") {
                if (contacts.accepted && contacts.pending && contacts.invited) {
                    var json = {
                        "accepted": contacts.accepted,
                        "pending": contacts.pending,
                        "invited": contacts.invited,
                        "sakai": sakai
                    };
                    renderContacts(json);
                }
            }else{
                if(contacts.accepted){
                    var json = {
                        "accepted": contacts.accepted,
                        "pending": false,
                        "invited": false,
                        "sakai": sakai
                    };
                    renderContacts(json);
                }
            }
        };

        var getAccepted = function(){
            var url = "";
            var data = {
                "page": contacts.currentPagenum - 1,
                "items": contacts.itemsPerPage,
                "sortOn": contacts.sortBy,
                "sortOrder": contacts.sortOrder
            };
            if(sakai_global.profile.main.mode.value !== "view"){
                url = sakai.config.URL.SEARCH_USERS_ACCEPTED + "?state=ACCEPTED";
            }else{
                url = "/var/contacts/findbyuser.json";
                data.userid= sakai_global.profile.main.data.userid;
            }

            $.ajax({
                url: url,
                cache: false,
                async: true,
                data: data,
                success: function(data){
                    $.each(data.results, function(index, user){
                        if (sakai.api.User.checkIfConnected(user.details.targetUserId)){
                            user.connected = true;
                        } else {
                            user.connected = false;
                        }
                    })
                    contacts.totalItems = data.total;
                    contacts.accepted = data;
                    determineRenderContacts();
                }
            });
        };

        $(window).bind("sakai.addToContacts.requested", function(ev, userToAdd){
            $('.sakai_addtocontacts_overlay').each(function(index) {
                if ($(this).attr("sakai-entityid") === userToAdd.uuid){
                    $(this).hide();
                    $("#left_filler_"+userToAdd.uuid).show();
                }
            });
        });

        var getPending = function(){
            $.ajax({
                url: sakai.config.URL.SEARCH_USERS_ACCEPTED + "?state=PENDING&page=0&items=1000",
                cache: false,
                async: true,
                success: function(data){
                    contacts.pending = data;
                    determineRenderContacts();
                }
            });
        };

        var getPendingToOther= function(){
            $.ajax({
                url: sakai.config.URL.CONTACTS_FIND_STATE + "?state=INVITED&page=0&items=1000",
                cache: false,
                async: true,
                success: function(data){
                    contacts.invited = data;
                    determineRenderContacts();
                }
            });
        };

        var getContacts = function(){
            if (sakai_global.profile.main.mode.value !== "view") {
                getAccepted();
                getPending();
                getPendingToOther();
            }
            else {
                getAccepted();
            }
        };

        /**
         * Show the given page of accepted contacts.
         *
         * @param {int} pagenum The page number you want to display (not 0-indexed)
         */
        var showAccepted = function (pagenum) {
            showPager(pagenum);
            getAccepted();
        };

        /**
         * Show the pager at the bottom of the page.
         *
         * @param {int} pagenum The number of the current page (not 0-indexed)
         */
        var showPager = function (pagenum) {
            contacts.currentPagenum = pagenum;
            if (Math.ceil(contacts.totalItems / contacts.itemsPerPage) > 1) {
                $("#contacts_pager").pager({
                    pagenumber: pagenum,
                    pagecount: Math.ceil(contacts.totalItems / contacts.itemsPerPage),
                    buttonClickCallback: showAccepted
                });
            }
        };

        var doInit = function(){
            getContacts();
            bindEvents();
        };

        doInit();

    };
    sakai.api.Widgets.widgetLoader.informOnLoad("contacts");

});
