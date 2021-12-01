$(document).ready(function(){
    var date = new Date();
    var $window = $(window);
    //add id to main menu for mobile menu start
    var getBody = $("body");
    var bodyClass = getBody[0].className;
    $(".main-menu").attr('id', bodyClass);
    //add id to main menu for mobile menu end


    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });

    $(".ti-angle-down").on('click', function(){
        $(".navbar-container .show-notification").slideToggle('slow');
    });

    $("#mobile-collapse").on('click', function(){
        $(this).parent().find(".menu-icon").toggleClass("is-clicked");
        $(".div-navbar").toggle("slide");
        //$(".div-navbar").css("display", "block");
        //$(".div-navbar").toggleClass("showActive");
        var d = $(".mcontainer").attr("vertical-effect");
        switch(d){
            case 'overlay':
                $(".mcontainer").attr("vertical-effect", "pink");
                break;
            case 'pink':
                $(".mcontainer").attr("vertical-effect", "overlay");
                break;
        }
        //$(".overlay-box").removeClass( "hiddenActive" ).addClass("showActive");
        
    });

    /*===========datepicker==============*/
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = day + "-" + month + "-" + date.getFullYear();
    $("#from-date").val(today);
    $("#from-datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        startDate: date      
    }).on('changeDate', function(selected){
        startDate = new Date(selected.date.valueOf());
        startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
        $("#to-datepicker").datepicker('setStartDate', startDate);
    });

    $("#to-datepicker").datepicker({
        format: "dd-mm-yyyy",
        autoclose: true, 
        todayHighlight: true,
        startDate: date
    }).on('changeDate', function(selected){
        fromEndDate = new Date(selected.date.valueOf());
        fromEndDate.setDate(fromEndDate.getDate(new Date(selected.date.valueOf())));
        $("#from-datepicker").datepicker("setEndDate", fromEndDate);
    });

    /*===========datepicker end==============*/

    $(window).resize(function() {
        totalwidth = $(window)[0].innerWidth;
        if (totalwidth >= 768 && totalwidth <= 992) {
            $(".mcontainer").attr("device-type", "tablet");
        } else if (totalwidth < 768) {
            $(".mcontainer").attr("device-type", "phone");
        } else {
            $(".mcontainer").attr("device-type", "desktop");
            $(".navbar-container .show-notification").removeAttr("style");
        }

        if($(".menu-icon").hasClass("is-clicked")){
            var type = $(".mcontainer").attr("device-type");
            switch(type){
                case 'tablet':
                case 'phone':
                    $(".mcontainer").attr("vertical-effect", "overlay");
                    break;
                default:
                    $(".mcontainer").attr("vertical-effect", "pink");
                    break;
            }
        }else if($(".mcontainer").attr("device-type") == "desktop"){
            $(".div-navbar").removeAttr("style");
        }
        
        /*
        dt = $('#' + oid).attr('pcoded-device-type')
        if (dt == 'desktop' && tw < 992) {
            devicesize();
        } else if (dt == 'phone' && tw > 768) {
            devicesize();
        } else if (dt == 'tablet' && tw < 768) {
            devicesize();
        } else if (dt == 'tablet' && tw > 992) {
            devicesize();
        }
        */
    });

    /*============upload image==========*/
    $(document).on('change', '.btn-file :file', function(){
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label){
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
            console.log(log);
        if(input.length){
            console.log(log);
            input.val(log);
        }else{
            if(log) alert(log);
        }
    });

    function readURL(input){
        if(input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#imgInp').change(function(){
        readURL(this);
    });

    /**=============install editor============= */
    
    var options = {
        modules:{
            syntax: true,
            toolbar: '#toolbar-container'
        },
        placeholder: 'Nhập nội dung chiến dịch...',
        theme: 'snow'
      };
      
      
      var editor = new Quill('#editor', options);
});