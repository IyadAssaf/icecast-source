icecast-source
====

Simple abstraction to connect and stream data to Icecast servers as an source client.

### Installation

`npm install icecast-source`

### Usage

Pass your port, password and mountpojnt to the module, recieve a callback when authorized.

```javascript
var source = require('icecast-source')({
	port: 9000,
	pass: 'yourPass',
	mount: '/superCoolStuff'
}, function (err) {

	// if err, auth has failed
	if(err) console.log(err);

	// if not, stream your data to icecast
	while(true) {
		source.write('some data');
	}
});
```

### Options

You can set the following options in the config:

- port (required)
- pass (required)
- mount (required)
- host (defaults to 'localhost')
- type (defaults to 'audio/mpeg')
- name
- description
- url
- genre
- bitrate
- private
- public
- audio-info
