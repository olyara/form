"use strict";

$(document).ready(function () {

    const form = $(".form").get(0);
    const inputs = $("input[type!='submit']");
    const title = $("select#title").get(0),
        titleMr = $("option#mr").get(0),
        titleMs = $("option#ms").get(0),
        titleMrs = $("option#mrs").get(0),
        fname = $("input#fname").get(0),
        lname = $("input#lname").get(0),
        tel = $("input#tel").get(0),
        street = $("input#street").get(0),
        apt = $("input#apt").get(0),
        city = $("input#city").get(0),
        country = $("input#country").get(0),
        email = $("input#email").get(0),
        password = $("input#password").get(0),
        privacy = $("input#privacy").get(0);

    const textInputs = $("input[type='text']");


    function addErrorMessage(field, textMessage) {
        const message = $("<p class='error_message'</p>").text(textMessage);
        $(field).after(message);
    }



    $(form).on("submit", function (event) {
        event.preventDefault();
        $("p.error_message").remove();
        $(title).css("border", "none");
        $(privacy).css("border", "none");
        inputs.each((index, item) => {
            $(item).css("border", "none");
        });
        let showWelcomeMessage = true;

        // validation if the field is blank
        if (!titleMr.selected && !titleMs.selected && !titleMrs.selected) {
            addErrorMessage(title, "This field is obligatory. Please choose from the sugggested variants");
            $(title).css("border", "1.5px solid #da3535");
            showWelcomeMessage = false;
        }

        inputs.each((index, item) => {
            if (item.value === "") {
                addErrorMessage(item, "This field is obligatory. Please fill it out.");
                $(item).css("border", "1.5px solid #da3535");
                showWelcomeMessage = false;
            }
        });

        if (!privacy.checked) {
            addErrorMessage($("label[for='privacy']").get(0), "This field is obligatory. Please check the box.");
            $(privacy).css("border", "1.5px solid #da3535");
            showWelcomeMessage = false;
        }



        if (showWelcomeMessage) {
            const welcomeMessage = $("<p class='welcome_message'</p>").html(`Hello, ${fname.value}! 
            <br> You have successfully registered. 
            <br> Your profile: 
            <br> First name: ${fname.value}.
            <br> Last name: ${lname.value}. 
            <br> Contact phone number: ${tel.value}.
            <br> Your address:: ${apt.value} ${street.value} Street, ${city.value}, ${country.value}.
            `);
            $(".container").append(welcomeMessage);

            alert("Success!");
        }
    });
});

