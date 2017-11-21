app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    },

    onDeviceReady: function() {
        document.addEventListener("backbutton", this.onBackButton.bind(this));
        plugin.google.maps.environment.setBackgroundColor("#000000");
        this.initializeCamera()
    },

    onBackButton: function(e)  {
        e.preventDefault();
        document.location.href = "index.html";
    },



    initializeCamera: function(){
        document.getElementById("takePictureButton").addEventListener("click",() =>{
            navigator.camera.getPicture((uri) =>{
                let image = document.getElementById('picture');
                image.src = uri;
            }, (error) => console.log(error),
                {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                }
            );
        })
    }
};

app.initialize();