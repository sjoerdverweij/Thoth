chrome.runtime.onInstalled.addListener(function(){chrome.storage.local.set({assumeImperial:!0,toImperial:!0,addOtherSystem:!0,highlight:!0,showPopup:!0,units:{g:{c:"Weight",n:"Gram",ps:"g",ctbb:0,ctb:1,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"nl-NL"},gram:{c:"Weight",n:"Gram",ps:"g",ctbb:0,ctb:1,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"nl-NL"},grams:{c:"Weight",n:"Gram",ps:"g",ctbb:0,ctb:1,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"nl-NL"},oz:{c:"Weight",n:"Ounce",ps:"oz",ctbb:0,ctb:1/28.3495,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"en-US"},ounce:{c:"Weight",n:"Ounce",ps:"oz",ctbb:0,ctb:1/28.3495,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"en-US"},ounces:{c:"Weight",n:"Ounce",ps:"oz",ctbb:0,ctb:1/28.3495,ctba:0,pih:"oz",coi:0,pil:"oz",pmh:"g",com:0,pml:"g",hd:0,cod:10,ld:1,nf:"en-US"},kg:{c:"Weight",n:"Kilogram",ps:"kg",ctbb:0,ctb:.001,ctba:0,pih:"lb",coi:0,pil:"lb",pmh:"kg",com:0,pml:"kg",hd:0,cod:10,ld:1,nf:"nl-NL"},lb:{c:"Weight",n:"Pound",ps:"lb",ctbb:0,ctb:1/453.592,ctba:0,pih:"lb",coi:0,pil:"lb",pmh:"kg",com:0,pml:"lb",hd:0,cod:10,ld:1,nf:"en-US"},"metric tons":{c:"Weight",n:"Metric ton",ps:" tons",ctbb:0,ctb:1e-6,ctba:0,pih:"ton",coi:0,pil:"ton",pmh:"metric ton",com:0,pml:"metric ton",hd:0,cod:10,ld:1,nf:"nl-NL"},tonne:{c:"Weight",n:"Short ton",ps:" tons",ctbb:0,ctb:1e-6,ctba:0,pih:"ton",coi:0,pil:"ton",pmh:"metric ton",com:0,pml:"metric ton",hd:0,cod:10,ld:1,nf:"nl-NL"},ton:{c:"Weight",n:"Short ton",ps:" tons",ctbb:0,ctb:1/907185,ctba:0,pih:"ton",coi:0,pil:"ton",pmh:"metric ton",com:0,pml:"metric ton",hd:0,cod:10,ld:1,nf:"en-US"},"long tons":{c:"Weight",n:"Long ton",ps:" long tons",ctbb:0,ctb:1/1016046.9,ctba:0,pih:"ton",coi:0,pil:"ton",pmh:"metric ton",com:0,pml:"metric ton",hd:0,cod:10,ld:1,nf:"en-US"}}})});