module.exports = function(grunt){

	// Project configuration.
	grunt.initConfig({
	  uglify: {
	    my_target: {
	      files: {
	        'script.js': ['js/script.js'],
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
		      'styles.css': ['css/styles.css']
		    }
		  }
		}

	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	//Default tasks
	grunt.registerTask('default',['uglify','cssmin']);

};