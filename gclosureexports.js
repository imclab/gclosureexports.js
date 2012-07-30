//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var gclosureExports	= {};
gclosureExports._output	= "";

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

gclosureExports.global	= function(property){
	console.assert( typeof(property) === 'string' )
	gclosureExports._output	+= "window['"+property+"'] = "+property+";\n"
	return this;
}
gclosureExports.property	= function(obj, property){
	console.assert( typeof(obj) === 'string' )
	console.assert( typeof(property) === 'string' )
	gclosureExports._output	+= obj+"['"+property+"'] = "+obj+"."+property+";\n"
	return this;
}
gclosureExports.properties= function(name, obj){
	console.assert( typeof(name) === 'string' )
	console.assert( typeof(obj) === 'object' )
	for(var property in obj){
		if( obj.hasOwnProperty(property) === false )	continue;
		gclosureExports.property(name, property)
	};
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

gclosureExports.dump	= function(){
	console.log('// Google closure compiler exports')
	console.log(gclosureExports._output);
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * helper to define a class based on .prototype
*/
gclosureExports.Class	= function(parentStr, classStr){
	// export the class itself
	gclosureExports.property(parentStr, classStr);
	// export all the properties of .prototype
	var prototypeStr	= parentStr+'.'+classStr+'.prototype';
	gclosureExports.properties(prototypeStr, eval(prototypeStr));
	return this;
}

