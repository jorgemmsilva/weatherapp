module.exports = function(grunt){

	// Project configuration.
	grunt.initConfig({
	  uglify: {
	    my_target: {
	      files: {
	        'assets/build/js/script.js': ['assets/js/script.js'],
	        'assets/build/js/weather_http_request.js': ['assets/js/weather_http_request.js'],
	      }
	    }
	  },	

  	cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'assets/build/css/styles.css': ['assets/css/styles.css']
		    }
		  }
		},

		nodeunit: {
	    all: ['test/*_test.js']
	  },

	  copy: {
		  main: {
		    files: [
		    	//copy css files
		      {expand: true, flatten: true, src: ['assets/build/css/*'], dest: 'public/css', filter: 'isFile'},

		    	//copy js files
		      {expand: true, flatten: true, src: ['assets/build/js/*'], dest: 'public/js', filter: 'isFile'},

		    	//copy views
		      {expand: true, flatten: true, src: ['views/*'], dest: 'public', filter: 'isFile'}

		    ],
		  },
		}

	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//Default tasks
	grunt.registerTask('default',['nodeunit','uglify','cssmin','copy']);

};