// import reflect from '@alumna/reflect';
const reflect = require('@alumna/reflect')
const path = require('path')

const ignores = [
    'reactdemo.html',
    'reactrouterdemo.html',
    'javascripts/components',
]

reflect({
	src: path.resolve(__dirname, 'public'),
	
	dest: path.resolve(__dirname, 'docs'),
	
	// (OPTIONAL) Default to 'true'
	recursive: true,
	
	// (OPTIONAL) Default to 'true'
	// Delete in dest the non-existent files in src
	delete: true,
	
	// (OPTIONAL)
	// Array with files and folders not to reflect
	exclude: ignores
	
})
    .then(res => console.log( res ))
    .catch(err => console.error( err ))