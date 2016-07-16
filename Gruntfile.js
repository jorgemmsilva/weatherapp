module.exports = function(grunt){

	// Project configuration.
	grunt.initConfig({
	  uglify: {
	    my_target: {
	      files: {
	        'assets/build/js/script.js': ['assets/js/script.js'],
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
	  }

	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	//Default tasks
	grunt.registerTask('default',['nodeunit','uglify','cssmin']);

};