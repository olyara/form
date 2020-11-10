"use strict";

$(document).ready(function () {

    const profileInfoForm = $("form.form_profile-info").get(0),
        addressInfoForm = $("form.form_address-info").get(0);

    const title = $(profileInfoForm).find("select#title").get(0),
        inputsFrom1stForm = $(profileInfoForm).find("input[type!='submit']"),
        privacy = $(profileInfoForm).find("input#privacy").get(0),
        fname = $("input#fname").get(0),
        lname = $("input#lname").get(0),
        tel = $("input#tel").get(0),
        email = $("input#email").get(0),
        street = $("input#street").get(0),
        city = $("input#city").get(0),
        postalCode = $("input#postal_code").get(0);

    const welcomeMessageProfile = $(".welcome_message_profile"),
        welcomeMessageAddress = $(".welcome_message_address");


    function addErrorMessage(field, textMessage) {
        $(field).siblings(".error_message").css("visibility", "visible");
        $(field).siblings(".error_message").text(textMessage);
        $(field).css("border", "1.5px solid #da3535");
        $(field).css("padding", "3.5px 8.5px");
    }

    function deleteErrorMessage(field) {
        $(field).siblings(".error_message").css("visibility", "hidden");
        $(field).css("border", "none");
        $(field).css("padding", "5px 10px");
    }


    // check if blank before submit
    $(title).on("focusout", function () {
        if ($(this).val() === null) {
            addErrorMessage(title, "Obligatory field. Please choose from the variants");
        } else {
            deleteErrorMessage(title);
        }
    });

    $(privacy).on("focusout", function () {
        if ($(this).prop("checked") === false) {
            addErrorMessage($(this), "Obligatory field. Please check the box.");
        } else {
            deleteErrorMessage($(this));
        }
    });

    // inputs w/o privacy checkbox
    const inputs = [];
    $(inputsFrom1stForm).each(function (index, item) {
        if (item.type !== "checkbox") {
            inputs.push(item);
        }
    });

    $(inputs).each(function (index, input) {

        $(input).on("focusout", function () {
            if (input.value === "") {
                addErrorMessage($(this), "Obligatory field. Please fill it out.");
            } else {
                deleteErrorMessage($(this));
            }
        });
    });

    // check if unnecessary characters are present in fields
    $(fname).on("change", function (e) {
        let newValue = "";
        for (let i = 0; i < fname.value.length; i++) {

            if ($.isNumeric(fname.value[i]) === false) {
                newValue += `${fname.value[i]}`;
            }
        }
        fname.value = newValue;
    });

    $(lname).on("change", function () {
        let newValue = "";
        for (let i = 0; i < lname.value.length; i++) {

            if ($.isNumeric(lname.value[i]) === false) {
                newValue += `${lname.value[i]}`;
            }
        }
        lname.value = newValue;
    });

    $(tel).on("change", function () {
        let newValue = "";
        for (let i = 0; i < tel.value.length; i++) {

            if ($.isNumeric(tel.value[i]) === true) {
                newValue += `${tel.value[i]}`;
            }
        }
        tel.value = newValue;
    });

    $(email).on("keypress", function (e) {
        if (e.which == 13) {
            if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email.value)) {
                deleteErrorMessage($(email));
            } else {
                addErrorMessage($(email), "Please enter a valid e-mail address.");
            }
        }
    });
    // / inputs



    $(profileInfoForm).on("submit", function (event) {
        let showWelcomeMessage = true;

        event.preventDefault();
        // blank
        if ($(title).val() === null) {
            addErrorMessage(title, "Obligatory field. Please choose from the variants");
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage(title);
        }

        if ($(privacy).prop("checked") === false) {
            addErrorMessage($(privacy), "Obligatory field. Please check the box.");

        } else {
            deleteErrorMessage($(privacy));

        }

        $(inputs).each(function (index, input) {
            if (input.value === "") {
                addErrorMessage($(this), "Obligatory field. Please fill it out.");
                showWelcomeMessage = false;

            } else {
                deleteErrorMessage($(this));
            }
        });



        if (showWelcomeMessage) {
            $(welcomeMessageProfile).html(`Hello, ${fname.value}! 
                <br> You have successfully registered. 
                <br> Your profile: 
                <br> First name: ${fname.value}.
                <br> Last name: ${lname.value}. 
                <br> Contact phone number: ${tel.value}.
                `);
            $(welcomeMessageProfile).css("visibility", "visible");
            setTimeout(() => {
                $(welcomeMessageProfile).css("visibility", "hidden");
            }, 4000);
        }


    });



    $(street).on("focusout", function () {
        if (street.value === "") {
            addErrorMessage($(this), "Obligatory field. Please fill it out.");
        } else {
            deleteErrorMessage($(this));
        }
    });

    $(city).on("focusout", function () {
        if (city.value === "") {
            addErrorMessage($(this), "Obligatory field. Please fill it out.");
        } else {
            deleteErrorMessage($(this));
        }
    });

    $(postalCode).on("focusout", function () {
        if (postalCode.value === "") {
            addErrorMessage($(this), "Obligatory field. Please fill it out.");
        } else {
            deleteErrorMessage($(this));
        }
    });


    $(addressInfoForm).on("submit", function (event) {
        let showWelcomeMessage = true;

        event.preventDefault();
        // blank
        if (street.value === "") {
            addErrorMessage($(street), "Obligatory field. Please fill it out.");
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(street));
        }

        if (city.value === "") {
            addErrorMessage($(city), "Obligatory field. Please fill it out.");
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(city));
        }

        if (postalCode.value === "") {
            addErrorMessage($(postalCode), "Obligatory field. Please fill it out.");
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(postalCode));
        }



        if (showWelcomeMessage) {
            $(welcomeMessageAddress).html(`Your address (${street.value} Street, ${city.value}, ${postalCode.value}) has been added.`);
            $(welcomeMessageAddress).css("visibility", "visible");
            setTimeout(() => {
                $(welcomeMessageAddress).css("visibility", "hidden");
            }, 2000);
        }


    });
});

