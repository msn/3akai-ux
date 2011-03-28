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

require(["jquery","sakai/sakai.api.core"], function($, sakai) {

    sakai_global.user = function() {
        
        var privdata = {
            "structure0": {
                "dashboard": {
                    "_ref": "267187828",
                    "_title": "My Dashboard", 
                    "main": {
                        "_ref":"267187828",
                        "_title":"Dashboard"
                    }
                },
                "messages": {
                    "_title": "My Messages",
                    "_ref": "1165301022",
                    "inbox": {
                        "_ref": "1165301022",
                        "_title": "Inbox"
                    },
                    "invitations": {
                        "_ref": "9867733100",
                        "_title": "Invitations"
                    },
                    "sent": {
                        "_ref": "4253485084",
                        "_title": "Sent"
                    },
                    "trash": {
                        "_ref": "3915412565",
                        "_title": "Trash"
                    }
                }
            },
        	"267187828": {
        		"page": "<div id='widget_carousel' class='widget_inline'></div><br/><div id='widget_dashboard_546341435' class='widget_inline'></div>"
        	},
        	"1165301022": {
        		"page": "<div id='widget_newinbox_2024634737' class='widget_inline'/>"
        	},
        	"9867733100": {
        		"page": "<div id='widget_inbox_3679202964' class='widget_inline'/>"
        	},
        	"4253485084": {
        		"page": "<div id='widget_inbox_66582410046' class='widget_inline'/>"
        	},
        	"3915412565": {
        		"page": "<div id='widget_inbox_3519294282' class='widget_inline'/>"
        	},
            "2024634737": {
                "box": "inbox"
            },
            "3679202964": {
                "box": "invitations"
            },
            "66582410046": {
                "box": "sent"
            },
            "3519294282": {
                "box": "trash"
            },
            "546341435": {
                "layout": "threecolumn",
                "columns": {
                    "column1": {
                        "__array__0__": {
                            "uid": "id6902437615810",
                            "visible": "block",
                            "name": "mycontent"
                        }
                    },
                    "column2": {
                        "__array__0__": {
                            "uid": "id9495917029618",
                            "visible": "block",
                            "name": "mygroups"
                        }
                    },
                    "column3": {
                        "__array__1__": {
                            "uid": "id7360391172040",
                            "visible": "block",
                            "name": "mycontacts"
                        }
                    }
                }
            }
        }

        var pubdata = {	
        	"structure0": {
                "profile": {
                    "_ref": "533118849", 
                    "_title": "My Profile",
                    "_altTitle": "${user}'s Profile",
                    "basicinfo": {
                        "_ref": "533118849",
                        "_title": "Basic Information"
                    },
                    "aboutme": {
                        "_ref": "657672090",
                        "_title": "About Me"
                    },
                    "locations": {
                        "_ref": "2967778497",
                        "_title": "Locations"
                    },
                    "publications": {
                        "_ref": "86312659",
                        "_title": "Publications"
                    }
                },
                "content": {
                    "_ref": "9834611274", 
                    "_title": "My Content",
                    "_altTitle": "${user}'s Content",
                    "main": {
                        "_ref": "9834611274",
                        "_title": "Content"
                    }
                },
                "memberships": {
                    "_title": "My Memberships", 
                    "_ref": "213623673", 
                    "_altTitle": "${user}'s Memberships",
                    "main": {
                        "_ref": "213623673",
                        "_title": "Memberships"
                    }
                },
                "contacts": {
                    "_title": "My Contacts",
                    "_ref": "1193715035", 
                    "_altTitle": "${user}'s Contacts",
                    "main": {
                        "_ref": "1193715035",
                        "_title": "Contacts"
                    }
                }
            },
        	"533118849": {
        		"page": "Basic Information HTML fragment"
        	},
        	"657672090": {
        		"page": "About Me HTML fragment"
        	},
        	"2967778497": {
        		"page": "Locations HTML fragment"
        	},
        	"86312659": {
        		"page": "Publications HTML fragment"
        	},
        	"9834611274": {
        		"page": "My Content HTML fragment"
        	},
        	"213623673": {
        		"page": "<div id='widget_mygroups' class='widget_inline'/>"
        	},
        	"1193715035": {
        		"page": "<div id='widget_contacts' class='widget_inline'></div>"
        	}
        }
        
        var contextType = false;
        var contextData = false;
        var qs = new Querystring();
        
        var determineContext = function(){
            if (qs.get("id") && qs.get("id") !== sakai.data.me.user.userid){
                sakai.api.User.getUser(qs.get("id"), getProfileData);
            } else if (!sakai.data.me.user.anon){
                sakai.api.Security.showPage();
                contextType = "user_me";
                contextData = {
                    "profile": sakai.data.me.profile,
                    "displayName": sakai.api.User.getDisplayName(sakai.data.me.profile)
                };
                determineContentContactsMemberships();
            } else {
                sakai.api.Security.sendToLogin();
            }
        }
        
        var getProfileData = function(profile){
            if (!profile) {
                sakai.api.Security.sendToLogin();
            } else {
                sakai.api.Security.showPage();
                contextData = {
                    "profile": profile,
                    "displayName": sakai.api.User.getDisplayName(profile)
                };
                if (sakai.data.me.user.anon) {
                    contextType = "user_other";
                } else {
                    sakai.api.User.getContacts(checkContact);
                }
            }
        }
        
        var checkContact = function(){
            var contacts = sakai.data.me.mycontacts;
            var isContact = false;
            for (var i = 0; i < contacts.length; i++){
                if (contacts[i].profile.userid === qs.get("id")){
                    isContact = true;
                }
            }
            if (isContact){
                contextType = "contact";
            } else {
                contextType = "user_other";
            }
            determineContentContactsMemberships();
        }
        
        var determineContentContactsMemberships = function(){
            if (!contextData){
                contextData = {};
            }
            contextData.counts = {};
            var contactsURL = "/var/contacts/findstate.json?state=ACCEPTED&page=0&items=6";
            var contentURL = "/var/search/pool/me/manager-all.1.json?sortOn=created&sortOrder=desc&page=0&items=5";
            var batchRequests = [
                {
                    "url": contentURL,
                    "method":"GET",
                    "cache":false,
                    "dataType":"json"
                },
                {
                    "url": contactsURL,
                    "method":"GET",
                    "cache":false,
                    "dataType":"json"
                }
            ];

            $.ajax({
            	url: sakai.config.URL.BATCH,
                type: "POST",
                data: {
                	requests: $.toJSON(batchRequests)
                },
                success: function(data){

                	if (data.results.hasOwnProperty(0)) {
                    	var cont = $.parseJSON(data.results[0].body);
                        contextData.counts["content"] = cont.total;
                    }

                    if (data.results.hasOwnProperty(1)) {
                    	var contacts = $.parseJSON(data.results[1].body);
                        contextData.counts["contacts"] = contacts.total; 
                    }
                    
                    contextData.counts["memberships"] = sakai.api.Groups.getMemberships(sakai.data.me.groups).entry.length;
                
                    renderEntity();
                    generateNav();
                
                }
            });
        }

        var generateNav = function(){
            if (contextType && contextData) {
                if (contextType === "user_me") {
                    $(window).trigger("lhnav.init", [pubdata, privdata]);
                } else {
                    $(window).trigger("lhnav.init", [pubdata, false]);
                }
            }
        }
        
        var renderEntity = function(){
            if (contextType && contextData) {
                $(window).trigger("sakai.entity.init", ["user", contextType, contextData]);
            }
        }

        $(window).bind("sakai.entity.ready", function(){
            renderEntity(); 
        });
        
        $(window).bind("lhnav.ready", function(){
            generateNav();
        });
        
        determineContext();
        renderEntity();
        generateNav();
    
    };

    sakai.api.Widgets.Container.registerForLoad("user");
});
