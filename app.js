'use strict';

const fs          = require('fs');
const express     = require('express');
const path        = require('path');
const app         = express();
const useragent   = require('express-useragent');


/*** CONFIG VARIABLES ***/
const localIP           = 'http://localhost';
const remoteIP          = 'http://www.fakeurl.com';
const appName           = 'Electron';
const appInstallerWin   = 'ElectronSetup';
/*** END CONFIG VARIABLES ***/

app.use(require('morgan')('dev'));
app.use(useragent.express());

app.use('/updates/releases', express.static(path.join(__dirname, 'releases')));

//macOS => /updates/latest/1.0.0
//winOS => /updates/releases/win

app.get('/updates/latest/:version', (req, res) => {
	const latest = getLatestRelease('darwin');
	const clientVersion = req.params.version;

	if (latest === undefined || clientVersion === latest) {
    	res.status(204).end();
	} else {
    	res.json({
    		url: `${getBaseUrl()}/updates/releases/darwin/${latest}/${appName}.zip`
    	});
	}
});

app.get('/download/latest/:os?', (req, res) => {

	let file = `${__dirname}/releases`;

	let os = req.params.os; 

	if( os === undefined && req.useragent.platform.toLowerCase().indexOf('apple') !== -1 ) {
		os = 'darwin';
	}
	else if( os === undefined ){
		os = 'win';
	}

	if( os === 'darwin' ) {
		file += `/darwin/${getLatestRelease('darwin')}/${appName}.dmg`;
	}
	else {
		file += `/win/${appInstallerWin}.exe`;
	}

	res.download(file);

});

let getLatestRelease = ( os ) => {
	const dir = `${__dirname}/releases/${os}`;

	const versionsDesc = fs.readdirSync(dir).filter((file) => {
		const filePath = path.join(dir, file);
		return fs.statSync(filePath).isDirectory();
	}).reverse();

	return versionsDesc[0];
};

let getBaseUrl = () => {
	if (process.env.NODE_ENV === 'development') {
		return `${localIP}:${process.env.PORT}`;
	} else {
		return `${remoteIP}:${process.env.PORT}`;
	}
};

app.listen(process.env.PORT, () => {
	console.log(`Express server listening on port ${process.env.PORT}`);
});
