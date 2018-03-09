var topics = ["Animals", "Movies", "Fail", "Funny", "Scary"]

var baseSearchUrl = "https://api.giphy.com/v1/gifs/search?api_key=4jwacwRqIa7c79OyoS94lerGYna6PSx7"
var searchTerm =""
var apiSearch =""
var userLimit =25
var limit = "&limit="+userLimit
var rating="&offset=0&rating=G&lang=en"
var isLoaded = false
var newTopic=""

$(document).ready(function(){
    function displayTopics(){
        $('#topicList').html('')
        for(i=0;i<topics.length; i++){
            $("#topicList").append("<button class='btn btn-dark topicBTN' value='"+topics[i]+"'>"+topics[i]+" "+"</button>")
        }
    }
    displayTopics()
    $('#addGiffBTN').on("click", function(event){
        event.preventDefault()
        newTopic=$('#newTopics').val()
        topics.push(newTopic)
        displayTopics()
        console.log(newTopic)
    })
    $(document).on("click", ".topicBTN", function(){
        searchTerm=$(this).val()
        console.log(searchTerm)
        apiSearch ="&q="+searchTerm
        var queryURL=baseSearchUrl+apiSearch+limit

        $.ajax({
            url:queryURL,
            method:'GET'
        }).then(function(response){
            console.log(response)
            if(isLoaded===true){
                $(".gif-space").html('')
            }
            else{
                isLoaded=true;
            }
            for(i=0;i<userLimit; i++){
                var stillURL= response.data[i].images.downsized_still.url
                var height= response.data[i].images.downsized_still.height
                var width= response.data[i].images.downsized_still.width
                var animateURL= response.data[i].images.downsized_medium.url
                var rating = response.data[i].rating
                
                $(".gif-space").append("<figure class='giff-holder text-center diplay'><img src='"+stillURL+"' alt='gif could not load' height='"+height+"' width='"+width+
                "' class='imageGif' data-state='still' data-still='"+stillURL+"' data-animate='"+animateURL+
                "'><figcaption>rating: " + rating + "</figcaption></figure>")

            }
        }).catch(function(error){
            console.log(error);
        })  
    })
    $(document).on("click", '.imageGif', function(){
        if($(this).attr("data-state")==="still"){
            $(this).attr('src',$(this).attr('data-animate')) 
            $(this).attr('data-state','animate')
        }
        else{
            $(this).attr("src", $(this).attr('data-still'))
            $(this).attr('data-state','still')
        }
    })
})

