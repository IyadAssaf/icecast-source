icecast-source
====

Simple utility to stream data to Icecast servers as an source client.

```javascript
var source = require('icecast-source')({
	port: 9000,
	pass: 'yourPass',
	mount: '/superCoolStuff',

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
- name
- description
- url
- genre
- bitrate
- private
- public
- audio-info
