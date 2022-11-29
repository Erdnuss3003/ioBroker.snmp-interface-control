'use strict';


const utils = require('@iobroker/adapter-core');


var snmp = require ("net-snmp");


let adapter;


function startAdapter(options) {
   
    return adapter = utils.adapter(Object.assign({}, options, {
        name: 'snmp-interface-control',
		
        ready: dataPolling, 
		
        unload: (callback) => {
            try {
				clearInterval(timerstartpolling);
                callback();
            } catch (e) {
                callback();
            }
        },

         stateChange: (id, state) => {
            if (id && state && !state.ack) {
                // The state was changed
                // adapter.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
				

				
				
				
				
				var changeoid = id;				
				changeoid = changeoid.replace(/snmp-interface-control\.\d\./, ''); 
				changeoid = changeoid.replace(/(.*)\./, '');
				changeoid = changeoid.replace(/_/g, '.');
				
				adapter.log.info(changeoid + " " + state.val);
							
								

				var regex = /1.3.6.1.2.1.2.2.1.7.[0-9]+/g;
				var regex2 = /1.3.6.1.2.1.105.1.1.1.3.1.[0-9]+/g;
				
				if (changeoid.match(regex)) {
					state.val = Number(state.val);
					var varbindss = [
						{
						oid: changeoid,
						type: snmp.ObjectType.Integer32,
						value: state.val
						}];
					adapter.log.info("change to Interger");
				}
				else if (changeoid.match(regex2)) {
					state.val = Number(state.val);
					var varbindss = [
						{
						oid: changeoid,
						type: snmp.ObjectType.Integer32,
						value: state.val
						}];
					adapter.log.info("change to Interger");
				} else {
					var varbindss = [
						{
						oid: changeoid,
						type: snmp.ObjectType.OctetString,
						value: state.val
						}];
					adapter.log.info("change to String");
				}
		
				var session = snmp.createSession (adapter.config.ipadresse, adapter.config.snmpcommunity);
				session.set (varbindss, function (error, varbindss) {
					if (error) {
						adapter.log.info("setfunktion" + error);
					} else {
						}
				});		
				
            }
        },


    }));
}


function startpolling() {
system();
interfaces();
poe();
}


async function system() {
	var session = snmp.createSession (adapter.config.ipadresse, adapter.config.snmpcommunity);
	if (adapter.config.sysdescr) {			
		var oidsysDescr = "1.3.6.1.2.1.1.1.0";
		var oidsysDescrvalue = "0";

		oidsysDescrvalue = oidsysDescr.replace(/\./g, '_');
		oidsysDescrvalue = "systems." + oidsysDescrvalue;
		await adapter.setObjectNotExistsAsync(oidsysDescrvalue, {type: 'state', common: {name: 'sysDescr', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
				
		var oidssysDescr = [oidsysDescr];

		session.get (oidssysDescr, function (error, varbinds) {
			if (error) {
				adapter.log.info('snmp error oidssysDescr ');
			} else {
				adapter.setState(oidsysDescrvalue, varbinds[0].value.toString(), true);
			}
		});			
	}
	if (adapter.config.sysuptime) {			
		var oidsysUpTime = "1.3.6.1.2.1.1.3.0";
		var oidsysUpTimevalue = "0";

		oidsysUpTimevalue = oidsysUpTime.replace(/\./g, '_');
		oidsysUpTimevalue = "systems." + oidsysUpTimevalue;
		await adapter.setObjectNotExistsAsync(oidsysUpTimevalue, {type: 'state', common: {name: 'sysUpTime', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
				
		var oidssysUpTime = [oidsysUpTime];

		session.get (oidssysUpTime, function (error, varbinds) {
			if (error) {
				adapter.log.info('snmp error oidssysUpTime ');
			} else {
				adapter.setState(oidsysUpTimevalue, varbinds[0].value.toString(), true);
			}
		});			
	}
	if (adapter.config.syscontact) {			
		var oidsysContact = "1.3.6.1.2.1.1.4.0";
		var oidsysContactvalue = "0";

		oidsysContactvalue = oidsysContact.replace(/\./g, '_');
		oidsysContactvalue = "systems." + oidsysContactvalue;
		await adapter.setObjectNotExistsAsync(oidsysContactvalue, {type: 'state', common: {name: 'sysContact', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
				
		var oidssysContact = [oidsysContact];

		session.get (oidssysContact, function (error, varbinds) {
			if (error) {
				adapter.log.info('snmp error oidssysContact ');
			} else {
				adapter.setState(oidsysContactvalue, varbinds[0].value.toString(), true);
				adapter.subscribeStates(oidsysContactvalue);
			}
		});			
	}
	if (adapter.config.sysname) {			
		var oidsysName = "1.3.6.1.2.1.1.5.0";
		var oidsysNamevalue = "0";

		oidsysNamevalue = oidsysName.replace(/\./g, '_');
		oidsysNamevalue = "systems." + oidsysNamevalue;
		await adapter.setObjectNotExistsAsync(oidsysNamevalue, {type: 'state', common: {name: 'sysName', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
				
		var oidssysName = [oidsysName];

		session.get (oidssysName, function (error, varbinds) {
			if (error) {
				adapter.log.info('snmp error oidssysName ');
			} else {
				adapter.setState(oidsysNamevalue, varbinds[0].value.toString(), true);
				adapter.subscribeStates(oidsysNamevalue);
			}
		});			
	}
	if (adapter.config.syslocation) {			
		var oidsysLocation = "1.3.6.1.2.1.1.6.0";
		var oidsysLocationvalue = "0";

		oidsysLocationvalue = oidsysLocation.replace(/\./g, '_');
		oidsysLocationvalue = "systems." + oidsysLocationvalue;
		await adapter.setObjectNotExistsAsync(oidsysLocationvalue, {type: 'state', common: {name: 'sysLocation', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
				
		var oidssysLocation = [oidsysLocation];

		session.get (oidssysLocation, function (error, varbinds) {
			if (error) {
				adapter.log.info('snmp error oidssysLocation ');
			} else {
				adapter.setState(oidsysLocationvalue, varbinds[0].value.toString(), true);
				adapter.subscribeStates(oidsysLocationvalue);
			}
		});			
	}
	
}


async function interfaces() {
	if (adapter.config.ifindex) {
		
		var oid = "1.3.6.1.2.1.2.2.1.1";
		
		var session = snmp.createSession (adapter.config.ipadresse, adapter.config.snmpcommunity);
		
		function doneCb (error) {
			if (error)
				 adapter.log.info ("Interfaces done Cb" + error.toString ());
		}
		async function feedCb (varbinds) {
			for (var i = 0; i < varbinds.length; i++) {
				if (snmp.isVarbindError (varbinds[i]))
					 adapter.log.info ('error walk');
				else
					// adapter.log.info (varbinds[i].oid + "|" + varbinds[i].value);
					var oids = varbinds[i].oid;
					oids = oids.replace(/\./g, '_');
					oids = "interface." + varbinds[i].value + "." + oids;
					await adapter.setObjectNotExistsAsync(oids, {type: 'state', common: {name: 'ifIndex', type: 'string', role: 'value', read: true, write: false}, native: {}, });								 
					adapter.setState(oids, varbinds[i].value.toString(), true);
					
				if (adapter.config.ifdescr) {			
					var oiddescr = "1.3.6.1.2.1.2.2.1.2";
					var oiddescrvalue = "0";
					var oiddescrvaluee = "0";

					oiddescrvalue = oiddescr + "." + varbinds[i].value;
					oiddescrvaluee = oiddescrvalue.replace(/\./g, '_');
					oiddescrvaluee = "interface." + varbinds[i].value + "." + oiddescrvaluee;
					await adapter.setObjectNotExistsAsync(oiddescrvaluee, {type: 'state', common: {name: 'ifDecsr', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifdescr = [oiddescrvalue];

					session.get (oidsifdescr, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifdescr ');
						} else {
							adapter.setState(oiddescrvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.iftype) {			
					var oidtype = "1.3.6.1.2.1.2.2.1.3";
					var oidtypevalue = "0";
					var oidtypevaluee = "0";

					oidtypevalue = oidtype + "." + varbinds[i].value;
					oidtypevaluee = oidtypevalue.replace(/\./g, '_');
					oidtypevaluee = "interface." + varbinds[i].value + "." + oidtypevaluee;
					await adapter.setObjectNotExistsAsync(oidtypevaluee, {type: 'state', common: {name: 'ifType', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsiftype = [oidtypevalue];

					session.get (oidsiftype, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsiftype ');
						} else {
							adapter.setState(oidtypevaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifmtu) {			
					var oidmtu = "1.3.6.1.2.1.2.2.1.4";
					var oidmtuvalue = "0";
					var oidmtuvaluee = "0";

					oidmtuvalue = oidmtu + "." + varbinds[i].value;
					oidmtuvaluee = oidmtuvalue.replace(/\./g, '_');
					oidmtuvaluee = "interface." + varbinds[i].value + "." + oidmtuvaluee;
					await adapter.setObjectNotExistsAsync(oidmtuvaluee, {type: 'state', common: {name: 'ifMtu', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifmtu = [oidmtuvalue];

					session.get (oidsifmtu, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifmtu ');
						} else {
							adapter.setState(oidmtuvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifspeed) {			
					var oidspeed = "1.3.6.1.2.1.2.2.1.5";
					var oidspeedvalue = "0";
					var oidspeedvaluee = "0";

					oidspeedvalue = oidspeed + "." + varbinds[i].value;
					oidspeedvaluee = oidspeedvalue.replace(/\./g, '_');
					oidspeedvaluee = "interface." + varbinds[i].value + "." + oidspeedvaluee;
					await adapter.setObjectNotExistsAsync(oidspeedvaluee, {type: 'state', common: {name: 'ifSpeed', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifspeed = [oidspeedvalue];

					session.get (oidsifspeed, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifspeed ');
						} else {
							adapter.setState(oidspeedvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifphysaddress) {			
					var oidphysaddress = "1.3.6.1.2.1.2.2.1.6";
					var oidphysaddressvalue = "0";
					var oidphysaddressvaluee = "0";

					oidphysaddressvalue = oidphysaddress + "." + varbinds[i].value;
					oidphysaddressvaluee = oidphysaddressvalue.replace(/\./g, '_');
					oidphysaddressvaluee = "interface." + varbinds[i].value + "." + oidphysaddressvaluee;
					await adapter.setObjectNotExistsAsync(oidphysaddressvaluee, {type: 'state', common: {name: 'ifPhysAddress', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifphysaddress = [oidphysaddressvalue];

					session.get (oidsifphysaddress, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifphysaddress ');
						} else {
							adapter.setState(oidphysaddressvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifadminstatus) {			
					var oidadminstatus = "1.3.6.1.2.1.2.2.1.7";
					var oidadminstatusvalue = "0";
					var oidadminstatusvaluee = "0";

					oidadminstatusvalue = oidadminstatus + "." + varbinds[i].value;
					oidadminstatusvaluee = oidadminstatusvalue.replace(/\./g, '_');
					oidadminstatusvaluee = "interface." + varbinds[i].value + "." + oidadminstatusvaluee;
					await adapter.setObjectNotExistsAsync(oidadminstatusvaluee, {type: 'state', common: {name: 'ifAdminStatus', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifadminstatus = [oidadminstatusvalue];

					session.get (oidsifadminstatus, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifadminstatus ');
						} else {
							adapter.setState(oidadminstatusvaluee, varbinds[0].value.toString(), true);
							adapter.subscribeStates(oidadminstatusvaluee);
						}
					});			
				}
				if (adapter.config.ifoperstatus) {			
					var oidoperstatus = "1.3.6.1.2.1.2.2.1.8";
					var oidoperstatusvalue = "0";
					var oidoperstatusvaluee = "0";

					oidoperstatusvalue = oidoperstatus + "." + varbinds[i].value;
					oidoperstatusvaluee = oidoperstatusvalue.replace(/\./g, '_');
					oidoperstatusvaluee = "interface." + varbinds[i].value + "." + oidoperstatusvaluee;
					await adapter.setObjectNotExistsAsync(oidoperstatusvaluee, {type: 'state', common: {name: 'ifOperStatus', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoperstatus = [oidoperstatusvalue];

					session.get (oidsifoperstatus, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoperstatus ');
						} else {
							adapter.setState(oidoperstatusvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.iflastchange) {			
					var oidlastchange = "1.3.6.1.2.1.2.2.1.9";
					var oidlastchangevalue = "0";
					var oidlastchangevaluee = "0";

					oidlastchangevalue = oidlastchange + "." + varbinds[i].value;
					oidlastchangevaluee = oidlastchangevalue.replace(/\./g, '_');
					oidlastchangevaluee = "interface." + varbinds[i].value + "." + oidlastchangevaluee;
					await adapter.setObjectNotExistsAsync(oidlastchangevaluee, {type: 'state', common: {name: 'ifLastChange', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsiflastchange = [oidlastchangevalue];

					session.get (oidsiflastchange, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsiflastchange ');
						} else {
							adapter.setState(oidlastchangevaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifinoctets) {			
					var oidinoctets = "1.3.6.1.2.1.2.2.1.10";
					var oidinoctetsvalue = "0";
					var oidinoctetsvaluee = "0";

					oidinoctetsvalue = oidinoctets + "." + varbinds[i].value;
					oidinoctetsvaluee = oidinoctetsvalue.replace(/\./g, '_');
					oidinoctetsvaluee = "interface." + varbinds[i].value + "." + oidinoctetsvaluee;
					await adapter.setObjectNotExistsAsync(oidinoctetsvaluee, {type: 'state', common: {name: 'ifInOctets', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifinoctets = [oidinoctetsvalue];

					session.get (oidsifinoctets, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifinoctets ');
						} else {
							adapter.setState(oidinoctetsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifinucastpkts) {			
					var oidinucastpkts = "1.3.6.1.2.1.2.2.1.11";
					var oidinucastpktsvalue = "0";
					var oidinucastpktsvaluee = "0";

					oidinucastpktsvalue = oidinucastpkts + "." + varbinds[i].value;
					oidinucastpktsvaluee = oidinucastpktsvalue.replace(/\./g, '_');
					oidinucastpktsvaluee = "interface." + varbinds[i].value + "." + oidinucastpktsvaluee;
					await adapter.setObjectNotExistsAsync(oidinucastpktsvaluee, {type: 'state', common: {name: 'ifInUcastPkts', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifinucastpkts = [oidinucastpktsvalue];

					session.get (oidsifinucastpkts, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifinucastpkts ');
						} else {
							adapter.setState(oidinucastpktsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifinnucastpkts) {			
					var oidinnucastpkts = "1.3.6.1.2.1.2.2.1.12";
					var oidinnucastpktsvalue = "0";
					var oidinnucastpktsvaluee = "0";

					oidinnucastpktsvalue = oidinnucastpkts + "." + varbinds[i].value;
					oidinnucastpktsvaluee = oidinnucastpktsvalue.replace(/\./g, '_');
					oidinnucastpktsvaluee = "interface." + varbinds[i].value + "." + oidinnucastpktsvaluee;
					await adapter.setObjectNotExistsAsync(oidinnucastpktsvaluee, {type: 'state', common: {name: 'ifInNUcastPkts', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifinnucastpkts = [oidinnucastpktsvalue];

					session.get (oidsifinnucastpkts, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifinnucastpkts ');
						} else {
							adapter.setState(oidinnucastpktsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifindiscards) {			
					var oidindiscards = "1.3.6.1.2.1.2.2.1.13";
					var oidindiscardsvalue = "0";
					var oidindiscardsvaluee = "0";

					oidindiscardsvalue = oidindiscards + "." + varbinds[i].value;
					oidindiscardsvaluee = oidindiscardsvalue.replace(/\./g, '_');
					oidindiscardsvaluee = "interface." + varbinds[i].value + "." + oidindiscardsvaluee;
					await adapter.setObjectNotExistsAsync(oidindiscardsvaluee, {type: 'state', common: {name: 'ifInDiscards', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifindiscards = [oidindiscardsvalue];

					session.get (oidsifindiscards, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifindiscards ');
						} else {
							adapter.setState(oidindiscardsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifinerrors) {			
					var oidinerrors = "1.3.6.1.2.1.2.2.1.14";
					var oidinerrorsvalue = "0";
					var oidinerrorsvaluee = "0";

					oidinerrorsvalue = oidinerrors + "." + varbinds[i].value;
					oidinerrorsvaluee = oidinerrorsvalue.replace(/\./g, '_');
					oidinerrorsvaluee = "interface." + varbinds[i].value + "." + oidinerrorsvaluee;
					await adapter.setObjectNotExistsAsync(oidinerrorsvaluee, {type: 'state', common: {name: 'ifInErrors', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
						
					var oidsifinerrors = [oidinerrorsvalue];

					session.get (oidsifinerrors, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifinerrors ');
						} else {
							adapter.setState(oidinerrorsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifinunkownprotos) {			
					var oidinunkownprotos = "1.3.6.1.2.1.2.2.1.15";
					var oidinunkownprotosvalue = "0";
					var oidinunkownprotosvaluee = "0";

					oidinunkownprotosvalue = oidinunkownprotos + "." + varbinds[i].value;
					oidinunkownprotosvaluee = oidinunkownprotosvalue.replace(/\./g, '_');
					oidinunkownprotosvaluee = "interface." + varbinds[i].value + "." + oidinunkownprotosvaluee;
					await adapter.setObjectNotExistsAsync(oidinunkownprotosvaluee, {type: 'state', common: {name: 'ifInUnknownProtos', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifinunkownprotos = [oidinunkownprotosvalue];

					session.get (oidsifinunkownprotos, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifinunkownprotos ');
						} else {
							adapter.setState(oidinunkownprotosvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifoutoctets) {			
					var oidoutoctets = "1.3.6.1.2.1.2.2.1.16";
					var oidoutoctetsvalue = "0";
					var oidoutoctetsvaluee = "0";

					oidoutoctetsvalue = oidoutoctets + "." + varbinds[i].value;
					oidoutoctetsvaluee = oidoutoctetsvalue.replace(/\./g, '_');
					oidoutoctetsvaluee = "interface." + varbinds[i].value + "." + oidoutoctetsvaluee;
					await adapter.setObjectNotExistsAsync(oidoutoctetsvaluee, {type: 'state', common: {name: 'ifOutOctets', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoutoctets = [oidoutoctetsvalue];

					session.get (oidsifoutoctets, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoutoctets ');
						} else {
							adapter.setState(oidoutoctetsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifoutucastpkts) {			
					var oidoutucastpkts = "1.3.6.1.2.1.2.2.1.17";
					var oidoutucastpktsvalue = "0";
					var oidoutucastpktsvaluee = "0";

					oidoutucastpktsvalue = oidoutucastpkts + "." + varbinds[i].value;
					oidoutucastpktsvaluee = oidoutucastpktsvalue.replace(/\./g, '_');
					oidoutucastpktsvaluee = "interface." + varbinds[i].value + "." + oidoutucastpktsvaluee;
					await adapter.setObjectNotExistsAsync(oidoutucastpktsvaluee, {type: 'state', common: {name: 'ifOutUcastPkts', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoutucastpkts = [oidoutucastpktsvalue];

					session.get (oidsifoutucastpkts, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoutucastpkts ');
						} else {
							adapter.setState(oidoutucastpktsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifoutnucastpkts) {			
					var oidoutnucastpkts = "1.3.6.1.2.1.2.2.1.18";
					var oidoutnucastpktsvalue = "0";
					var oidoutnucastpktsvaluee = "0";

					oidoutnucastpktsvalue = oidoutnucastpkts + "." + varbinds[i].value;
					oidoutnucastpktsvaluee = oidoutnucastpktsvalue.replace(/\./g, '_');
					oidoutnucastpktsvaluee = "interface." + varbinds[i].value + "." + oidoutnucastpktsvaluee;
					await adapter.setObjectNotExistsAsync(oidoutnucastpktsvaluee, {type: 'state', common: {name: 'ifOutNUcastPkts', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoutnucastpkts = [oidoutnucastpktsvalue];

					session.get (oidsifoutnucastpkts, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoutnucastpkts ');
						} else {
							adapter.setState(oidoutnucastpktsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifoutdiscards) {			
					var oidoutdiscards = "1.3.6.1.2.1.2.2.1.19";
					var oidoutdiscardsvalue = "0";
					var oidoutdiscardsvaluee = "0";

					oidoutdiscardsvalue = oidoutdiscards + "." + varbinds[i].value;
					oidoutdiscardsvaluee = oidoutdiscardsvalue.replace(/\./g, '_');
					oidoutdiscardsvaluee = "interface." + varbinds[i].value + "." + oidoutdiscardsvaluee;
					await adapter.setObjectNotExistsAsync(oidoutdiscardsvaluee, {type: 'state', common: {name: 'ifOutDiscards', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoutdiscards = [oidoutdiscardsvalue];

					session.get (oidsifoutdiscards, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoutdiscards ');
						} else {
							adapter.setState(oidoutdiscardsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifouterrors) {			
					var oidouterrors = "1.3.6.1.2.1.2.2.1.20";
					var oidouterrorsvalue = "0";
					var oidouterrorsvaluee = "0";

					oidouterrorsvalue = oidouterrors + "." + varbinds[i].value;
					oidouterrorsvaluee = oidouterrorsvalue.replace(/\./g, '_');
					oidouterrorsvaluee = "interface." + varbinds[i].value + "." + oidouterrorsvaluee;
					await adapter.setObjectNotExistsAsync(oidouterrorsvaluee, {type: 'state', common: {name: 'ifOutErrors', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifouterrors = [oidouterrorsvalue];

					session.get (oidsifouterrors, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifouterrors ');
						} else {
							adapter.setState(oidouterrorsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifoutqlen) {			
					var oidoutqlen = "1.3.6.1.2.1.2.2.1.21";
					var oidoutqlenvalue = "0";
					var oidoutqlenvaluee = "0";

					oidoutqlenvalue = oidoutqlen + "." + varbinds[i].value;
					oidoutqlenvaluee = oidoutqlenvalue.replace(/\./g, '_');
					oidoutqlenvaluee = "interface." + varbinds[i].value + "." + oidoutqlenvaluee;
					await adapter.setObjectNotExistsAsync(oidoutqlenvaluee, {type: 'state', common: {name: 'ifOutQLen', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifoutqlen = [oidoutqlenvalue];

					session.get (oidsifoutqlen, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifoutqlen ');
						} else {
							adapter.setState(oidoutqlenvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.ifspecific) {			
					var oidspecific = "1.3.6.1.2.1.2.2.1.22";
					var oidspecificvalue = "0";
					var oidspecificvaluee = "0";

					oidspecificvalue = oidspecific + "." + varbinds[i].value;
					oidspecificvaluee = oidspecificvalue.replace(/\./g, '_');
					oidspecificvaluee = "interface." + varbinds[i].value + "." + oidspecificvaluee;
					await adapter.setObjectNotExistsAsync(oidspecificvaluee, {type: 'state', common: {name: 'ifSpecific', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							
					var oidsifspecific = [oidspecificvalue];

					session.get (oidsifspecific, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidsifspecific ');
						} else {
							adapter.setState(oidspecificvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}

			}
		}
		var maxRepetitions = 20;


		oid = "1.3.6.1.2.1.2.2.1.1";
		session.subtree (oid, maxRepetitions, feedCb, doneCb);
	}	
}


async function poe() {
	if (adapter.config.poeadminenable) {
		var oidi = 0;
		var oid = "1.3.6.1.2.1.105.1.1.1.3";	
		var session = snmp.createSession (adapter.config.ipadresse, adapter.config.snmpcommunity);
		
		function doneCb (error) {
			if (error)
				 adapter.log.info ("POE done Cb" + error.toString ());
		}
		async function feedCb (varbinds) {
			for (var i = 0; i < varbinds.length; i++) {
				if (snmp.isVarbindError (varbinds[i]))
					 adapter.log.info ('error walk');
				else
					// adapter.log.info (varbinds[i].oid + "|" + varbinds[i].value);
					var oids = varbinds[i].oid;
					oids = oids.replace(/\./g, '_');
					oids = "poe." + "." + oids;
					await adapter.setObjectNotExistsAsync(oids, {type: 'state', common: {name: 'poeAdminEnable', type: 'string', role: 'value', read: true, write: false}, native: {}, });								 
					adapter.setState(oids, varbinds[i].value.toString(), true);	
					adapter.subscribeStates(oids);
				oidi++;	
				if (adapter.config.poedetectionstatus) {			
					var oiddetectionstatus = "1.3.6.1.2.1.105.1.1.1.6" + "." + varbinds[i].value + "." + oidi;
					var oiddetectionstatusvalue = "0";
					var oiddetectionstatusvaluee = "0";

					oiddetectionstatusvalue = oiddetectionstatus;
					oiddetectionstatusvaluee = oiddetectionstatusvalue.replace(/\./g, '_');
					oiddetectionstatusvaluee = "poe." + "." + oiddetectionstatusvaluee;
					await adapter.setObjectNotExistsAsync(oiddetectionstatusvaluee, {type: 'state', common: {name: 'poeDetectionStatus', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							

					var oidspoedetectionstatus = [oiddetectionstatus];

					session.get (oidspoedetectionstatus, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidspoedetectionstatus' + oiddetectionstatus);
						} else {
							adapter.setState(oiddetectionstatusvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				if (adapter.config.poepowerclassifications) {			
					var oidpowerclassifications = "1.3.6.1.2.1.105.1.1.1.10" + "." + varbinds[i].value + "." + oidi;
					var oidpowerclassificationsvalue = "0";
					var oidpowerclassificationsvaluee = "0";

					oidpowerclassificationsvalue = oidpowerclassifications;
					oidpowerclassificationsvaluee = oidpowerclassificationsvalue.replace(/\./g, '_');
					oidpowerclassificationsvaluee = "poe." + "." + oidpowerclassificationsvaluee;
					await adapter.setObjectNotExistsAsync(oidpowerclassificationsvaluee, {type: 'state', common: {name: 'poePowerClassifications', type: 'string', role: 'value', read: true, write: false}, native: {}, });									
							

					var oidspoepowerclassifications = [oidpowerclassifications];

					session.get (oidspoepowerclassifications, function (error, varbinds) {
						if (error) {
							adapter.log.info('snmp error oidspoepowerclassifications' + oidpowerclassifications);
						} else {
							adapter.setState(oidpowerclassificationsvaluee, varbinds[0].value.toString(), true);
						}
					});			
				}
				
			}
		}
		var maxRepetitions = 20;


		oid = "1.3.6.1.2.1.105.1.1.1.3";
		session.subtree (oid, maxRepetitions, feedCb, doneCb);
	}	
}


async function dataPolling() {
		var timerstartpolling = 30000;
		setInterval(startpolling, timerstartpolling);
		
	}


if (module.parent) {

    module.exports = startAdapter;
} else {
   
    startAdapter();
}
